import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FreelanceJob } from '../types';
import FreelanceCard from './FreelanceCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { freelanceJobsService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const FreelancePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<FreelanceJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<FreelanceJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchJobs = async (page: number, search: string, cat: string, append: boolean = false) => {
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

      if (search.trim()) {
        options.search = search.trim();
      }

      if (cat) {
        options.category = cat;
      }

      const result = await freelanceJobsService.getAll(options);
      
      if (append) {
        setJobs(prev => [...prev, ...result.data]);
      } else {
        setJobs(result.data);
      }
      
      setTotalJobs(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching freelance jobs:', error);
      if (!append) {
        setJobs([]);
        setTotalJobs(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchJobDetail(slug);
    } else {
      setSelectedJob(null);
      setJobs([]);
      setCurrentPage(1);
      fetchJobs(1, activeKeyword, activeCategory, false);
    }
  }, [slug, activeKeyword, activeCategory]);

  const fetchJobDetail = async (jobSlug: string) => {
    try {
      setLoading(true);
      const data = await freelanceJobsService.getBySlug(jobSlug);
      setSelectedJob(data);
      await freelanceJobsService.incrementViews(data.id);
    } catch (error) {
      console.error('Error fetching job detail:', error);
      navigate('/freelance');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setCategory('');
    setActiveCategory('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchJobs(nextPage, activeKeyword, activeCategory, true);
  };

  const handleSelectJob = (jobSlug: string) => {
    navigate(`/freelance/${jobSlug}`);
  };

  const handleBack = () => {
    navigate('/freelance');
  };

  if (loading && !isLoadingMore) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedJob) {
    const formatBudget = () => {
      if (selectedJob.budget_min && selectedJob.budget_max) {
        return `${selectedJob.budget_currency} ${selectedJob.budget_min.toLocaleString()} - ${selectedJob.budget_max.toLocaleString()}`;
      } else if (selectedJob.budget_min) {
        return `${selectedJob.budget_currency} ${selectedJob.budget_min.toLocaleString()}+`;
      }
      return 'Negosiasi';
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Daftar Freelance
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedJob.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                {selectedJob.category}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {selectedJob.experience_level}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                <i className="fas fa-map-marker-alt mr-1"></i>
                {selectedJob.is_remote ? 'Remote' : selectedJob.location}
              </span>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
              <p className="text-green-800 font-bold text-lg">
                <i className="fas fa-money-bill-wave mr-2"></i>
                {formatBudget()}
                {selectedJob.budget_type && ` / ${selectedJob.budget_type}`}
              </p>
            </div>

            {selectedJob.deadline && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                <p className="text-red-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Deadline: <strong>{new Date(selectedJob.deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </p>
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Deskripsi Proyek</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
            </div>

            {selectedJob.requirements && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Persyaratan</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedJob.requirements}</p>
              </div>
            )}

            {selectedJob.deliverables && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Deliverables</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedJob.deliverables}</p>
              </div>
            )}

            {selectedJob.skills_required && selectedJob.skills_required.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Skills yang Dibutuhkan</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills_required.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedJob.duration && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-blue-800">
                  <i className="fas fa-clock mr-2"></i>
                  Durasi Proyek: <strong>{selectedJob.duration}</strong>
                </p>
              </div>
            )}

            {selectedJob.tags && selectedJob.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  <i className="far fa-eye mr-2"></i>
                  {selectedJob.views_count} views
                </span>
                <span className="text-sm text-gray-500">
                  Diposting: {new Date(selectedJob.posted_date).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              {selectedJob.application_url ? (
                <a
                  href={selectedJob.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Lamar Proyek
                </a>
              ) : selectedJob.application_email && (
                <a
                  href={`mailto:${selectedJob.application_email}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Kirim Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSearching = activeKeyword || activeCategory;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="keyword-search" className="block text-sm font-medium text-gray-700">
                Cari Proyek Freelance
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul proyek..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                id="category-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="">Semua Kategori</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Design">Design</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Data Entry">Data Entry</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center"
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

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSearching ? 'Hasil Pencarian' : 'Daftar Proyek Freelance'}
          </h2>
          <p className="text-gray-600 mt-1">{totalJobs} proyek ditemukan</p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900">Proyek Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Saat ini belum ada proyek freelance yang tersedia untuk kriteria pencarian Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {jobs.map((job) => (
                <FreelanceCard
                  key={job.id}
                  job={job}
                  onSelect={handleSelectJob}
                />
              ))}
            </div>

            <LoadMore
              hasMore={hasMore}
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              itemsShown={jobs.length}
              totalItems={totalJobs}
            />
          </>
        )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <Sidebar
              trendingScholarships={trendingScholarships}
              campusEvents={campusEvents}
              latestArticles={latestArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancePage;
