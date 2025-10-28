
import React from 'react';
import { Company, BlogPost, RecruitmentEvent } from '../types';
import GoogleSidebarAd from './GoogleSidebarAd';

interface TrendingCompaniesProps {
    companies: Company[];
}

const TrendingCompanies: React.FC<TrendingCompaniesProps> = ({ companies }) => (
  <div className="bg-white rounded-lg shadow mb-6">
    <div className="bg-secondary text-white p-4 rounded-t-lg">
      <h3 className="font-semibold">Perusahaan Trending</h3>
    </div>
    <div className="p-4 space-y-2">
      {companies.map(company => (
        <a href="#" key={company.name} className="flex items-center hover:bg-gray-50 p-2 rounded transition">
          <div className="bg-gray-100 rounded w-10 h-10 flex items-center justify-center shrink-0">
            <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
          </div>
          <div className="ml-3 flex-1">
            <h4 className="font-medium text-secondary hover:text-primary text-sm transition-colors">{company.name}</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{company.jobsAvailable} lowongan</span>
              {(company as any).view_count && (
                <span className="flex items-center gap-1">
                  <i className="fas fa-eye text-primary"></i>
                  {(company as any).view_count} views
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

interface SidebarProps {
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
  isPreviewMode?: boolean;
}

const LatestArticlesWidget: React.FC<Pick<SidebarProps, 'onNavigateToBlog' | 'latestArticles'>> = ({ onNavigateToBlog, latestArticles }) => (
  <div className="bg-white rounded-lg shadow mb-6">
    <div className="bg-secondary text-white p-4 rounded-t-lg">
      <h3 className="font-semibold">Artikel Terbaru</h3>
    </div>
    <div className="p-4">
      <div className="space-y-2">
        {latestArticles.map(article => (
          <a href="#" key={article.id} className="block hover:bg-gray-50 p-2 rounded transition">
            <h4 className="font-medium text-secondary hover:text-primary text-sm transition-colors">{article.title}</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span>{article.posted}</span>
              {article.view_count && (
                <span className="flex items-center gap-1">
                  <i className="fas fa-eye text-primary"></i>
                  {article.view_count} views
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onNavigateToBlog();
        }} className="text-secondary text-sm font-medium hover:text-primary">
          Lihat semua artikel
        </a>
      </div>
    </div>
  </div>
);

const RecruitmentEvents: React.FC<Pick<SidebarProps, 'onNavigateToEventRecruitment' | 'onSelectEvent' | 'allEvents'>> = ({ onNavigateToEventRecruitment, onSelectEvent, allEvents }) => (
    <div className="bg-white rounded-lg shadow mb-6">
        <div className="bg-accent text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Event Rekrutmen</h3>
        </div>
        <div className="p-4 space-y-4">
            {allEvents.slice(0, 2).map(event => (
                <div key={event.id} className={`${event.isFeatured ? 'border-accent border-dashed' : 'border-gray-200'} border rounded-lg p-4`}>
                    <h4 className="font-semibold text-secondary">{event.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                        <i className="far fa-calendar-alt mr-2"></i> 
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                        <i className="fas fa-map-marker-alt mr-2"></i> 
                        <span>{event.location}</span>
                    </div>
                    {event.view_count && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                            <i className="fas fa-eye text-primary mr-2"></i>
                            <span>{event.view_count} views</span>
                        </div>
                    )}
                    <div className="mt-3">
                        <a href="#" onClick={(e) => { e.preventDefault(); onSelectEvent(event.id); }} className="text-secondary text-xs font-medium hover:text-primary">
                            Lihat Detail
                        </a>
                    </div>
                </div>
            ))}
             <div className="mt-4 text-center">
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    onNavigateToEventRecruitment();
                }} className="text-secondary text-sm font-medium hover:text-primary">
                    Lihat semua event
                </a>
            </div>
        </div>
    </div>
);

const DownloadAppBanner: React.FC = () => (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow p-5">
        <div className="text-white">
            <h3 className="font-semibold text-lg">Download Aplikasi KabarKarir.com</h3>
            <p className="text-white text-opacity-90 text-sm mt-2">Akses lowongan kerja terbaru kapan saja dan di mana saja</p>
            <div className="mt-4">
                <a href="#" className="bg-white text-primary py-2 px-4 rounded-full text-sm font-medium inline-flex items-center transition hover:bg-gray-200">
                    <i className="fab fa-google-play mr-2"></i> Google Play
                </a>
            </div>
        </div>
    </div>
);

const Sidebar: React.FC<SidebarProps> = ({ onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents, isPreviewMode = false }) => {
  if (isPreviewMode) {
    return null;
  }
  
  return (
    <aside className="w-full lg:w-1/3">
      <TrendingCompanies companies={trendingCompanies} />
      <GoogleSidebarAd />
      <LatestArticlesWidget onNavigateToBlog={onNavigateToBlog} latestArticles={latestArticles} />
      <RecruitmentEvents onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} allEvents={allEvents} />
      <DownloadAppBanner />
    </aside>
  );
};

export default Sidebar;