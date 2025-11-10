import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Scholarship } from '../types';
import ScholarshipCard from './ScholarshipCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { scholarshipsService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const ScholarshipPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [level, setLevel] = useState('');
  const [activeLevel, setActiveLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchScholarships = async (page: number, search: string, eduLevel: string, append: boolean = false) => {
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

      if (eduLevel) {
        options.level = eduLevel;
      }

      const result = await scholarshipsService.getAll(options);
      
      if (append) {
        setScholarships(prev => [...prev, ...result.data]);
      } else {
        setScholarships(result.data);
      }
      
      setTotalScholarships(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      if (!append) {
        setScholarships([]);
        setTotalScholarships(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchScholarshipDetail(slug);
    } else {
      setSelectedScholarship(null);
      setScholarships([]);
      setCurrentPage(1);
      fetchScholarships(1, activeKeyword, activeLevel, false);
    }
  }, [slug, activeKeyword, activeLevel]);

  const fetchScholarshipDetail = async (scholarshipSlug: string) => {
    try {
      setLoading(true);
      const data = await scholarshipsService.getBySlug(scholarshipSlug);
      setSelectedScholarship(data);
      await scholarshipsService.incrementViews(data.id);
    } catch (error) {
      console.error('Error fetching scholarship detail:', error);
      navigate('/beasiswa');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setActiveLevel(level);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setLevel('');
    setActiveLevel('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchScholarships(nextPage, activeKeyword, activeLevel, true);
  };

  const handleSelectScholarship = (scholarshipSlug: string) => {
    navigate(`/beasiswa/${scholarshipSlug}`);
  };

  const handleBack = () => {
    navigate('/beasiswa');
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

  if (selectedScholarship) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Daftar Beasiswa
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              {selectedScholarship.provider_logo && (
                <div className="bg-gray-100 rounded-lg p-3">
                  <img
                    src={selectedScholarship.provider_logo}
                    alt={selectedScholarship.provider_name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedScholarship.title}</h1>
                <p className="text-lg text-gray-600">{selectedScholarship.provider_name}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {selectedScholarship.education_level}
              </span>
              {selectedScholarship.amount && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  <i className="fas fa-money-bill-wave mr-1"></i>
                  {selectedScholarship.amount}
                </span>
              )}
              {selectedScholarship.countries && selectedScholarship.countries.length > 0 && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <i className="fas fa-globe mr-1"></i>
                  {selectedScholarship.countries.join(', ')}
                </span>
              )}
            </div>

            {selectedScholarship.deadline && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                <p className="text-red-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Batas waktu pendaftaran: <strong>{new Date(selectedScholarship.deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </p>
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Deskripsi</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedScholarship.description}</p>
            </div>

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Eligibilitas</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedScholarship.eligibility}</p>
            </div>

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Benefit</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedScholarship.benefits}</p>
            </div>

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Cakupan Beasiswa</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedScholarship.coverage}</p>
            </div>

            {selectedScholarship.majors && selectedScholarship.majors.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Jurusan yang Tersedia</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedScholarship.majors.map((major, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {major}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedScholarship.tags && selectedScholarship.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedScholarship.tags.map((tag, index) => (
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
                  {selectedScholarship.views_count} views
                </span>
                <span className="text-sm text-gray-500">
                  Diposting: {new Date(selectedScholarship.posted_date).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              <a
                href={selectedScholarship.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSearching = activeKeyword || activeLevel;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="keyword-search" className="block text-sm font-medium text-gray-700">
                Cari Beasiswa
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul, penyedia..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="level-select" className="block text-sm font-medium text-gray-700">
                Jenjang Pendidikan
              </label>
              <select
                id="level-select"
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="">Semua Jenjang</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
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
            {isSearching ? 'Hasil Pencarian' : 'Daftar Beasiswa'}
              </h2>
              <p className="text-gray-600 mt-1">{totalScholarships} beasiswa ditemukan</p>
            </div>

            {scholarships.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900">Beasiswa Tidak Ditemukan</h3>
                <p className="text-gray-500 mt-2">
                  Saat ini belum ada beasiswa yang tersedia untuk kriteria pencarian Anda.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {scholarships.map((scholarship) => (
                    <ScholarshipCard
                      key={scholarship.id}
                      scholarship={scholarship}
                      onSelect={handleSelectScholarship}
                    />
                  ))}
                </div>

                <LoadMore
                  hasMore={hasMore}
                  isLoading={isLoadingMore}
                  onLoadMore={handleLoadMore}
                  itemsShown={scholarships.length}
                  totalItems={totalScholarships}
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

export default ScholarshipPage;
