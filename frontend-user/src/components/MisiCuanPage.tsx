import React, { useState, useMemo, useEffect } from 'react';
import { MisiCuanOffer, Company, RecruitmentEvent, BlogPost } from '../types';
import OfferCard from './OfferCard';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';

interface MisiCuanPageProps {
  offers: MisiCuanOffer[];
  onSelectMisi: (offerId: number) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const INITIAL_ITEMS = 4;
const ITEMS_TO_LOAD = 4;

const MisiCuanPage: React.FC<MisiCuanPageProps> = ({ offers, onSelectMisi, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVisibleItems(INITIAL_ITEMS);
  }, [searchTerm]);

  const filteredOffers = useMemo(() => {
    if (!searchTerm) return offers;
    return offers.filter(offer => 
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [offers, searchTerm]);

  const currentOffers = filteredOffers.slice(0, visibleItems);
  const hasMore = visibleItems < filteredOffers.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_TO_LOAD);
      setIsLoading(false);
    }, 300);
  };
  
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                    type="text" 
                    placeholder="Cari misi berdasarkan judul atau perusahaan..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full py-3 px-4 pl-12 focus:outline-none rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
                <div className="space-y-6">
                {currentOffers.length > 0 ? (
                    <>
                      {currentOffers.map(offer => (
                          <OfferCard key={offer.id} offer={offer} onSelectMisi={onSelectMisi} />
                      ))}
                      <LoadMore
                        hasMore={hasMore}
                        isLoading={isLoading}
                        onLoadMore={handleLoadMore}
                        itemsShown={currentOffers.length}
                        totalItems={filteredOffers.length}
                      />
                    </>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow">
                    <i className="fas fa-search-dollar fa-3x text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-secondary">Misi Tidak Ditemukan</h3>
                    <p className="text-gray-500 mt-2">
                        Tidak ada misi yang cocok dengan pencarian Anda. Coba kata kunci lain.
                    </p>
                    </div>
                )}
                </div>
            </div>
            <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default MisiCuanPage;
