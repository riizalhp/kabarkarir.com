import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import MainContent from './components/MainContent';
import JobDetailPage from './components/JobDetailPage';
import BlogPage from './components/BlogPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import JobCategoryPage from './components/JobCategoryPage';
import CompanyListPage from './components/CompanyListPage';
import CompanyDetailPage from './components/CompanyDetailPage';
import MisiCuanPage from './components/MisiCuanPage';
import PasangIklanPage from './components/PasangIklanPage';
import MisiDetailPage from './components/MisiDetailPage';
import MisiStepsPage from './components/MisiStepsPage';
import MisiSubmissionPage from './components/MisiSubmissionPage';
import JoinTelegramPage from './components/JoinTelegramPage';
import TermsPage from './components/TermsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import HelpPage from './components/HelpPage';
import PasangIklanOnGoing from './components/PasangIklanOnGoing';
import EventRecruitmentPage from './components/EventRecruitmentPage';
import EventDetailPage from './components/EventDetailPage';
import FavoritesPage from './components/FavoritesPage';
import PelatihanPage from './components/PelatihanPage';
import PelatihanDetailPage from './components/PelatihanDetailPage';
import AboutUsPage from './components/AboutUsPage';
import Categories from './components/Categories';
import { slugify } from './utils/slugify';
import { Job, BlogPost, MisiCuanOffer, CompanyProfile, RecruitmentEvent, PelatihanInfo, Major, Tag, Category } from './types';

interface AppRoutesProps {
  jobs: Job[];
  blogPosts: BlogPost[];
  misiOffers: MisiCuanOffer[];
  companies: CompanyProfile[];
  events: RecruitmentEvent[];
  courses: PelatihanInfo[];
  majors: Major[];
  tags: Tag[];
  companiesWithJobCount: (CompanyProfile & { jobsAvailable: number })[];
  trendingCompanies: (CompanyProfile & { jobsAvailable: number })[];
  dynamicCategories: Category[];
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  jobs,
  blogPosts,
  misiOffers,
  companies,
  events,
  courses,
  companiesWithJobCount,
  trendingCompanies,
  dynamicCategories
}) => {
  
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={
        <>
          <Categories onSelectCategory={(cat) => window.location.href = `/kategori/${slugify(cat)}`} categories={dynamicCategories} />
          <MainContent 
            jobs={jobs} 
            onSelectJob={(slug: string) => {
              const job = jobs.find((j: Job) => j.slug === slug);
              if (job) window.location.href = `/lowongan/${job.id}/${job.slug}`;
            }}
            onSelectCategory={(cat) => window.location.href = `/kategori/${slugify(cat)}`}
            onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
            onNavigateToBlog={() => window.location.href = '/blog'}
            onNavigateToEventRecruitment={() => window.location.href = '/event'}
            onSelectEvent={(slug: string) => {
              const event = events.find((e: RecruitmentEvent) => e.slug === slug);
              if (event) window.location.href = `/event/${event.id}/${event.slug}`;
            }}
            trendingCompanies={trendingCompanies}
            latestArticles={blogPosts.slice(0,3)}
            allEvents={events}
          />
        </>
      } />

      {/* Job Routes */}
      <Route path="/lowongan/:id/:slug" element={<JobDetailWrapper jobs={jobs} blogPosts={blogPosts} events={events} companies={companies} />} />
      <Route path="/lowongan/:slug" element={<JobDetailWrapper jobs={jobs} blogPosts={blogPosts} events={events} companies={companies} />} />
      <Route path="/kategori/:category" element={<JobCategoryWrapper jobs={jobs} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      
      {/* Company Routes */}
      <Route path="/perusahaan" element={<CompanyListWrapper blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      <Route path="/perusahaan/:slug" element={<CompanyDetailWrapper companies={companiesWithJobCount} jobs={jobs} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      
      {/* Blog Routes */}
      <Route path="/blog" element={<BlogWrapper blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      <Route path="/blog/:slug" element={<ArticleDetailWrapper blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      
      {/* Misi Cuan Routes */}
      <Route path="/misi-cuan" element={<MisiCuanWrapper misiOffers={misiOffers} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      <Route path="/misi-cuan/:slug" element={<MisiDetailWrapper misiOffers={misiOffers} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} companies={companies} />} />
      <Route path="/misi-cuan/:slug/tahapan" element={<MisiStepsWrapper misiOffers={misiOffers} />} />
      <Route path="/misi-cuan/:slug/submit" element={<MisiSubmissionWrapper misiOffers={misiOffers} />} />
      
      {/* Event Routes */}
      <Route path="/event" element={<EventRecruitmentWrapper events={events} blogPosts={blogPosts} trendingCompanies={trendingCompanies} />} />
      <Route path="/event/:id/:slug" element={<EventDetailWrapper events={events} blogPosts={blogPosts} trendingCompanies={trendingCompanies} companies={companies} />} />
      <Route path="/event/:slug" element={<EventDetailWrapper events={events} blogPosts={blogPosts} trendingCompanies={trendingCompanies} companies={companies} />} />
      
      {/* Pelatihan Routes */}
      <Route path="/pelatihan" element={<PelatihanWrapper courses={courses} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      <Route path="/pelatihan/:slug" element={<PelatihanDetailWrapper courses={courses} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      
      {/* Service Routes */}
      <Route path="/pasang-iklan" element={<PasangIklanPage />} />
      <Route path="/pasang-iklan/ongoing" element={<PasangIklanOnGoing />} />
      
      {/* Other Routes */}
      <Route path="/favorit" element={<FavoritesWrapper jobs={jobs} blogPosts={blogPosts} events={events} trendingCompanies={trendingCompanies} />} />
      <Route path="/komunitas" element={<JoinTelegramPage />} />
      <Route path="/tentang-kami" element={<AboutUsPage />} />
      <Route path="/syarat-ketentuan" element={<TermsPage />} />
      <Route path="/kebijakan-privasi" element={<PrivacyPolicyPage />} />
      <Route path="/bantuan" element={<HelpPage />} />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Wrapper components for route parameters
const JobDetailWrapper: React.FC<any> = ({ jobs, blogPosts, events, companies }) => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  
  // Find by ID first (primary), slug is just for SEO
  let selectedJob = jobs.find((job: Job) => job.id === Number(id));
  
  // Fallback: if no ID match, try slug for backward compatibility
  if (!selectedJob && slug) {
    selectedJob = jobs.find((job: Job) => job.slug === slug);
  }
  
  if (!selectedJob) return <div className="container mx-auto px-4 py-8"><h2>Lowongan tidak ditemukan</h2></div>;
  
  return (
    <JobDetailPage 
      job={selectedJob} 
        allJobs={jobs} 
        onBack={() => window.history.back()}
        onSelectJob={(jobSlug: string) => {
          const job = jobs.find((j: Job) => j.slug === jobSlug);
          if (job) window.location.href = `/lowongan/${job.id}/${job.slug}`;
        }}
        onSelectCategory={(cat) => window.location.href = `/kategori/${slugify(cat)}`}
        onNavigateToBlog={() => window.location.href = '/blog'}
        onNavigateToEventRecruitment={() => window.location.href = '/event'}
        onSelectEvent={(eventSlug: string) => {
          const event = events.find((e: RecruitmentEvent) => e.slug === eventSlug);
          if (event) window.location.href = `/event/${event.id}/${event.slug}`;
        }}
        onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
      />
  );
};

const JobCategoryWrapper: React.FC<any> = ({ jobs, blogPosts, events, trendingCompanies }) => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || '');
  
  return (
    <JobCategoryPage 
      category={decodedCategory}
      allJobs={jobs}
      onSelectJob={(slug: string) => {
        const job = jobs.find((j: Job) => j.slug === slug);
        if (job) window.location.href = `/lowongan/${job.id}/${job.slug}`;
      }}
      onSelectCategory={(cat) => window.location.href = `/kategori/${slugify(cat)}`}
      onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const CompanyListWrapper: React.FC<any> = ({ blogPosts, events, trendingCompanies }) => {
  return (
    <CompanyListPage 
      onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const CompanyDetailWrapper: React.FC<any> = ({ companies, jobs, blogPosts, events, trendingCompanies }) => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <CompanyDetailPage 
      companySlug={slug || ''}
      allJobs={jobs}
      allCompanies={companies}
      onSelectJob={(jobSlug: string) => {
        const job = jobs.find((j: Job) => j.slug === jobSlug);
        if (job) window.location.href = `/lowongan/${job.id}/${job.slug}`;
      }}
      onSelectCategory={(cat) => window.location.href = `/kategori/${slugify(cat)}`}
      onSelectCompany={(companySlug) => window.location.href = `/perusahaan/${companySlug}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(eventSlug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === eventSlug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const BlogWrapper: React.FC<any> = ({ blogPosts, events, trendingCompanies }) => {
  return (
    <BlogPage 
      posts={blogPosts}
      onSelectArticle={(slug) => window.location.href = `/blog/${slug}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const ArticleDetailWrapper: React.FC<any> = ({ blogPosts, events, trendingCompanies }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find by slug first, then by ID for backwards compatibility
  let selectedArticle = blogPosts.find((post: BlogPost) => post.slug === slug);
  if (!selectedArticle && !isNaN(Number(slug))) {
    selectedArticle = blogPosts.find((post: BlogPost) => post.id === Number(slug));
  }
  
  if (!selectedArticle) return <div className="container mx-auto px-4 py-8"><h2>Artikel tidak ditemukan</h2></div>;
  
  return (
    <ArticleDetailPage 
      post={selectedArticle}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const MisiCuanWrapper: React.FC<any> = ({ misiOffers, blogPosts, events, trendingCompanies }) => {
  return (
    <MisiCuanPage 
      offers={misiOffers}
      onSelectMisi={(id) => window.location.href = `/misi-cuan/${id}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const MisiDetailWrapper: React.FC<any> = ({ misiOffers, blogPosts, events, trendingCompanies, companies }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find by slug first, then by ID for backwards compatibility
  let selectedMisi = misiOffers.find((offer: MisiCuanOffer) => offer.slug === slug);
  if (!selectedMisi && !isNaN(Number(slug))) {
    selectedMisi = misiOffers.find((offer: MisiCuanOffer) => offer.id === Number(slug));
  }
  
  if (!selectedMisi) return <div className="container mx-auto px-4 py-8"><h2>Misi tidak ditemukan</h2></div>;
  
  return (
    <MisiDetailPage 
      offer={selectedMisi}
      onStart={(misiId) => window.location.href = `/misi-cuan/${misiId}/tahapan`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
      onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
    />
  );
};

const MisiStepsWrapper: React.FC<any> = ({ misiOffers }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find by slug first, then by ID for backwards compatibility
  let selectedMisi = misiOffers.find((offer: MisiCuanOffer) => offer.slug === slug);
  if (!selectedMisi && !isNaN(Number(slug))) {
    selectedMisi = misiOffers.find((offer: MisiCuanOffer) => offer.id === Number(slug));
  }
  
  if (!selectedMisi) return <div className="container mx-auto px-4 py-8"><h2>Misi tidak ditemukan</h2></div>;
  
  return (
    <MisiStepsPage 
      offer={selectedMisi}
      onComplete={(misiId) => window.location.href = `/misi-cuan/${misiId}/submit`}
    />
  );
};

const MisiSubmissionWrapper: React.FC<any> = ({ misiOffers }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find by slug first, then by ID for backwards compatibility
  let selectedMisi = misiOffers.find((offer: MisiCuanOffer) => offer.slug === slug);
  if (!selectedMisi && !isNaN(Number(slug))) {
    selectedMisi = misiOffers.find((offer: MisiCuanOffer) => offer.id === Number(slug));
  }
  
  if (!selectedMisi) return <div className="container mx-auto px-4 py-8"><h2>Misi tidak ditemukan</h2></div>;
  
  return (
    <MisiSubmissionPage 
      offer={selectedMisi}
      onSubmit={() => {
        alert('Bukti berhasil dikirim! Imbalan akan segera diproses.');
        window.location.href = '/misi-cuan';
      }}
    />
  );
};

const EventRecruitmentWrapper: React.FC<any> = ({ events, blogPosts, trendingCompanies }) => {
  return (
    <EventRecruitmentPage 
      allEvents={events}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
    />
  );
};

const EventDetailWrapper: React.FC<any> = ({ events, blogPosts, trendingCompanies, companies }) => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  
  // Find by ID first (primary), slug is just for SEO
  let selectedEvent = events.find((event: RecruitmentEvent) => event.id === Number(id));
  
  // Fallback: if no ID match, try slug for backward compatibility
  if (!selectedEvent && slug) {
    selectedEvent = events.find((event: RecruitmentEvent) => event.slug === slug);
  }
  
  // Additional fallback: try ID from slug parameter (old format)
  if (!selectedEvent && !isNaN(Number(slug))) {
    selectedEvent = events.find((event: RecruitmentEvent) => event.id === Number(slug));
  }
  
  if (!selectedEvent) return <div className="container mx-auto px-4 py-8"><h2>Event tidak ditemukan</h2></div>;
  
  return (
    <EventDetailPage 
      event={selectedEvent}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(eventSlug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === eventSlug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
      onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
    />
  );
};

const PelatihanWrapper: React.FC<any> = ({ courses, blogPosts, events, trendingCompanies }) => {
  return (
    <PelatihanPage 
      pelatihanList={courses}
      onSelectPelatihan={(id) => window.location.href = `/pelatihan/${id}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const PelatihanDetailWrapper: React.FC<any> = ({ courses, blogPosts, events, trendingCompanies }) => {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find by slug first, then by ID for backwards compatibility
  let selectedPelatihan = courses.find((course: PelatihanInfo) => course.slug === slug);
  if (!selectedPelatihan && !isNaN(Number(slug))) {
    selectedPelatihan = courses.find((course: PelatihanInfo) => course.id === Number(slug));
  }
  
  if (!selectedPelatihan) return <div className="container mx-auto px-4 py-8"><h2>Info Pelatihan tidak ditemukan</h2></div>;
  
  return (
    <PelatihanDetailPage 
      pelatihan={selectedPelatihan}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

const FavoritesWrapper: React.FC<any> = ({ jobs, blogPosts, events, trendingCompanies }) => {
  return (
    <FavoritesPage 
      allJobs={jobs}
      onSelectJob={(jobSlug: string) => {
        const job = jobs.find((j: Job) => j.slug === jobSlug);
        if (job) window.location.href = `/lowongan/${job.id}/${job.slug}`;
      }}
      onSelectCategory={(cat) => window.location.href = `/kategori/${slugify(cat)}`}
      onSelectCompany={(slug) => window.location.href = `/perusahaan/${slug}`}
      onNavigateToBlog={() => window.location.href = '/blog'}
      onNavigateToEventRecruitment={() => window.location.href = '/event'}
      onSelectEvent={(slug: string) => {
        const event = events.find((e: RecruitmentEvent) => e.slug === slug);
        if (event) window.location.href = `/event/${event.id}/${event.slug}`;
      }}
      trendingCompanies={trendingCompanies}
      latestArticles={blogPosts.slice(0,3)}
      allEvents={events}
    />
  );
};

export default AppRoutes;
