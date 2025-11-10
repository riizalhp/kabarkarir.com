import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scholarship, CampusEvent, BlogPost } from '../types';

interface TrendingScholarshipsProps {
  scholarships: Scholarship[];
}

const TrendingScholarships: React.FC<TrendingScholarshipsProps> = ({ scholarships }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="font-semibold">Beasiswa Trending</h3>
      </div>
      <div className="p-4 space-y-2">
        {scholarships.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">Belum ada beasiswa tersedia</p>
        ) : (
          scholarships.slice(0, 5).map(scholarship => (
            <a 
              href="#" 
              key={scholarship.id} 
              onClick={(e) => {
                e.preventDefault();
                navigate(`/beasiswa/${scholarship.slug}`);
              }}
              className="flex items-center hover:bg-gray-50 p-2 rounded transition"
            >
              <div className="bg-blue-100 rounded w-10 h-10 flex items-center justify-center shrink-0">
                {scholarship.provider_logo ? (
                  <img src={scholarship.provider_logo} alt={scholarship.provider_name} className="w-8 h-8 object-contain" />
                ) : (
                  <i className="fas fa-graduation-cap text-blue-600"></i>
                )}
              </div>
              <div className="ml-3 flex-1">
                <h4 className="font-medium text-gray-900 hover:text-blue-600 text-sm transition-colors line-clamp-2">
                  {scholarship.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{scholarship.provider_name}</span>
                  {scholarship.views_count > 0 && (
                    <span className="flex items-center gap-1">
                      <i className="fas fa-eye text-blue-600"></i>
                      {scholarship.views_count}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))
        )}
      </div>
      <div className="px-4 pb-4 text-center">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/beasiswa');
          }} 
          className="text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          Lihat semua beasiswa
        </a>
      </div>
    </div>
  );
};

interface CampusEventsProps {
  events: CampusEvent[];
}

const CampusEvents: React.FC<CampusEventsProps> = ({ events }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="bg-pink-600 text-white p-4 rounded-t-lg">
        <h3 className="font-semibold">Event Kampus</h3>
      </div>
      <div className="p-4 space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">Belum ada event tersedia</p>
        ) : (
          <>
            {events.slice(0, 2).map(event => (
              <div 
                key={event.id} 
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{event.title}</h4>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <i className="far fa-calendar-alt mr-2"></i>
                  <span>{new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{event.is_online ? 'Online' : event.location}</span>
                </div>
                {event.views_count > 0 && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <i className="fas fa-eye text-pink-600 mr-2"></i>
                    <span>{event.views_count} views</span>
                  </div>
                )}
                <div className="mt-3">
                  <a 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      navigate(`/event-kampus/${event.slug}`); 
                    }} 
                    className="text-pink-600 text-xs font-medium hover:text-pink-800"
                  >
                    Lihat Detail
                  </a>
                </div>
              </div>
            ))}
            <div className="text-center">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/event-kampus');
                }} 
                className="text-pink-600 text-sm font-medium hover:text-pink-800"
              >
                Lihat semua event
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface LatestArticlesProps {
  articles: BlogPost[];
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="bg-purple-600 text-white p-4 rounded-t-lg">
        <h3 className="font-semibold">Artikel Terbaru</h3>
      </div>
      <div className="p-4">
        {articles.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">Belum ada artikel tersedia</p>
        ) : (
          <>
            <div className="space-y-2">
              {articles.slice(0, 5).map(article => (
                <a 
                  href="#" 
                  key={article.id} 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog/${article.slug}`);
                  }}
                  className="block hover:bg-gray-50 p-2 rounded transition"
                >
                  <h4 className="font-medium text-gray-900 hover:text-purple-600 text-sm transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{new Date(article.posted_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    {article.views_count > 0 && (
                      <span className="flex items-center gap-1">
                        <i className="fas fa-eye text-purple-600"></i>
                        {article.views_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-4 text-center">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/blog');
                }} 
                className="text-purple-600 text-sm font-medium hover:text-purple-800"
              >
                Lihat semua artikel
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DownloadAppBanner: React.FC = () => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow p-5">
    <div className="text-white">
      <h3 className="font-semibold text-lg">Download Aplikasi KabarKarir.com</h3>
      <p className="text-white text-opacity-90 text-sm mt-2">
        Akses lowongan kerja terbaru kapan saja dan di mana saja
      </p>
      <div className="mt-4">
        <a 
          href="#" 
          className="bg-white text-blue-600 py-2 px-4 rounded-full text-sm font-medium inline-flex items-center transition hover:bg-gray-100"
        >
          <i className="fab fa-google-play mr-2"></i> Google Play
        </a>
      </div>
    </div>
  </div>
);

interface SidebarProps {
  trendingScholarships?: Scholarship[];
  campusEvents?: CampusEvent[];
  latestArticles?: BlogPost[];
  showScholarships?: boolean;
  showEvents?: boolean;
  showArticles?: boolean;
  showDownloadApp?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  trendingScholarships = [],
  campusEvents = [],
  latestArticles = [],
  showScholarships = true,
  showEvents = true,
  showArticles = true,
  showDownloadApp = true,
}) => {
  console.log('Sidebar Data:', { 
    scholarships: trendingScholarships.length, 
    events: campusEvents.length, 
    articles: latestArticles.length 
  });
  
  return (
    <aside className="w-full">
      {showScholarships && (
        <TrendingScholarships scholarships={trendingScholarships} />
      )}
      {showArticles && (
        <LatestArticles articles={latestArticles} />
      )}
      {showEvents && (
        <CampusEvents events={campusEvents} />
      )}
      {showDownloadApp && <DownloadAppBanner />}
    </aside>
  );
};

export default Sidebar;
