import React, { useState, useEffect } from 'react';
import { RecruitmentEvent, Company, BlogPost } from '../types';
import Sidebar from './Sidebar';
import { toast } from '../utils/toast';
import { viewTrackingService } from '../services/viewTracking';
import { injectJSONLD, updateMetaTags, generateEventSchema, generateBreadcrumbSchema, generateSlug } from '../utils/seo';

interface EventDetailPageProps {
  event: RecruitmentEvent;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  onSelectCompany: (companySlug: string) => void;
  isPreviewMode?: boolean;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, onSelectCompany, isPreviewMode = false, trendingCompanies, latestArticles, allEvents }) => {
  const [activeTab, setActiveTab] = useState('Tentang Event');

  // Track event view and inject SEO
  useEffect(() => {
    if (event && !isPreviewMode) {
      viewTrackingService.trackEventView(event.id);
      
      // Update page meta tags
      updateMetaTags({
        title: `${event.title} - Event Rekrutmen | KabarKarir.com`,
        description: event.description?.substring(0, 155) || `Event rekrutmen ${event.title} akan diadakan pada ${event.date} di ${event.location}. Jangan lewatkan kesempatan berkarir!`,
        keywords: `event rekrutmen, ${event.title}, ${event.organizer}, ${event.location}, job fair, career fair`,
        canonical: `https://www.kabarkarir.com/event/${event.slug || event.id}`,
        ogImage: event.image || 'https://www.kabarkarir.com/og-image.jpg',
        ogType: 'event'
      });

      // Inject Event structured data
      injectJSONLD(generateEventSchema(event));

      // Inject Breadcrumb structured data
      injectJSONLD(generateBreadcrumbSchema([
        { name: 'Beranda', url: 'https://www.kabarkarir.com/' },
        { name: 'Event Rekrutmen', url: 'https://www.kabarkarir.com/event' },
        { name: event.title, url: window.location.href }
      ]));
    }
  }, [event, isPreviewMode]);

  const getEmbeddableGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    const fileIdMatch = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  const getShareLinks = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Jangan lewatkan event rekrutmen "${event.title}" pada ${event.date}!`);
    
    return {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      threads: `https://www.threads.net/share?url=${url}&text=${text}`,
    };
  };

  const shareLinks = getShareLinks();
  
  const handleInstagramShare = () => {
      navigator.clipboard.writeText(window.location.href);
      toast('Link disalin! Bagikan di Instagram Story atau bio Anda.');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Link berhasil disalin!');
  };

  const tabs = ['Tentang Event', 'Posisi Dibuka', 'Lokasi Event'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Tentang Event':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-xl text-secondary mb-4">Deskripsi Event</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.description || '' }} />
            </div>
            {event.participatingCompanies && event.participatingCompanies.length > 0 && (
              <div>
                <h2 className="font-bold text-xl text-secondary">Perusahaan Partisipan</h2>
                <div className="flex flex-wrap gap-4 mt-4">
                  {event.participatingCompanies.map(company => {
                    const isClickable = company.slug && !isPreviewMode;
                    const commonClasses = "flex items-center bg-gray-100 p-2 rounded-md";

                    if (isClickable) {
                        return (
                            <a
                                key={company.name}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onSelectCompany(company.slug!);
                                }}
                                className={`${commonClasses} transition hover:bg-blue-100 hover:shadow-sm`}
                            >
                                <img src={company.logo} alt={company.name} className="h-8 object-contain mr-3" />
                                <span className="text-sm font-medium text-primary">{company.name}</span>
                            </a>
                        );
                    } else {
                        return (
                            <div key={company.name} className={commonClasses}>
                                <img src={company.logo} alt={company.name} className="h-8 object-contain mr-3" />
                                <span className="text-sm font-medium text-secondary">{company.name}</span>
                            </div>
                        );
                    }
                  })}
                </div>
              </div>
            )}
            {event.videoEmbedUrl && (
              <div className="mt-6">
                  <h2 className="font-bold text-xl text-secondary mb-3">Video</h2>
                  <div className="responsive-iframe-container rounded-lg overflow-hidden shadow">
                      <iframe
                          src={event.videoEmbedUrl.replace("watch?v=", "embed/")}
                          title="Video Event"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      ></iframe>
                  </div>
              </div>
            )}
             {event.pdfEmbedUrl && (
              <div className="mt-6">
                  <h2 className="font-bold text-xl text-secondary mb-3">Dokumen</h2>
                  <div className="w-full h-[700px] rounded-lg overflow-hidden shadow border">
                      <iframe
                          src={getEmbeddableGoogleDriveUrl(event.pdfEmbedUrl)}
                          title="Dokumen Event"
                          className="w-full h-full"
                      ></iframe>
                  </div>
              </div>
            )}
          </div>
        );
      case 'Posisi Dibuka':
        return (
          <div>
            <h2 className="font-bold text-xl text-secondary">Posisi yang Dibuka</h2>
            {event.availablePositions && event.availablePositions.length > 0 ? (
              <ul className="list-disc pl-5 mt-4 space-y-1">
                 {event.availablePositions.map((pos, index) => <li key={index}>{pos}</li>)}
              </ul>
            ) : (
              <p className="mt-4">Informasi posisi yang dibuka belum tersedia saat ini.</p>
            )}
          </div>
        );
      case 'Lokasi Event':
        return (
           <div className="space-y-8">
            {event.whatToBring && (
               <div>
                <h2 className="font-bold text-xl text-secondary">Apa yang Harus Dibawa?</h2>
                <ul className="list-disc pl-5 mt-4 space-y-1">
                   {event.whatToBring.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
            {event.mapDirectionUrl && (
                <div className="mt-6">
                    <a href={event.mapDirectionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                        <i className="fas fa-map-signs mr-2"></i> Buka Petunjuk Arah di Google Maps
                    </a>
                </div>
            )}
            {event.mapEmbedUrl && (
              <div>
                <h2 className="font-bold text-xl text-secondary">Peta Lokasi</h2>
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src={event.mapEmbedUrl}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Event Location"
                  ></iframe>
                </div>
              </div>
            )}
           </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Event Detail */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow">
            <article>
              {/* Header */}
              <header className="mb-6">
                <span className="text-sm font-medium text-primary">{event.type}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{event.title}</h1>
                <p className="text-gray-600 mt-2 text-lg">Diselenggarakan oleh: 
                    {event.organizerSlug && !isPreviewMode ? (
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                onSelectCompany(event.organizerSlug!);
                            }}
                            className="font-semibold text-primary hover:underline hover:text-blue-700 transition-colors"
                        >
                            {` ${event.organizer}`}
                        </a>
                    ) : (
                        <span className="font-semibold">{` ${event.organizer}`}</span>
                    )}
                </p>
                <div className="flex items-center flex-wrap text-sm text-gray-500 mt-4 gap-x-6 gap-y-2">
                  <span className="flex items-center"><i className="far fa-calendar-alt mr-2 text-primary"></i> {event.date}</span>
                  <span className="flex items-center"><i className="far fa-clock mr-2 text-primary"></i> {event.time}</span>
                  <span className="flex items-center"><i className="fas fa-map-marker-alt mr-2 text-primary"></i> {event.location}</span>
                </div>
              </header>

              {/* Image */}
              <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
                <img src={event.image} alt={event.title} className="w-full h-auto object-cover" />
              </div>
              
              <a href="#" className="w-full text-center bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg mb-8 block">
                  Daftar Sekarang
              </a>

              {/* Tab System */}
              <div>
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                          activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>
                <div>
                  {renderTabContent()}
                </div>
              </div>

            </article>

            {/* Share Section */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-secondary mb-3">Bagikan Event Ini</h4>
              <div className="flex items-center space-x-3">
                    <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke WhatsApp" className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition text-lg">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition text-lg">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke X" className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition text-lg">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <button onClick={handleInstagramShare} aria-label="Bagikan ke Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white hover:opacity-90 transition text-lg">
                        <i className="fab fa-instagram"></i>
                    </button>
                    <a href={shareLinks.threads} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke Threads" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-black transition text-lg">
                        <i className="fas fa-at"></i>
                    </a>
                    <button onClick={handleCopyLink} aria-label="Salin Link" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-500 transition text-lg">
                        <i className="fas fa-link"></i>
                    </button>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar isPreviewMode={isPreviewMode} onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;