import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Competition } from '../types';
import CompetitionCard from './CompetitionCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { competitionsService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const CompetitionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCompetitions, setTotalCompetitions] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchCompetitions = async (page: number, search: string, cat: string, append: boolean = false) => {
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

      const result = await competitionsService.getAll(options);
      
      if (append) {
        setCompetitions(prev => [...prev, ...result.data]);
      } else {
        setCompetitions(result.data);
      }
      
      setTotalCompetitions(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      if (!append) {
        setCompetitions([]);
        setTotalCompetitions(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCompetitionDetail(slug);
    } else {
      setSelectedCompetition(null);
      setCompetitions([]);
      setCurrentPage(1);
      fetchCompetitions(1, activeKeyword, activeCategory, false);
    }
  }, [slug, activeKeyword, activeCategory]);

  const fetchCompetitionDetail = async (competitionSlug: string) => {
    try {
      setLoading(true);
      const data = await competitionsService.getBySlug(competitionSlug);
      setSelectedCompetition(data);
      await competitionsService.incrementViews(data.id);
    } catch (error) {
      console.error('Error fetching competition detail:', error);
      navigate('/lomba');
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
    fetchCompetitions(nextPage, activeKeyword, activeCategory, true);
  };

  const handleSelectCompetition = (competitionSlug: string) => {
    navigate(`/lomba/${competitionSlug}`);
  };

  const handleBack = () => {
    navigate('/lomba');
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

  if (selectedCompetition) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Daftar Lomba
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              {selectedCompetition.organizer_logo && (
                <div className="bg-gray-100 rounded-lg p-3">
                  <img
                    src={selectedCompetition.organizer_logo}
                    alt={selectedCompetition.organizer_name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCompetition.title}</h1>
                <p className="text-lg text-gray-600">{selectedCompetition.organizer_name}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                {selectedCompetition.category}
              </span>
              {selectedCompetition.prize_pool && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                  <i className="fas fa-trophy mr-1"></i>
                  {selectedCompetition.prize_pool}
                </span>
              )}
              {selectedCompetition.location && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {selectedCompetition.is_online ? 'Online' : selectedCompetition.location}
                </span>
              )}
            </div>

            {selectedCompetition.registration_deadline && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                <p className="text-red-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Batas pendaftaran: <strong>{new Date(selectedCompetition.registration_deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </p>
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-bold mb-3">Deskripsi</h2>
              <p className="text-gray-700 whitespace-pre-line">{selectedCompetition.description}</p>
            </div>

            {selectedCompetition.prizes && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Hadiah</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedCompetition.prizes}</p>
              </div>
            )}

            {selectedCompetition.eligibility && (
              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Syarat & Ketentuan</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedCompetition.eligibility}</p>
              </div>
            )}

            {selectedCompetition.registration_fee && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-blue-800">
                  <i className="fas fa-money-bill-wave mr-2"></i>
                  Biaya pendaftaran: <strong>{selectedCompetition.registration_fee}</strong>
                </p>
              </div>
            )}

            {selectedCompetition.competition_date && (
              <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
                <p className="text-green-800">
                  <i className="fas fa-calendar mr-2"></i>
                  Tanggal pelaksanaan: <strong>{new Date(selectedCompetition.competition_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </p>
              </div>
            )}

            {selectedCompetition.tags && selectedCompetition.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedCompetition.tags.map((tag, index) => (
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
                  {selectedCompetition.views_count} views
                </span>
                <span className="text-sm text-gray-500">
                  Diposting: {new Date(selectedCompetition.posted_date).toLocaleDateString('id-ID')}
                </span>
              </div>
              
              <a
                href={selectedCompetition.registration_url}
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
                Cari Lomba
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul, penyelenggara..."
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
                <option value="Esai">Esai</option>
                <option value="Bisnis">Bisnis</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Seni">Seni</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Akademik">Akademik</option>
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
            {isSearching ? 'Hasil Pencarian' : 'Daftar Lomba'}
          </h2>
          <p className="text-gray-600 mt-1">{totalCompetitions} lomba ditemukan</p>
        </div>

        {competitions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900">Lomba Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Saat ini belum ada lomba yang tersedia untuk kriteria pencarian Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {competitions.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  onSelect={handleSelectCompetition}
                />
              ))}
            </div>

            <LoadMore
              hasMore={hasMore}
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              itemsShown={competitions.length}
              totalItems={totalCompetitions}
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

export default CompetitionPage;
