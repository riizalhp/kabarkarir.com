import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Internship } from '../types';
import InternshipCard from './InternshipCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { internshipsService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const InternshipPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [activeLocation, setActiveLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInternships, setTotalInternships] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchInternships = async (page: number, search: string, loc: string, append: boolean = false) => {
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

      if (loc.trim()) {
        options.location = loc.trim();
      }

      const result = await internshipsService.getAll(options);
      
      if (append) {
        setInternships(prev => [...prev, ...result.data]);
      } else {
        setInternships(result.data);
      }
      
      setTotalInternships(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching internships:', error);
      if (!append) {
        setInternships([]);
        setTotalInternships(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchInternshipDetail(slug);
    } else {
      setSelectedInternship(null);
      setInternships([]);
      setCurrentPage(1);
      fetchInternships(1, activeKeyword, activeLocation, false);
    }
  }, [slug, activeKeyword, activeLocation]);

  const fetchInternshipDetail = async (internshipSlug: string) => {
    try {
      setLoading(true);
      const data = await internshipsService.getBySlug(internshipSlug);
      setSelectedInternship(data);
      await internshipsService.incrementViews(data.id);
    } catch (error) {
      console.error('Error fetching internship detail:', error);
      navigate('/magang');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setActiveLocation(location);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setLocation('');
    setActiveLocation('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchInternships(nextPage, activeKeyword, activeLocation, true);
  };

  const handleSelectInternship = (internshipSlug: string) => {
    navigate(`/magang/${internshipSlug}`);
  };

  const handleBack = () => {
    navigate('/magang');
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

  if (selectedInternship) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Daftar Magang
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedInternship.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <i className="fas fa-building mr-2 text-blue-600"></i>
                <span className="font-semibold">{selectedInternship.company_name}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                <span>{selectedInternship.is_remote ? 'Remote' : selectedInternship.location}</span>
              </div>
              {selectedInternship.duration && (
                <div className="flex items-center">
                  <i className="fas fa-clock mr-2 text-blue-600"></i>
                  <span>{selectedInternship.duration}</span>
                </div>
              )}
              {selectedInternship.stipend && (
                <div className="flex items-center">
                  <i className="fas fa-money-bill-wave mr-2 text-green-600"></i>
                  <span className="font-semibold text-green-600">{selectedInternship.stipend}</span>
                </div>
              )}
            </div>

            {selectedInternship.application_deadline && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                <p className="text-red-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Batas waktu pendaftaran: <strong>{new Date(selectedInternship.application_deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </p>
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Deskripsi</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedInternship.description}</p>
            </div>

            {selectedInternship.requirements && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Persyaratan</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedInternship.requirements}</p>
              </div>
            )}

            {selectedInternship.responsibilities && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Tanggung Jawab</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedInternship.responsibilities}</p>
              </div>
            )}

            {selectedInternship.benefits && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Benefit</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedInternship.benefits}</p>
              </div>
            )}

            {selectedInternship.tags && selectedInternship.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedInternship.tags.map((tag, index) => (
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
                  {selectedInternship.views_count} views
                </span>
                <span className="text-sm text-gray-500">
                  Diposting: {new Date(selectedInternship.posted_date).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              {selectedInternship.application_url && (
                <a
                  href={selectedInternship.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Lamar Sekarang
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSearching = activeKeyword || activeLocation;

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
                Cari Magang
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul, perusahaan..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="location-search" className="block text-sm font-medium text-gray-700">
                Lokasi
              </label>
              <div className="relative mt-1">
                <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="location-search"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Jakarta, Remote..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
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
            {isSearching ? 'Hasil Pencarian' : 'Daftar Magang'}
          </h2>
          <p className="text-gray-600 mt-1">{totalInternships} magang ditemukan</p>
        </div>

        {internships.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900">Magang Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Saat ini belum ada program magang yang tersedia untuk kriteria pencarian Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {internships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  onSelect={handleSelectInternship}
                />
              ))}
            </div>

            <LoadMore
              hasMore={hasMore}
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              itemsShown={internships.length}
              totalItems={totalInternships}
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

export default InternshipPage;
