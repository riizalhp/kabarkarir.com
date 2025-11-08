import React, { useState, useEffect } from 'react';
import { CompanyProfile, Company, BlogPost, RecruitmentEvent } from '../types';
import CompanyCard from './CompanyCard';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';
import { companiesService } from '../services/api';

interface CompanyListPageProps {
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const INITIAL_ITEMS = 12;
const ITEMS_TO_LOAD = 12;

const CompanyListPage: React.FC<CompanyListPageProps> = ({ 
  onSelectCompany,
  onNavigateToBlog,
  onNavigateToEventRecruitment,
  onSelectEvent,
  trendingCompanies,
  latestArticles,
  allEvents
}) => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedType, setSelectedType] = useState<'' | 'BUMN' | 'SWASTA' | 'INSTANSI'>('');
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchCompanies = async (page: number, type: typeof selectedType, search: string, append: boolean = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const offset = (page - 1) * ITEMS_TO_LOAD;
      
      const options: any = {
        limit: ITEMS_TO_LOAD,
        offset: offset,
      };

      if (type) {
        options.type = type;
      }

      if (search.trim()) {
        options.search = search.trim();
      }

      const result = await companiesService.getAll(options);
      
      if (append) {
        setCompanies(prev => [...prev, ...result.data]);
      } else {
        setCompanies(result.data);
      }
      
      setTotalCompanies(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching companies:', error);
      if (!append) {
        setCompanies([]);
        setTotalCompanies(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setCompanies([]);
    setCurrentPage(1);
    fetchCompanies(1, selectedType, activeKeyword, false);
  }, [selectedType, activeKeyword]);

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setSelectedType('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchCompanies(nextPage, selectedType, activeKeyword, true);
  };

  const totalPages = Math.ceil(totalCompanies / ITEMS_TO_LOAD);
  const isSearching = activeKeyword || selectedType;

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
              <label htmlFor="keyword-search" className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  id="keyword-search" 
                  value={keyword} 
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Contoh: Bank BNI, Telkom Indonesia" 
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="type-select" className="block text-sm font-medium text-gray-700">Kategori</label>
              <select 
                id="type-select" 
                value={selectedType} 
                onChange={e => {
                  setSelectedType(e.target.value as '' | 'BUMN' | 'SWASTA' | 'INSTANSI');
                  setCurrentPage(1);
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Semua Kategori</option>
                <option value="BUMN">BUMN</option>
                <option value="SWASTA">Swasta</option>
                <option value="INSTANSI">Instansi Pemerintah</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSearch} 
                className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center"
              >
                <i className="fas fa-search mr-2"></i>Cari
              </button>
              <button 
                onClick={handleReset} 
                title="Reset Filter"
                className="bg-gray-200 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-300 transition"
              >
                <i className="fas fa-undo fa-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                  {isSearching ? 'Hasil Pencarian' : 'Daftar Perusahaan'}
                </h2>
                <p className="text-gray-600 mt-1">{totalCompanies} perusahaan ditemukan</p>
              </div>
            </div>

            {loading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Array.from({ length: ITEMS_TO_LOAD }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="h-32 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : companies.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-secondary">Perusahaan Tidak Ditemukan</h3>
                <p className="text-gray-500 mt-2">
                  Saat ini belum ada perusahaan yang tersedia untuk kriteria pencarian Anda.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {companies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      onSelectCompany={() => onSelectCompany(company.slug)}
                    />
                  ))}
                </div>

                <LoadMore
                  hasMore={hasMore}
                  isLoading={isLoadingMore}
                  onLoadMore={handleLoadMore}
                  itemsShown={companies.length}
                  totalItems={totalCompanies}
                />
              </>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar 
            onNavigateToBlog={onNavigateToBlog}
            onNavigateToEventRecruitment={onNavigateToEventRecruitment}
            onSelectEvent={onSelectEvent}
            trendingCompanies={trendingCompanies}
            latestArticles={latestArticles}
            allEvents={allEvents}
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyListPage;



