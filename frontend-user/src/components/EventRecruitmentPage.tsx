import React, { useState, useMemo, useEffect } from 'react';
import { PROVINCES, CITIES_BY_PROVINCE } from '../constants';
import { RecruitmentEvent, Company, BlogPost } from '../types';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';

interface EventRecruitmentPageProps {
  allEvents: RecruitmentEvent[];
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
}

const INITIAL_ITEMS = 6;
const ITEMS_TO_LOAD = 6;

const EventCard: React.FC<{ event: RecruitmentEvent; onSelectEvent: (eventSlug: string) => void }> = ({ event, onSelectEvent }) => (
    <div 
        onClick={() => onSelectEvent(event.slug || String(event.id))}
        className={`bg-white rounded-lg shadow overflow-hidden flex flex-col transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full ${event.isFeatured ? 'border-2 border-accent' : ''}`}
    >
        <div className="relative p-5 flex-grow">
            {event.isFeatured && (
                <span className="absolute -top-3 right-5 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full z-10">UNGGULAN</span>
            )}
            <h3 className="font-bold text-secondary text-lg mb-3">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
                <i className="far fa-calendar-alt w-5 mr-2 text-primary"></i>
                <span>{event.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-map-marker-alt w-5 mr-2 text-primary"></i>
                <span>{event.location}</span>
            </div>
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-200 mt-auto">
            <button onClick={() => onSelectEvent(event.slug || String(event.id))} className="text-secondary font-medium hover:text-primary transition text-sm">
                Lihat Detail & Daftar
            </button>
        </div>
    </div>
);


const EventRecruitmentPage: React.FC<EventRecruitmentPageProps> = ({ allEvents, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles }) => {
  const [selectedProvince, setSelectedProvince] = useState(''); // Stores province ID
  const [selectedCity, setSelectedCity] = useState(''); // Stores city NAME
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [isLoading, setIsLoading] = useState(false);

  const [provinceOptions, setProvinceOptions] = useState<{ id: string, name: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const provincesArray = Object.entries(PROVINCES).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
    setProvinceOptions(provincesArray);
  }, []);

  useEffect(() => {
    if (selectedProvince && CITIES_BY_PROVINCE[selectedProvince]) {
      const citiesData = CITIES_BY_PROVINCE[selectedProvince as keyof typeof CITIES_BY_PROVINCE];
      const citiesArray = Object.entries(citiesData).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
      setCityOptions(citiesArray);
    } else {
      setCityOptions([]);
    }
    setSelectedCity('');
  }, [selectedProvince]);

  useEffect(() => {
    setVisibleItems(INITIAL_ITEMS);
  }, [selectedProvince, selectedCity, searchTerm]);

  const filteredEvents = useMemo(() => {
    let events = [...allEvents];

    // Filter by search term
    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        events = events.filter(event => 
            event.title.toLowerCase().includes(lowercasedTerm) ||
            event.organizer.toLowerCase().includes(lowercasedTerm)
        );
    }

    // Filter by location
    if (selectedProvince) {
        const provinceName = PROVINCES[selectedProvince];
        const onlineEvents = events.filter(event => event.province === 'Online');
        let physicalEvents = events.filter(event => event.province === provinceName);

        if (selectedCity) {
            physicalEvents = physicalEvents.filter(event => event.city === selectedCity);
        }

        events = [...onlineEvents, ...physicalEvents];
    }
    
    return events;
  }, [selectedProvince, selectedCity, searchTerm, allEvents]);

  const currentEvents = filteredEvents.slice(0, visibleItems);
  const hasMore = visibleItems < filteredEvents.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_TO_LOAD);
      setIsLoading(false);
    }, 300);
  };
  
  const handleReset = () => {
    setSelectedProvince('');
    setSelectedCity('');
    setSearchTerm('');
  };
  
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
                <label htmlFor="search-event" className="block text-sm font-medium text-gray-700">Cari Event</label>
                 <div className="relative mt-1">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="search-event"
                        placeholder="Nama event atau penyelenggara"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-primary"
                    />
                </div>
            </div>
            <div>
              <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">Provinsi</label>
              <select
                id="provinsi"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Semua Provinsi</option>
                {provinceOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition"
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            <main className="w-full lg:w-2/3">
              {currentEvents.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentEvents.map((event) => (
                          <div key={event.id} className="relative">
                            <EventCard event={event} onSelectEvent={onSelectEvent} />
                          </div>
                      ))}
                  </div>
                  <LoadMore
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={handleLoadMore}
                    itemsShown={currentEvents.length}
                    totalItems={filteredEvents.length}
                  />
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <i className="fas fa-calendar-times fa-3x text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-secondary">Event Tidak Ditemukan</h3>
                    <p className="text-gray-500 mt-2">
                        Saat ini belum ada event yang sesuai dengan filter Anda.
                    </p>
                </div>
              )}
            </main>
            <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default EventRecruitmentPage;