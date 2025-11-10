import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Webinar } from '../types';
import WebinarCard from './WebinarCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { webinarsService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const WebinarPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [filterFree, setFilterFree] = useState<string>('');
  const [activeFilterFree, setActiveFilterFree] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWebinars, setTotalWebinars] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchWebinars = async (page: number, search: string, freeFilter: string, append: boolean = false) => {
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

      if (freeFilter === 'free') {
        options.isFree = true;
      } else if (freeFilter === 'paid') {
        options.isFree = false;
      }

      const result = await webinarsService.getAll(options);
      
      if (append) {
        setWebinars(prev => [...prev, ...result.data]);
      } else {
        setWebinars(result.data);
      }
      
      setTotalWebinars(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching webinars:', error);
      if (!append) {
        setWebinars([]);
        setTotalWebinars(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchWebinarDetail(slug);
    } else {
      setSelectedWebinar(null);
      setWebinars([]);
      setCurrentPage(1);
      fetchWebinars(1, activeKeyword, activeFilterFree, false);
    }
  }, [slug, activeKeyword, activeFilterFree]);

  const fetchWebinarDetail = async (webinarSlug: string) => {
    try {
      setLoading(true);
      const data = await webinarsService.getBySlug(webinarSlug);
      setSelectedWebinar(data);
      await webinarsService.incrementViews(data.id);
    } catch (error) {
      console.error('Error fetching webinar detail:', error);
      navigate('/webinar');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setActiveFilterFree(filterFree);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setFilterFree('');
    setActiveFilterFree('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchWebinars(nextPage, activeKeyword, activeFilterFree, true);
  };

  const handleSelectWebinar = (webinarSlug: string) => {
    navigate(`/webinar/${webinarSlug}`);
  };

  const handleBack = () => {
    navigate('/webinar');
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

  if (selectedWebinar) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Daftar Webinar
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              {selectedWebinar.host_logo && (
                <div className="bg-gray-100 rounded-lg p-3">
                  <img
                    src={selectedWebinar.host_logo}
                    alt={selectedWebinar.host_name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedWebinar.title}</h1>
                <p className="text-lg text-gray-600">{selectedWebinar.host_name}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <span className={`px-3 py-1 rounded-full font-semibold ${selectedWebinar.is_free ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {selectedWebinar.is_free ? 'Gratis' : selectedWebinar.price || 'Berbayar'}
              </span>
              {selectedWebinar.platform && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <i className="fas fa-laptop mr-1"></i>
                  {selectedWebinar.platform}
                </span>
              )}
              {selectedWebinar.certificate_available && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <i className="fas fa-certificate mr-1"></i>
                  Sertifikat Tersedia
                </span>
              )}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <div className="flex items-center text-blue-800 mb-2">
                <i className="far fa-calendar text-xl mr-3"></i>
                <div>
                  <p className="font-semibold">
                    {new Date(selectedWebinar.date).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {selectedWebinar.duration && (
                    <p className="text-sm">Durasi: {selectedWebinar.duration}</p>
                  )}
                </div>
              </div>
            </div>

            {selectedWebinar.speaker_name && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-lg mb-2">Pembicara</h3>
                <div className="flex items-center gap-4">
                  {selectedWebinar.speaker_photo && (
                    <img
                      src={selectedWebinar.speaker_photo}
                      alt={selectedWebinar.speaker_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{selectedWebinar.speaker_name}</p>
                    {selectedWebinar.speaker_title && (
                      <p className="text-sm text-gray-600">{selectedWebinar.speaker_title}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Deskripsi</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedWebinar.description}</p>
            </div>

            {selectedWebinar.topics && selectedWebinar.topics.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Topik yang Dibahas</h2>
                <ul className="list-disc list-inside space-y-2">
                  {selectedWebinar.topics.map((topic, index) => (
                    <li key={index} className="text-gray-700">{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedWebinar.max_participants && (
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                <p className="text-yellow-800">
                  <i className="fas fa-users mr-2"></i>
                  Kuota Terbatas: {selectedWebinar.max_participants} peserta
                </p>
              </div>
            )}

            {selectedWebinar.tags && selectedWebinar.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedWebinar.tags.map((tag, index) => (
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
                  {selectedWebinar.views_count} views
                </span>
                <span className="text-sm text-gray-500">
                  Diposting: {new Date(selectedWebinar.posted_date).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              <a
                href={selectedWebinar.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Daftar Webinar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSearching = activeKeyword || activeFilterFree;

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
                Cari Webinar
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul, topik..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="free-select" className="block text-sm font-medium text-gray-700">
                Tipe
              </label>
              <select
                id="free-select"
                value={filterFree}
                onChange={e => setFilterFree(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="">Semua Tipe</option>
                <option value="free">Gratis</option>
                <option value="paid">Berbayar</option>
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
            {isSearching ? 'Hasil Pencarian' : 'Daftar Webinar'}
          </h2>
          <p className="text-gray-600 mt-1">{totalWebinars} webinar ditemukan</p>
        </div>

        {webinars.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900">Webinar Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Saat ini belum ada webinar yang tersedia untuk kriteria pencarian Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {webinars.map((webinar) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  onSelect={handleSelectWebinar}
                />
              ))}
            </div>

            <LoadMore
              hasMore={hasMore}
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              itemsShown={webinars.length}
              totalItems={totalWebinars}
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

export default WebinarPage;
