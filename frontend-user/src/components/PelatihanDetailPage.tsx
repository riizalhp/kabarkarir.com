import React, { useState, useEffect } from 'react';
import { PelatihanInfo, Company, RecruitmentEvent, BlogPost } from '../types';
import Sidebar from './Sidebar';
import { toast } from '../utils/toast';
import { isPelatihanFavorite, addFavoritePelatihan, removeFavoritePelatihan } from '../utils/favorites';
import { injectJSONLD, updateMetaTags, generateEventSchema, generateBreadcrumbSchema, generateSlug } from '../utils/seo';


interface PelatihanDetailPageProps {
  pelatihan: PelatihanInfo;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  isPreviewMode?: boolean;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const PelatihanDetailPage: React.FC<PelatihanDetailPageProps> = ({ pelatihan, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, isPreviewMode = false, trendingCompanies, latestArticles, allEvents }) => {
  const [activeTab, setActiveTab] = useState('Deskripsi Pelatihan');
  const [isFavorite, setIsFavorite] = useState(isPelatihanFavorite(pelatihan.id));

  // Inject SEO
  useEffect(() => {
    if (pelatihan && !isPreviewMode) {
      // Update page meta tags
      updateMetaTags({
        title: `${pelatihan.title} - Pelatihan ${pelatihan.category} | KabarKarir.com`,
        description: pelatihan.description?.substring(0, 155) || `Info pelatihan ${pelatihan.title} oleh ${pelatihan.organizer}. ${pelatihan.date} di ${pelatihan.location}.`,
        keywords: `pelatihan, ${pelatihan.category}, ${pelatihan.title}, ${pelatihan.organizer}, training, workshop`,
        canonical: `https://www.kabarkarir.com/pelatihan/${pelatihan.slug || pelatihan.id}`,
        ogImage: pelatihan.image || 'https://www.kabarkarir.com/og-image.jpg',
        ogType: 'article'
      });

      // Inject Event schema (pelatihan is also an event)
      injectJSONLD(generateEventSchema({
        id: pelatihan.id,
        title: pelatihan.title,
        description: pelatihan.description,
        organizer: pelatihan.organizer,
        date: pelatihan.date,
        location: pelatihan.location,
        image: pelatihan.image,
        time: '08:00 - 17:00',
        province: '',
        city: pelatihan.location,
        type: pelatihan.category,
        isFeatured: false
      }));

      // Inject Breadcrumb structured data
      injectJSONLD(generateBreadcrumbSchema([
        { name: 'Beranda', url: 'https://www.kabarkarir.com/' },
        { name: 'Pelatihan', url: 'https://www.kabarkarir.com/pelatihan' },
        { name: pelatihan.title, url: window.location.href }
      ]));
    }
  }, [pelatihan, isPreviewMode]);

  const getEmbeddableGoogleDriveUrl = (url: string): string => {
    if (!url) return '';
    const fileIdMatch = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoritePelatihan(pelatihan.id);
      toast(`${pelatihan.title} telah dihapus dari favorit`);
    } else {
      addFavoritePelatihan(pelatihan.id);
      toast(`${pelatihan.title} telah ditambahkan ke favorit`);
    }
    setIsFavorite(!isFavorite);
  };

  const getShareLinks = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Info pelatihan menarik: "${pelatihan.title}" oleh ${pelatihan.organizer}. Cek di sini!`);
    
    return {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    };
  };

  const shareLinks = getShareLinks();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Link berhasil disalin!');
  };

  const tabs = ['Deskripsi Pelatihan', 'Tanggal & Lokasi'];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Deskripsi Pelatihan':
        const descriptionContent = pelatihan.fullDescription || `<p>${pelatihan.description}</p>`;
        return (
          <div className="space-y-6">
              <div>
                  <h3 className="font-semibold text-lg text-secondary mb-3">Deskripsi Pelatihan</h3>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: descriptionContent }} />
              </div>
              
              {pelatihan.videoEmbedUrl && (
                  <div>
                      <h3 className="font-semibold text-lg text-secondary mb-3">Video Terkait</h3>
                      <div className="responsive-iframe-container rounded-lg overflow-hidden shadow">
                          <iframe
                              src={pelatihan.videoEmbedUrl.replace("watch?v=", "embed/")}
                              title="Video Pelatihan"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                          ></iframe>
                      </div>
                  </div>
              )}
              {pelatihan.pdfEmbedUrl && (
                  <div>
                      <h3 className="font-semibold text-lg text-secondary mb-3">Dokumen Terkait</h3>
                      <div className="w-full h-[700px] rounded-lg overflow-hidden shadow border">
                          <iframe
                              src={getEmbeddableGoogleDriveUrl(pelatihan.pdfEmbedUrl)}
                              title="Dokumen Pelatihan"
                              className="w-full h-full"
                          ></iframe>
                      </div>
                  </div>
              )}
          </div>
        );
      case 'Tanggal & Lokasi':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-secondary">Jadwal Pelaksanaan</h3>
              <p className="text-gray-700">{pelatihan.date}</p>
            </div>
             <div>
              <h3 className="font-semibold text-lg text-secondary">Lokasi</h3>
              <p className="text-gray-700">{pelatihan.location}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow">
            <article>
              <header className="mb-6">
                <span className="text-sm font-medium text-primary">{pelatihan.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mt-2">{pelatihan.title}</h1>
                <p className="text-gray-600 mt-2 text-lg">Diselenggarakan oleh: 
                  <span className="font-semibold">{` ${pelatihan.organizer}`}</span>
                </p>
              </header>

              <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
                <img src={pelatihan.image} alt={pelatihan.title} className="w-full h-auto object-cover" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href={pelatihan.registrationLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg">
                    Daftar Sekarang
                </a>
                <button 
                  onClick={toggleFavorite} 
                  className={`sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-lg font-bold transition duration-300 ${
                    isFavorite 
                      ? 'bg-accent/10 border-accent text-accent' 
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400'
                  }`}
                  aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                >
                  <i className={`${isFavorite ? 'fas' : 'far'} fa-bookmark text-xl`}></i>
                  <span className="hidden sm:inline">{isFavorite ? 'Tersimpan' : 'Simpan'}</span>
                </button>
              </div>
              
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

            <div className="mt-10 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-secondary mb-3">Bagikan Info Ini</h4>
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
                  <button onClick={handleCopyLink} aria-label="Salin Link" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-500 transition text-lg">
                      <i className="fas fa-link"></i>
                  </button>
              </div>
            </div>
          </div>

          <Sidebar isPreviewMode={isPreviewMode} onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </div>
  );
};

export default PelatihanDetailPage;
