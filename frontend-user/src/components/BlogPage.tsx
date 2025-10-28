import React, { useState, useMemo, useEffect } from 'react';
import { BlogPost, Company, RecruitmentEvent } from '../types';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

interface BlogPageProps {
  posts: BlogPost[];
  onSelectArticle: (articleId: number) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const ITEMS_PER_PAGE = 6;

const ArticleCard: React.FC<{ post: BlogPost; onSelectArticle: (id: number) => void }> = ({ post, onSelectArticle }) => {
  const badgeColorClasses = {
    blue: 'bg-blue-100 text-primary',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div onClick={() => onSelectArticle(post.id)} className="h-48 overflow-hidden cursor-pointer">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className={`self-start text-xs font-medium px-2 py-1 rounded-full ${badgeColorClasses[post.categoryColor]}`}>{post.category}</span>
        <h3 onClick={() => onSelectArticle(post.id)} className="font-semibold text-secondary mt-3 h-12 text-ellipsis overflow-hidden cursor-pointer hover:text-primary">{post.title}</h3>
        <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow text-truncate-2">{post.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-gray-500">{post.posted}</span>
          <button onClick={() => onSelectArticle(post.id)} className="text-secondary text-sm font-medium hover:text-primary">
            Baca Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectArticle, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const uniqueCategories = useMemo(() => {
    const categories = new Set(posts.map(p => p.category));
    return ['Semua', ...Array.from(categories)];
  }, [posts]);

  useEffect(() => {
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Artikel & Berita Terbaru</h1>
          <p className="text-gray-600 mt-2">Dapatkan wawasan terbaru seputar dunia karir, tips, dan berita ketenagakerjaan.</p>
        </div>

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
            <div className="w-full lg:w-2/3">
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPosts.map(post => (
                      <ArticleCard key={post.id} post={post} onSelectArticle={onSelectArticle} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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