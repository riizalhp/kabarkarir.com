import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost, Company, RecruitmentEvent } from '../types';
import Sidebar from './Sidebar';
import LoadMore from './LoadMore';
import AdCard from './AdCard';

interface BlogPageProps {
  posts: BlogPost[];
  onSelectArticle: (articleSlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const INITIAL_ITEMS = 6;
const ITEMS_TO_LOAD = 6;

const ArticleCard: React.FC<{ post: BlogPost; onSelectArticle: (slug: string) => void }> = ({ post, onSelectArticle }) => {
  const badgeColorClasses = {
    blue: 'bg-blue-100 text-primary',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div onClick={() => onSelectArticle(post.slug || String(post.id))} className="h-32 overflow-hidden cursor-pointer">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <span className={`self-start text-[9px] font-medium px-1.5 py-0.5 rounded-full ${badgeColorClasses[post.categoryColor]}`}>{post.category}</span>
        <h3 onClick={() => onSelectArticle(post.slug || String(post.id))} className="font-semibold text-secondary mt-2 text-xs line-clamp-2 leading-tight cursor-pointer hover:text-primary">{post.title}</h3>
        <p className="text-[10px] text-gray-600 mt-1.5 mb-2 flex-grow line-clamp-2 leading-snug">{post.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-[9px] text-gray-500">{post.posted}</span>
          <button onClick={() => onSelectArticle(post.slug || String(post.id))} className="text-secondary text-[10px] font-medium hover:text-primary">
            Baca Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectArticle, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(false);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(posts.map(p => p.category));
    return ['Semua', ...Array.from(categories)];
  }, [posts]);

  useEffect(() => {
    setVisibleItems(INITIAL_ITEMS);
  }, [searchTerm, selectedCategory]);
  
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const categoryMatch = selectedCategory === 'Semua' || post.category === selectedCategory;
      const searchMatch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [posts, searchTerm, selectedCategory]);

  const currentPosts = filteredPosts.slice(0, visibleItems);
  const hasMore = visibleItems < filteredPosts.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_TO_LOAD);
      setIsLoading(false);
    }, 300);
  };

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search-artikel" className="sr-only">Cari Artikel</label>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="search-artikel"
                  placeholder="Cari berdasarkan judul atau deskripsi..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category-select" className="sr-only">Filter Kategori</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4">
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {currentPosts.map((post, index) => (
                      <React.Fragment key={post.id}>
                        <ArticleCard post={post} onSelectArticle={onSelectArticle} />
                        {/* Insert ad after every 4 articles */}
                        {(index + 1) % 4 === 0 && index !== currentPosts.length - 1 && (
                          <AdCard className="md:col-span-2" type="banner" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <LoadMore
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={handleLoadMore}
                    itemsShown={currentPosts.length}
                    totalItems={filteredPosts.length}
                  />
                </>
              ) : (
                 <div className="text-center py-16 bg-white rounded-lg shadow">
                    <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-secondary">Artikel Tidak Ditemukan</h3>
                    <p className="text-gray-500 mt-2">
                        Saat ini belum ada artikel yang sesuai dengan kriteria pencarian Anda.
                    </p>
                </div>
              )}
            </div>
            <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
