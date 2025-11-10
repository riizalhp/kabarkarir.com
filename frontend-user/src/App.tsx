import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import AppRoutes from './AppRoutes';
import { CATEGORIES } from './constants';
import { slugify } from './utils/slugify';
import { Job, BlogPost, MisiCuanOffer, CompanyProfile, RecruitmentEvent, PelatihanInfo, Major, Tag, Category } from './types';
import { jobsService, companiesService, blogService, eventsService, misiService, pelatihanService, majorsService, tagsService } from './services/api';

// Breadcrumb Component Definition
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a
                href={item.href}
                className="text-secondary hover:text-primary transition"
              >
                {item.name}
              </a>
            ) : (
              <span className="font-medium text-gray-700">{item.name}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2" aria-hidden="true">&gt;</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  
  // --- STATE MANAGEMENT ---
  const [jobs, setJobs] = useState<Job[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [misiOffers, setMisiOffers] = useState<MisiCuanOffer[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [events, setEvents] = useState<RecruitmentEvent[]>([]);
  const [courses, setCourses] = useState<PelatihanInfo[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // --- FETCH DATA FROM SUPABASE ON MOUNT ---
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        console.log('🔍 Fetching data from Supabase...');
        
        // Fetch all data in parallel
        const [
          jobsData,
          companiesData,
          blogData,
          eventsData,
          misiData,
          pelatihanData,
          majorsData,
          tagsData,
        ] = await Promise.all([
          jobsService.getAll(),
          companiesService.getAllSimple(),
          blogService.getAll(),
          eventsService.getAll(),
          misiService.getAll(),
          pelatihanService.getAll(),
          majorsService.getAll(),
          tagsService.getAll(),
        ]);

        console.log('✅ Data fetched successfully:');
        console.log('   - Jobs:', jobsData?.length || 0);
        console.log('   - Companies:', companiesData?.length || 0);
        console.log('   - Blog:', blogData?.length || 0);
        console.log('   - Events:', eventsData?.length || 0);
        console.log('   - Misi:', misiData?.length || 0);
        console.log('   - Pelatihan:', pelatihanData?.length || 0);
        console.log('   - Majors:', majorsData?.length || 0);
        console.log('   - Tags:', tagsData?.length || 0);

        setJobs(jobsData || []);
        setCompanies(companiesData || []);
        setBlogPosts(blogData || []);
        setEvents(eventsData || []);
        setMisiOffers(misiData || []);
        setCourses(pelatihanData || []);
        setMajors(majorsData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // --- DERIVED STATE ---
  const companiesWithJobCount = useMemo(() => {
    const jobCounts = jobs.reduce((acc, job) => {
        acc[job.companySlug] = (acc[job.companySlug] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return companies.map(company => ({
        ...company,
        jobsAvailable: jobCounts[company.slug] || 0,
    }));
  }, [jobs, companies]);

  const trendingCompanies = useMemo(() => {
    // Sort by view_count first, then by jobsAvailable as fallback
    return [...companiesWithJobCount]
      .sort((a, b) => {
        const viewDiff = (b.view_count || 0) - (a.view_count || 0);
        if (viewDiff !== 0) return viewDiff;
        return b.jobsAvailable - a.jobsAvailable;
      })
      .slice(0, 4);
  }, [companiesWithJobCount]);
  
  const dynamicCategories = useMemo(() => {
    return CATEGORIES.map(category => {
      if (category.name === 'Misi Cuan') {
        return { ...category, count: misiOffers.length };
      }

      const lowerCaseCategoryName = category.name.toLowerCase();
      const count = jobs.filter(job =>
        job.category.toLowerCase() === lowerCaseCategoryName ||
        (job.tags && job.tags.some(tag => tag.toLowerCase() === lowerCaseCategoryName))
      ).length;

      return { ...category, count };
    });
  }, [jobs, misiOffers]);

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const homeCrumb: BreadcrumbItem = { name: 'Home', href: '/' };

    if (path === '/') return [];

    // Blog routes
    if (path === '/blog') return [homeCrumb, { name: 'Blog' }];
    if (path.startsWith('/blog/')) {
      const id = parseInt(path.split('/')[2]);
      const article = blogPosts.find(p => p.id === id);
      return [
        homeCrumb,
        { name: 'Blog', href: '/blog' },
        { name: article ? article.title : 'Artikel' }
      ];
    }

    // Job routes
    if (path.startsWith('/lowongan/')) {
      const id = parseInt(path.split('/')[2]);
      const job = jobs.find(j => j.id === id);
      return [
        homeCrumb,
        { name: 'Lowongan' },
        { name: job ? job.title : 'Detail Lowongan' }
      ];
    }

    // Category routes
    if (path.startsWith('/kategori/')) {
      const category = decodeURIComponent(path.split('/')[2]);
      return [
        homeCrumb,
        { name: 'Kategori' },
        { name: category }
      ];
    }

    // Company routes
    if (path === '/perusahaan') return [homeCrumb, { name: 'Perusahaan' }];
    if (path.startsWith('/perusahaan/')) {
      const slug = path.split('/')[2];
      const company = companies.find(c => c.slug === slug);
      return [
        homeCrumb,
        { name: 'Perusahaan', href: '/perusahaan' },
        { name: company ? company.name : 'Instansi' }
      ];
    }

    // Misi Cuan routes
    if (path === '/misi-cuan') return [homeCrumb, { name: 'Misi Cuan' }];
    if (path.startsWith('/misi-cuan/')) {
      const parts = path.split('/');
      const id = parseInt(parts[2]);
      const misi = misiOffers.find(m => m.id === id);
      
      if (parts.length === 3) {
        return [
          homeCrumb,
          { name: 'Misi Cuan', href: '/misi-cuan' },
          { name: misi ? misi.title : 'Detail Misi' }
        ];
      } else if (parts[3] === 'tahapan') {
        return [
          homeCrumb,
          { name: 'Misi Cuan', href: '/misi-cuan' },
          { name: misi ? misi.title : 'Detail Misi', href: `/misi-cuan/${id}` },
          { name: 'Tahapan Misi' }
        ];
      } else if (parts[3] === 'submit') {
        return [
          homeCrumb,
          { name: 'Misi Cuan', href: '/misi-cuan' },
          { name: misi ? misi.title : 'Detail Misi', href: `/misi-cuan/${id}` },
          { name: 'Tahapan Misi', href: `/misi-cuan/${id}/tahapan` },
          { name: 'Pengumpulan Bukti' }
        ];
      }
    }

    // Event routes
    if (path === '/event') return [homeCrumb, { name: 'Event Rekrutmen' }];
    if (path.startsWith('/event/')) {
      const id = parseInt(path.split('/')[2]);
      const event = events.find(e => e.id === id);
      return [
        homeCrumb,
        { name: 'Event Rekrutmen', href: '/event' },
        { name: event ? event.title : 'Detail Event' }
      ];
    }

    // Service routes
    if (path === '/pasang-iklan' || path === '/pasang-iklan/ongoing') {
      return [homeCrumb, { name: 'Pasang Iklan' }];
    }

    // Search route
    if (path === '/search') {
      return [homeCrumb, { name: 'Hasil Pencarian' }];
    }

    // Other routes
    if (path === '/favorit') return [homeCrumb, { name: 'Favorit' }];
    if (path === '/komunitas') return [homeCrumb, { name: 'Komunitas' }];
    if (path === '/tentang-kami') return [homeCrumb, { name: 'Tentang Kami' }];
    if (path === '/syarat-ketentuan') return [homeCrumb, { name: 'Syarat & Ketentuan' }];
    if (path === '/kebijakan-privasi') return [homeCrumb, { name: 'Kebijakan Privasi' }];
    if (path === '/bantuan') return [homeCrumb, { name: 'Bantuan' }];

    return [];
  };

  const handleNavigation = (view: string, category?: string) => {
    switch (view) {
      case 'home':
        window.location.href = '/';
        break;
      case 'blog':
        window.location.href = '/blog';
        break;
      case 'companyList':
        window.location.href = '/perusahaan';
        break;
      case 'misiCuan':
        window.location.href = '/misi-cuan';
        break;
      case 'pasangIklan':
        window.location.href = '/pasang-iklan';
        break;
      case 'pasangIklanOnGoing':
        window.location.href = '/pasang-iklan/ongoing';
        break;
      case 'eventRecruitment':
        window.location.href = '/event';
        break;
      case 'favorites':
        window.location.href = '/favorit';
        break;
      case 'joinTelegram':
        window.location.href = '/komunitas';
        break;
      case 'jobCategory':
        if (category) {
          window.location.href = `/kategori/${slugify(category)}`;
        }
        break;
      case 'search':
        if (category) { // category parameter used as search query
          window.location.href = `/search?q=${encodeURIComponent(category)}`;
        }
        break;
      default:
        window.location.href = '/';
    }
  };
  
  const onFooterNavigate = (view: 'terms' | 'privacy' | 'help' | 'aboutUs') => {
    const routes = {
      terms: '/syarat-ketentuan',
      privacy: '/kebijakan-privasi',
      help: '/bantuan',
      aboutUs: '/tentang-kami'
    };
    window.location.href = routes[view];
  };

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query);
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="bg-gray-50 font-poppins">
      <Header onNavigate={handleNavigation} onSearch={handleSearch} />
      <main>
        {breadcrumbs.length > 0 && (
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <Breadcrumb items={breadcrumbs} />
            </div>
          </div>
        )}
        {
          loading &&
          (
            <div className="bg-gray-50 font-poppins min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Memuat data...</p>
              </div>
            </div>
          )
        }
        <AppRoutes 
          jobs={jobs}
          blogPosts={blogPosts}
          misiOffers={misiOffers}
          companies={companies}
          events={events}
          courses={courses}
          majors={majors}
          tags={tags}
          companiesWithJobCount={companiesWithJobCount}
          trendingCompanies={trendingCompanies}
          dynamicCategories={dynamicCategories}
          globalSearchQuery={globalSearchQuery}
        />
      </main>
      <Footer onNavigate={onFooterNavigate} />
      <ToastContainer />
    </div>
  );
};

export default App;
