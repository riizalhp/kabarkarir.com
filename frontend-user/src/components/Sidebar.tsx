
import React from 'react';
import { Company, BlogPost, RecruitmentEvent } from '../types';

interface TrendingCompaniesProps {
    companies: Company[];
}

const TrendingCompanies: React.FC<TrendingCompaniesProps> = ({ companies }) => (
  <div className="bg-white rounded-lg shadow mb-4">
    <div className="bg-secondary text-white p-2.5 rounded-t-lg">
      <h3 className="font-semibold text-xs">Perusahaan Trending</h3>
    </div>
    <div className="p-2.5 space-y-1.5">
      {companies.map(company => (
        <a href="#" key={company.name} className="flex items-center hover:bg-gray-50 p-1.5 rounded transition">
          <div className="bg-gray-100 rounded w-8 h-8 flex items-center justify-center shrink-0">
            <img src={company.logo} alt={company.name} className="w-6 h-6 object-contain" />
          </div>
          <div className="ml-2 flex-1 min-w-0">
            <h4 className="font-medium text-secondary hover:text-primary text-[11px] transition-colors truncate">{company.name}</h4>
            <div className="flex items-center gap-2 text-[9px] text-gray-500">
              <span>{company.jobsAvailable} lowongan</span>
              {(company as any).view_count > 0 && (
                <span className="flex items-center gap-0.5">
                  <i className="fas fa-eye text-primary text-[8px]"></i>
                  {(company as any).view_count}
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
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
  isPreviewMode?: boolean;
}

const LatestArticlesWidget: React.FC<Pick<SidebarProps, 'onNavigateToBlog' | 'latestArticles'>> = ({ onNavigateToBlog, latestArticles }) => (
  <div className="bg-white rounded-lg shadow mb-4">
    <div className="bg-secondary text-white p-2.5 rounded-t-lg">
      <h3 className="font-semibold text-xs">Artikel Terbaru</h3>
    </div>
    <div className="p-2.5">
      <div className="space-y-1.5">
        {latestArticles.map(article => (
          <a href={`/blog/${article.slug || article.id}`} key={article.id} className="block hover:bg-gray-50 p-1.5 rounded transition">
            <h4 className="font-medium text-secondary hover:text-primary text-[11px] transition-colors line-clamp-2 leading-tight">{article.title}</h4>
            <div className="flex items-center gap-2 text-[9px] text-gray-500 mt-0.5">
              <span>{article.posted}</span>
              {article.view_count && (
                <span className="flex items-center gap-0.5">
                  <i className="fas fa-eye text-primary text-[8px]"></i>
                  {article.view_count}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="mt-2.5 text-center">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onNavigateToBlog();
        }} className="text-secondary text-[10px] font-medium hover:text-primary">
          Lihat semua artikel
        </a>
      </div>
    </div>
  </div>
);

const RecruitmentEvents: React.FC<Pick<SidebarProps, 'onNavigateToEventRecruitment' | 'onSelectEvent' | 'allEvents'>> = ({ onNavigateToEventRecruitment, onSelectEvent, allEvents }) => (
    <div className="bg-white rounded-lg shadow mb-4">
        <div className="bg-accent text-white p-2.5 rounded-t-lg">
            <h3 className="font-semibold text-xs">Event Rekrutmen</h3>
        </div>
        <div className="p-2.5 space-y-2">
            {allEvents.slice(0, 2).map(event => (
                <div key={event.id} className={`${event.isFeatured ? 'border-accent border-dashed' : 'border-gray-200'} border rounded-lg p-2`}>
                    <h4 className="font-semibold text-secondary text-[11px] line-clamp-2 leading-tight">{event.title}</h4>
                    <div className="flex items-center text-[9px] text-gray-500 mt-1">
                        <i className="far fa-calendar-alt mr-1 text-[8px]"></i> 
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-[9px] text-gray-500 mt-0.5">
                        <i className="fas fa-map-marker-alt mr-1 text-[8px]"></i> 
                        <span className="truncate">{event.location}</span>
                    </div>
                    {event.view_count && (
                        <div className="flex items-center text-[9px] text-gray-500 mt-0.5">
                            <i className="fas fa-eye text-primary mr-1 text-[8px]"></i>
                            <span>{event.view_count}</span>
                        </div>
                    )}
                    <div className="mt-1.5">
                        <a href="#" onClick={(e) => { e.preventDefault(); onSelectEvent(event.slug || String(event.id)); }} className="text-secondary text-[10px] font-medium hover:text-primary">
                            Lihat Detail
                        </a>
                    </div>
                </div>
            ))}
             <div className="mt-2.5 text-center">
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    onNavigateToEventRecruitment();
                }} className="text-secondary text-[10px] font-medium hover:text-primary">
                    Lihat semua event
                </a>
            </div>
        </div>
    </div>
);

const DownloadAppBanner: React.FC = () => (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow p-3">
        <div className="text-white">
            <h3 className="font-semibold text-sm">Download Aplikasi KabarKarir.com</h3>
            <p className="text-white text-opacity-90 text-xs mt-1.5 leading-snug">Akses lowongan kerja terbaru kapan saja dan di mana saja</p>
            <div className="mt-2.5">
                <a href="#" className="bg-white text-primary py-1.5 px-3 rounded-full text-xs font-medium inline-flex items-center transition hover:bg-gray-200">
                    <i className="fab fa-google-play mr-1.5"></i> Google Play
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
    <aside className="w-full lg:w-1/4">
      <TrendingCompanies companies={trendingCompanies} />
      <LatestArticlesWidget onNavigateToBlog={onNavigateToBlog} latestArticles={latestArticles} />
      <RecruitmentEvents onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} allEvents={allEvents} />
      <DownloadAppBanner />
    </aside>
  );
};

export default Sidebar;