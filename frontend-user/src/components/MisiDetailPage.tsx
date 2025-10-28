import React, { useEffect } from 'react';
import { MisiCuanOffer, Company, RecruitmentEvent, BlogPost } from '../types';
import Sidebar from './Sidebar';
import { formatRewardString, formatDisplayDate } from '../utils/formatting';
import { injectJSONLD, updateMetaTags, generateMisiCuanSchema, generateBreadcrumbSchema, generateSlug } from '../utils/seo';

interface MisiDetailPageProps {
  offer: MisiCuanOffer;
  onStart: (offerId: number) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  onSelectCompany: (companySlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
  isPreviewMode?: boolean;
}

const MisiDetailPage: React.FC<MisiDetailPageProps> = ({ offer, onStart, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, onSelectCompany, trendingCompanies, latestArticles, allEvents, isPreviewMode=false }) => {
    
  // Inject SEO
  useEffect(() => {
    if (offer && !isPreviewMode) {
      // Update page meta tags
      updateMetaTags({
        title: `${offer.title} - Misi Cuan ${offer.company} | KabarKarir.com`,
        description: offer.description?.substring(0, 155) || `Dapatkan imbalan ${offer.reward} dengan menyelesaikan misi ${offer.title} dari ${offer.company}. Estimasi ${offer.time}.`,
        keywords: `misi cuan, ${offer.title}, ${offer.company}, cuan online, side hustle, penghasilan tambahan`,
        canonical: `https://www.kabarkarir.com/misi-cuan/${offer.slug || offer.id}`,
        ogImage: offer.logo || 'https://www.kabarkarir.com/og-image.jpg',
        ogType: 'article'
      });

      // Inject Misi Cuan Offer structured data
      injectJSONLD(generateMisiCuanSchema(offer));

      // Inject Breadcrumb structured data
      injectJSONLD(generateBreadcrumbSchema([
        { name: 'Beranda', url: 'https://www.kabarkarir.com/' },
        { name: 'Misi Cuan', url: 'https://www.kabarkarir.com/misi-cuan' },
        { name: offer.title, url: window.location.href }
      ]));
    }
  }, [offer, isPreviewMode]);
  
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPreviewMode) return;
    onSelectCompany(offer.companySlug);
  };
    
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
              <div className="bg-gray-100 rounded-lg w-20 h-20 flex items-center justify-center shrink-0 p-2">
                <img src={offer.logo} alt={`${offer.company} logo`} className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-secondary mt-2">{offer.title}</h1>
                <a href="#" onClick={handleCompanyClick} className="text-primary font-medium text-lg hover:underline hover:text-blue-700 transition-colors">{offer.company}</a>
                <div className="flex items-center flex-wrap text-sm text-gray-500 mt-2 gap-x-4 gap-y-1">
                  <span className="flex items-center"><i className="far fa-clock mr-2"></i> Estimasi: {offer.time}</span>
                  <span className="flex items-center"><i className="far fa-calendar-alt mr-2"></i> Berlaku hingga: {formatDisplayDate(offer.expiryDate)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-8 space-y-6">
              <div>
                <h3 className="font-bold text-xl text-secondary mb-3">Deskripsi Misi</h3>
                <p className="text-gray-700">{offer.description}</p>
              </div>

              {offer.steps && offer.steps.length > 0 && (
                <div>
                    <h3 className="font-bold text-xl text-secondary mb-3">Langkah-langkah Penyelesaian</h3>
                     <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        {offer.steps.map((step, index) => <li key={index}>{step}</li>)}
                    </ol>
                </div>
              )}

              <div>
                <h3 className="font-bold text-xl text-secondary mb-3">Syarat & Ketentuan</h3>
                <p className="text-gray-700">{offer.details || 'Tidak ada syarat dan ketentuan tambahan.'}</p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="py-1"><i className="fas fa-coins fa-lg mr-3"></i></div>
                  <div>
                    <p className="font-bold">Imbalan yang Kamu Dapatkan:</p>
                    <p className="text-2xl font-bold">{formatRewardString(offer.reward)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => onStart(offer.id)} 
              disabled={isPreviewMode}
              className="w-full text-center bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Ambil Misi Ini
            </button>
          </div>
          <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} isPreviewMode={isPreviewMode} />
        </div>
      </div>
    </div>
  );
};

export default MisiDetailPage;