import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CampusEvent } from '../types';
import CampusEventCard from './CampusEventCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { campusEventsService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const CampusEventPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [eventType, setEventType] = useState('');
  const [activeEventType, setActiveEventType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchEvents = async (page: number, search: string, type: string, append: boolean = false) => {
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

      if (type) {
        options.eventType = type;
      }

      const result = await campusEventsService.getAll(options);
      
      if (append) {
        setEvents(prev => [...prev, ...result.data]);
      } else {
        setEvents(result.data);
      }
      
      setTotalEvents(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching campus events:', error);
      if (!append) {
        setEvents([]);
        setTotalEvents(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchEventDetail(slug);
    } else {
      setSelectedEvent(null);
      setEvents([]);
      setCurrentPage(1);
      fetchEvents(1, activeKeyword, activeEventType, false);
    }
  }, [slug, activeKeyword, activeEventType]);

  const fetchEventDetail = async (eventSlug: string) => {
    try {
      setLoading(true);
      const data = await campusEventsService.getBySlug(eventSlug);
      setSelectedEvent(data);
      await campusEventsService.incrementViews(data.id);
    } catch (error) {
      console.error('Error fetching event detail:', error);
      navigate('/event-kampus');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setActiveEventType(eventType);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setEventType('');
    setActiveEventType('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchEvents(nextPage, activeKeyword, activeEventType, true);
  };

  const handleSelectEvent = (eventSlug: string) => {
    navigate(`/event-kampus/${eventSlug}`);
  };

  const handleBack = () => {
    navigate('/event-kampus');
  };

  if (loading && !isLoadingMore) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Daftar Event
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {selectedEvent.poster_image && (
              <div className="h-96 bg-gray-200">
                <img
                  src={selectedEvent.poster_image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                {selectedEvent.university_logo && (
                  <div className="bg-gray-100 rounded-lg p-3">
                    <img
                      src={selectedEvent.university_logo}
                      alt={selectedEvent.university_name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h1>
                  <p className="text-lg text-gray-600">{selectedEvent.university_name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                  {selectedEvent.event_type}
                </span>
                <span className={`px-3 py-1 rounded-full font-semibold ${selectedEvent.is_free ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {selectedEvent.is_free ? 'Gratis' : selectedEvent.ticket_price || 'Berbayar'}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {selectedEvent.is_online ? 'Online' : selectedEvent.location}
                </span>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <div className="flex items-center text-blue-800 mb-2">
                  <i className="far fa-calendar text-xl mr-3"></i>
                  <div>
                    <p className="font-semibold">
                      {new Date(selectedEvent.date).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      {selectedEvent.end_date && (
                        <> - {new Date(selectedEvent.end_date).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold mb-3">Tentang Event</h2>
                <p className="text-gray-700 whitespace-pre-line">{selectedEvent.description}</p>
              </div>

              {!selectedEvent.is_online && selectedEvent.address && (
                <div className="prose max-w-none mb-6">
                  <h2 className="text-xl font-bold mb-3">Lokasi</h2>
                  <p className="text-gray-700">{selectedEvent.address}</p>
                </div>
              )}

              {selectedEvent.max_attendees && (
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
                  <p className="text-yellow-800">
                    <i className="fas fa-users mr-2"></i>
                    Kuota Terbatas: {selectedEvent.max_attendees} peserta
                  </p>
                </div>
              )}

              {(selectedEvent.contact_person || selectedEvent.contact_email || selectedEvent.contact_phone) && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-lg mb-2">Kontak</h3>
                  {selectedEvent.contact_person && <p className="text-gray-700">Nama: {selectedEvent.contact_person}</p>}
                  {selectedEvent.contact_email && <p className="text-gray-700">Email: {selectedEvent.contact_email}</p>}
                  {selectedEvent.contact_phone && <p className="text-gray-700">Telepon: {selectedEvent.contact_phone}</p>}
                </div>
              )}

              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, index) => (
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
                    {selectedEvent.views_count} views
                  </span>
                  <span className="text-sm text-gray-500">
                    Diposting: {new Date(selectedEvent.posted_date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                
                {selectedEvent.registration_required && selectedEvent.registration_url && (
                  <a
                    href={selectedEvent.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Daftar Event
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSearching = activeKeyword || activeEventType;

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
                Cari Event
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul, universitas..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="type-select" className="block text-sm font-medium text-gray-700">
                Tipe Event
              </label>
              <select
                id="type-select"
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="">Semua Tipe</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Konferensi">Konferensi</option>
                <option value="Festival">Festival</option>
                <option value="Pameran">Pameran</option>
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
            {isSearching ? 'Hasil Pencarian' : 'Daftar Event Kampus'}
          </h2>
          <p className="text-gray-600 mt-1">{totalEvents} event ditemukan</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900">Event Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Saat ini belum ada event kampus yang tersedia untuk kriteria pencarian Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {events.map((event) => (
                <CampusEventCard
                  key={event.id}
                  event={event}
                  onSelect={handleSelectEvent}
                />
              ))}
            </div>

            <LoadMore
              hasMore={hasMore}
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              itemsShown={events.length}
              totalItems={totalEvents}
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

export default CampusEventPage;
