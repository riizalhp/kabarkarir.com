import React, { useState, useEffect, useMemo } from 'react';
import { Job, CompanyProfile, Company, RecruitmentEvent, BlogPost } from '../types';
import JobCard from './JobCard';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';
import { viewTrackingService } from '../services/viewTracking';
import { injectJSONLD, updateMetaTags, generateCompanySchema, generateBreadcrumbSchema } from '../utils/seo';

interface CompanyDetailPageProps {
  companySlug?: string;
  companyPreview?: CompanyProfile;
  allJobs: Job[];
  allCompanies: CompanyProfile[];
  onSelectJob: (jobSlug: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  isPreviewMode?: boolean;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const INITIAL_ITEMS = 12;
const ITEMS_TO_LOAD = 12;

const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({ companySlug, companyPreview, allJobs, allCompanies, onSelectJob, onSelectCategory, onSelectCompany, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, isPreviewMode = false, trendingCompanies, latestArticles, allEvents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [jobType, setJobType] = useState('Semua');
  const [education, setEducation] = useState('Semua');

  const company = companyPreview || allCompanies.find(c => c.slug === companySlug);

  // Track company view and inject SEO
  useEffect(() => {
    if (company && !isPreviewMode) {
      viewTrackingService.trackCompanyView(company.id);
      
      // Update page meta tags
      updateMetaTags({
        title: `${company.name} - Profil Perusahaan & Lowongan Kerja | KabarKarir.com`,
        description: company.description?.substring(0, 155) || `Lihat profil lengkap ${company.name} dan lowongan kerja terbaru. Temukan informasi perusahaan, benefit, dan cara melamar kerja di ${company.name}.`,
        keywords: `${company.name}, lowongan kerja ${company.name}, profil perusahaan, karir ${company.name}`,
        canonical: `https://www.kabarkarir.com/perusahaan/${company.slug}`,
        ogImage: company.logo || 'https://www.kabarkarir.com/og-image.jpg',
        ogType: 'profile'
      });

      // Inject Company structured data
      injectJSONLD(generateCompanySchema(company));

      // Inject Breadcrumb structured data
      injectJSONLD(generateBreadcrumbSchema([
        { name: 'Beranda', url: 'https://www.kabarkarir.com/' },
        { name: 'Perusahaan', url: 'https://www.kabarkarir.com/perusahaan' },
        { name: company.name, url: window.location.href }
      ]));
    }
  }, [company, isPreviewMode]);

  useEffect(() => {
    setCurrentPage(1);
    // Reset filters when company changes
    setKeyword('');
    setJobType('Semua');
    setEducation('Semua');
  }, [companySlug, companyPreview]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, jobType, education]);

  const companyJobs = useMemo(() => {
    return company ? allJobs.filter(job => job.companySlug === company.slug) : [];
  }, [allJobs, company]);

  const { uniqueJobTypes, uniqueEducations } = useMemo(() => {
    const types = new Set<string>();
    const educations = new Set<string>();
    companyJobs.forEach(job => {
      types.add(job.type);
      educations.add(job.education);
    });
    return {
      uniqueJobTypes: ['Semua', ...Array.from(types)],
      uniqueEducations: ['Semua', ...Array.from(educations)],
    };
  }, [companyJobs]);

  const filteredJobs = useMemo(() => {
    return companyJobs.filter(job => {
      const keywordMatch = keyword === '' ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));
      const typeMatch = jobType === 'Semua' || job.type === jobType;
      const educationMatch = education === 'Semua' || job.education === education;
      return keywordMatch && typeMatch && educationMatch;
    });
  }, [companyJobs, keyword, jobType, education]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleResetFilters = () => {
    setKeyword('');
    setJobType('Semua');
    setEducation('Semua');
  };

  if (!company) {
    return (
      <section className="py-10 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold">Perusahaan tidak ditemukan</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
                {/* Company Header Card */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="h-24 w-24 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-2 shrink-0 shadow-sm">
                            <img src={company.logo} alt={`${company.name} logo`} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${company.type === 'BUMN' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{company.type}</span>
                            <h1 className="text-2xl md:text-3xl font-bold text-secondary mt-2">{company.name}</h1>
                        </div>
                    </div>
                </div>

                {/* About Company */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-bold text-secondary border-b pb-3 mb-4">Tentang Perusahaan</h2>
                    <p className="text-gray-700 leading-relaxed">{company.description}</p>
                    {company.website && (
                        <div className="mt-4 pt-4 border-t">
                            <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center text-primary hover:text-blue-700 font-medium transition-colors"
                            >
                                <i className="fas fa-globe mr-2"></i>
                                Kunjungi Website Resmi
                                <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                            </a>
                        </div>
                    )}
                </div>
                
                {/* Job Listings */}
                <div>
                    <h2 className="text-xl font-bold text-secondary mb-6">Lowongan Tersedia ({filteredJobs.length})</h2>
                    
                    {/* Filter Bar for Jobs */}
                    {companyJobs.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                <div className="lg:col-span-2">
                                    <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">Kata Kunci</label>
                                    <input type="text" id="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Judul posisi..." className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md"/>
                                </div>
                                <div>
                                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Tipe</label>
                                    <select id="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)} className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md bg-white">
                                        {uniqueJobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                </div>
                                <button onClick={handleResetFilters} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition">Reset</button>
                            </div>
                        </div>
                    )}
                    
                    {filteredJobs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentJobs.map(job => (
                            <JobCard key={job.id} job={job} onSelectJob={onSelectJob} onSelectCategory={onSelectCategory} onSelectCompany={onSelectCompany} />
                        ))}
                        </div>

                        <Pagination 
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                    </>
                    ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                        <h3 className="text-xl font-semibold text-secondary">Belum Ada Lowongan</h3>
                        <p className="text-gray-500 mt-2">
                          {companyJobs.length > 0 ? "Tidak ada lowongan yang cocok dengan filter Anda." : `Saat ini belum ada lowongan yang tersedia untuk ${company.name}.`}
                        </p>
                    </div>
                    )}
                </div>
            </div>
            <Sidebar isPreviewMode={isPreviewMode} onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default CompanyDetailPage;


