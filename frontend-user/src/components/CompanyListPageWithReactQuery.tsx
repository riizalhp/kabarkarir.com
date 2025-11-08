import React, { useState, useEffect } from 'react';
import { Company, BlogPost, RecruitmentEvent } from '../types';
import CompanyCard from './CompanyCard';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';
import { useCompanies } from '../hooks/useCompanies';

interface CompanyListPageWithReactQueryProps {
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

type FilterType = 'Semua' | 'BUMN' | 'SWASTA' | 'INSTANSI';
const INITIAL_ITEMS = 12;
const ITEMS_TO_LOAD = 12;

const CompanyListPageWithReactQuery: React.FC<CompanyListPageWithReactQueryProps> = ({ 
  onSelectCompany, 
  onNavigateToBlog, 
  onNavigateToEventRecruitment, 
  onSelectEvent, 
  trendingCompanies, 
  latestArticles, 
  allEvents 
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Use React Query hook - fetch with large limit to get all data
  const { data, isLoading, error } = useCompanies({
    filter: activeFilter,
    page: 1,
    itemsPerPage: 1000, // Fetch all companies at once for load more
  });

  const allCompanies = data?.data || [];
  const totalCompanies = data?.total || 0;
  
  const currentCompanies = allCompanies.slice(0, visibleItems);
  const hasMore = visibleItems < allCompanies.length;

  useEffect(() => {
    setVisibleItems(INITIAL_ITEMS);
  }, [activeFilter]);
  
  const filters: FilterType[] = ['Semua', 'BUMN', 'SWASTA', 'INSTANSI'];

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_TO_LOAD);
      setIsLoadingMore(false);
    }, 300);
  };

  if (error) {
    return (
      <section className="py-10 px-4">
        <div className="container mx-auto text-center">
          <i className="fas fa-exclamation-triangle fa-3x text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-secondary">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mt-2">Gagal memuat data perusahaan. Silakan refresh halaman.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
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
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 bg-gray-200 rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : currentCompanies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentCompanies.map((company: any) => (
                      <CompanyCard key={company.id} company={company} onSelectCompany={onSelectCompany} />
                      ))}
                  </div>
                   <LoadMore
                      hasMore={hasMore}
                      isLoading={isLoadingMore}
                      onLoadMore={handleLoadMore}
                      itemsShown={currentCompanies.length}
                      totalItems={totalCompanies}
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

export default CompanyListPageWithReactQuery;

