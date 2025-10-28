import React, { useState, useEffect } from 'react';
import { Job, CompanyProfile, Company, RecruitmentEvent, BlogPost } from '../types';
import JobCard from './JobCard';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

interface CompanyJobListPageProps {
  companySlug?: string;
  companyPreview?: CompanyProfile;
  allJobs: Job[];
  allCompanies: CompanyProfile[];
  onSelectJob: (jobId: number) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
  isPreviewMode?: boolean;
}

const ITEMS_PER_PAGE = 10;

const CompanyJobListPage: React.FC<CompanyJobListPageProps> = ({ companySlug, companyPreview, allJobs, allCompanies, onSelectJob, onSelectCategory, onSelectCompany, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents, isPreviewMode = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const company = companyPreview || allCompanies.find(c => c.slug === companySlug);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [companySlug, companyPreview]);

  const filteredJobs = company ? allJobs.filter(job => job.companySlug === company.slug) : [];

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
                    <div className="mx-auto md:mx-0 h-20 w-20 flex items-center justify-center bg-white border border-gray-100 rounded-lg p-2 shrink-0">
                        <img src={company.logo} alt={`${company.name} logo`} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary text-center md:text-left">Lowongan di {company.name}</h2>
                        <p className="text-gray-600 mt-1 text-center md:text-left">{filteredJobs.length} lowongan ditemukan</p>
                    </div>
                </div>

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
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-secondary">Lowongan Tidak Ditemukan</h3>
                    <p className="text-gray-500 mt-2">
                    Saat ini belum ada lowongan yang tersedia untuk {company.name}.
                    </p>
                </div>
                )}
            </div>
            <Sidebar isPreviewMode={isPreviewMode} onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default CompanyJobListPage;