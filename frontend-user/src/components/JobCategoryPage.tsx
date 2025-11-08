import React, { useState, useEffect, useMemo } from 'react';
import { PROVINCES, CITIES_BY_PROVINCE } from '../constants';
import { Job, Company, RecruitmentEvent, BlogPost } from '../types';
import { deslugify } from '../utils/slugify';
import JobCard from './JobCard';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';

interface JobCategoryPageProps {
  category: string;
  allJobs: Job[];
  onSelectJob: (jobSlug: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const INITIAL_ITEMS = 10;
const ITEMS_TO_LOAD = 10;

const JobCategoryPage: React.FC<JobCategoryPageProps> = ({ category, allJobs, onSelectJob, onSelectCategory, onSelectCompany, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for filter inputs
  const [keyword, setKeyword] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(''); // Stores province ID
  const [selectedCity, setSelectedCity] = useState(''); // Stores city NAME

  // State for applied filters
  const [activeFilters, setActiveFilters] = useState({
    keyword: '',
    province: '', // province ID
    city: '' // city NAME
  });

  const [provinceOptions, setProvinceOptions] = useState<{ id: string, name: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ id: string, name: string }[]>([]);

  const isSearching = activeFilters.keyword || activeFilters.province || activeFilters.city;

  useEffect(() => {
    // Populate provinces on mount
    const provincesArray = Object.entries(PROVINCES).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
    setProvinceOptions(provincesArray);
  }, []);

  useEffect(() => {
    // Update cities when province changes
    if (selectedProvince && CITIES_BY_PROVINCE[selectedProvince as keyof typeof CITIES_BY_PROVINCE]) {
        const citiesData = CITIES_BY_PROVINCE[selectedProvince as keyof typeof CITIES_BY_PROVINCE];
        const citiesArray = Object.entries(citiesData).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
        setCityOptions(citiesArray);
    } else {
        setCityOptions([]);
    }
    setSelectedCity('');
  }, [selectedProvince]);

  useEffect(() => {
    // Reset filters and page when category changes
    handleReset();
    setVisibleItems(INITIAL_ITEMS);
  }, [category]);
  
  const handleSearch = () => {
    setActiveFilters({
      keyword,
      province: selectedProvince,
      city: selectedCity
    });
    setVisibleItems(INITIAL_ITEMS);
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedProvince('');
    setSelectedCity('');
    setActiveFilters({ keyword: '', province: '', city: '' });
    setVisibleItems(INITIAL_ITEMS);
  };

  const filteredJobs = useMemo(() => {
    let jobs = allJobs;

    // 1. Initial Category Filter
    if (category && category !== 'Lowongan Terbaru') {
        // Convert slug to readable format for matching
        const readableCategory = deslugify(category);
        const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');
        const normalizedReadable = readableCategory.toLowerCase();
        
        jobs = jobs.filter(job => {
            const lowerCaseTags = job.tags.map(t => t.toLowerCase());
            return job.category.toLowerCase() === normalizedCategory ||
                   job.category.toLowerCase() === normalizedReadable ||
                   job.type.toLowerCase() === normalizedCategory ||
                   job.type.toLowerCase() === normalizedReadable ||
                   job.education.toLowerCase() === normalizedCategory ||
                   job.education.toLowerCase() === normalizedReadable ||
                   job.experience.toLowerCase() === normalizedCategory ||
                   job.experience.toLowerCase() === normalizedReadable ||
                   (job.majors && job.majors.some(major => 
                     major.toLowerCase().includes(normalizedCategory) ||
                     major.toLowerCase().includes(normalizedReadable)
                   )) ||
                   lowerCaseTags.includes(normalizedCategory) ||
                   lowerCaseTags.includes(normalizedReadable);
        });
    }

    // 2. Active Search Filters from Filter Bar
    const { keyword: activeKeyword, province: activeProvinceId, city: activeCityName } = activeFilters;

    if (activeKeyword) {
        const normalizedKeyword = activeKeyword.toLowerCase();
        jobs = jobs.filter(job =>
            job.title.toLowerCase().includes(normalizedKeyword) ||
            job.company.toLowerCase().includes(normalizedKeyword) ||
            job.description.toLowerCase().includes(normalizedKeyword) ||
            job.tags.some(tag => tag.toLowerCase().includes(normalizedKeyword)) ||
            (job.majors && job.majors.some(major => major.toLowerCase().includes(normalizedKeyword)))
        );
    }

    if (activeProvinceId) {
         const provinceName = PROVINCES[activeProvinceId];
         jobs = jobs.filter(job => job.province === provinceName);
    }

    if (activeCityName) {
        jobs = jobs.filter(job => job.city === activeCityName);
    }
    
    // Also include 'Seluruh Indonesia' jobs if no location filter is applied
    if (!activeProvinceId && !activeCityName) {
        const allIndonesiaJobs = allJobs.filter(job => job.province === 'Seluruh Indonesia');
        const jobIds = new Set(jobs.map(j => j.id));
        allIndonesiaJobs.forEach(job => {
            if (!jobIds.has(job.id)) {
                // Apply keyword filter to these jobs as well
                if (activeKeyword) {
                    const normalizedKeyword = activeKeyword.toLowerCase();
                    if (job.title.toLowerCase().includes(normalizedKeyword) ||
                        job.company.toLowerCase().includes(normalizedKeyword) ||
                        job.description.toLowerCase().includes(normalizedKeyword) ||
                        job.tags.some(tag => tag.toLowerCase().includes(normalizedKeyword)) ||
                        (job.majors && job.majors.some(major => major.toLowerCase().includes(normalizedKeyword)))) {
                        jobs.push(job);
                    }
                } else {
                    jobs.push(job);
                }
            }
        });
    }


    return jobs;
  }, [category, activeFilters, allJobs]);
  
  const currentJobs = filteredJobs.slice(0, visibleItems);
  const hasMore = visibleItems < filteredJobs.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_TO_LOAD);
      setIsLoading(false);
    }, 300);
  };


  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-2">
                    <label htmlFor="keyword-search" className="block text-sm font-medium text-gray-700">Posisi, Jurusan, atau Perusahaan</label>
                    <div className="relative mt-1">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text" 
                            id="keyword-search" 
                            value={keyword} 
                            onChange={e => setKeyword(e.target.value)} 
                            placeholder="Contoh: Staff Administrasi" 
                            className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="provinsi-select" className="block text-sm font-medium text-gray-700">Provinsi</label>
                    <select 
                        id="provinsi-select" 
                        value={selectedProvince} 
                        onChange={e => setSelectedProvince(e.target.value)} 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                        <option value="">Semua Provinsi</option>
                        {provinceOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="kota-select" className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
                    <select 
                        id="kota-select" 
                        value={selectedCity} 
                        onChange={e => setSelectedCity(e.target.value)} 
                        disabled={!selectedProvince} 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                        <option value="">Semua Kota/Kabupaten</option>
                        {cityOptions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
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
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary">{isSearching ? 'Hasil Pencarian' : `Lowongan: ${category}`}</h2>
                        <p className="text-gray-600 mt-1">{filteredJobs.length} lowongan ditemukan</p>
                    </div>
                </div>

                {filteredJobs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentJobs.map(job => (
                        <JobCard key={job.id} job={job} onSelectJob={onSelectJob} onSelectCategory={onSelectCategory} onSelectCompany={onSelectCompany} />
                    ))}
                    </div>

                    <LoadMore
                      hasMore={hasMore}
                      isLoading={isLoading}
                      onLoadMore={handleLoadMore}
                      itemsShown={currentJobs.length}
                      totalItems={filteredJobs.length}
                    />
                </>
                ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-secondary">Lowongan Tidak Ditemukan</h3>
                    <p className="text-gray-500 mt-2">
                        Saat ini belum ada lowongan yang tersedia untuk kriteria pencarian Anda.
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

export default JobCategoryPage;
