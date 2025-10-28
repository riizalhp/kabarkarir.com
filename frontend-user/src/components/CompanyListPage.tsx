import React, { useState, useEffect } from 'react';
import { CompanyProfile, Company, BlogPost, RecruitmentEvent } from '../types';
import CompanyCard from './CompanyCard';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

interface CompanyListPageProps {
  companies: CompanyProfile[];
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

type FilterType = 'Semua' | 'BUMN' | 'SWASTA' | 'INSTANSI';
const ITEMS_PER_PAGE = 12;

const CompanyListPage: React.FC<CompanyListPageProps> = ({ companies, onSelectCompany, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  
  const filters: FilterType[] = ['Semua', 'BUMN', 'SWASTA', 'INSTANSI'];

  const filteredCompanies = companies.filter(company => {
    if (activeFilter === 'Semua') return true;
    return company.type === activeFilter;
  });

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Daftar Perusahaan & Instansi</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Jelajahi peluang karir di berbagai perusahaan BUMN, swasta, dan instansi pemerintah yang menjadi mitra kami.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-2 px-5 rounded-full font-medium text-sm transition ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
                {currentCompanies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentCompanies.map(company => (
                      <CompanyCard key={company.id} company={company} onSelectCompany={onSelectCompany} />
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
                    <i className="fas fa-building fa-3x text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-secondary">Perusahaan Tidak Ditemukan</h3>
                    <p className="text-gray-500 mt-2">
                    Saat ini belum ada perusahaan yang terdaftar untuk kategori "{activeFilter}".
                    </p>
                </div>
                )}
            </div>
            <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default CompanyListPage;
