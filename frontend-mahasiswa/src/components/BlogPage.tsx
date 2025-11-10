import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import BlogCard from './BlogCard';
import LoadMore from './LoadMore';
import Sidebar from './Sidebar';
import { blogService } from '../services/api';
import { useSidebarData } from '../hooks/useSidebarData';

const ITEMS_TO_LOAD = 12;

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  const fetchPosts = async (page: number, search: string, cat: string, append: boolean = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const offset = (page - 1) * ITEMS_TO_LOAD;
      
      const options: any = {
        limit: ITEMS_TO_LOAD,
        offset: offset,
      };

      if (search.trim()) {
        options.search = search.trim();
      }

      if (cat) {
        options.category = cat;
      }

      const result = await blogService.getAll(options);
      
      if (append) {
        setPosts(prev => [...prev, ...result.data]);
      } else {
        setPosts(result.data);
      }
      
      setTotalPosts(result.total);
      setHasMore(offset + result.data.length < result.total);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      if (!append) {
        setPosts([]);
        setTotalPosts(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPostDetail(slug);
    } else {
      setSelectedPost(null);
      setPosts([]);
      setCurrentPage(1);
      fetchPosts(1, activeKeyword, activeCategory, false);
    }
  }, [slug, activeKeyword, activeCategory]);

  const fetchPostDetail = async (postSlug: string) => {
    try {
      setLoading(true);
      const data = await blogService.getBySlug(postSlug);
      setSelectedPost(data);
      // await blogService.incrementViews(data.id); // If incrementViews exists
    } catch (error) {
      console.error('Error fetching post detail:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setActiveKeyword(keyword);
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setKeyword('');
    setActiveKeyword('');
    setCategory('');
    setActiveCategory('');
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchPosts(nextPage, activeKeyword, activeCategory, true);
  };

  const handleSelectPost = (postSlug: string) => {
    navigate(`/blog/${postSlug}`);
  };

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading && !isLoadingMore) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={handleBack}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Blog
          </button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {selectedPost.image && (
              <div className="h-96 bg-gray-200">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedPost.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(selectedPost.posted_date).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-purple-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedPost.author}</p>
                  <p className="text-sm text-gray-600">{selectedPost.category}</p>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <div className="text-xl text-gray-700 font-medium mb-6 leading-relaxed border-l-4 border-purple-600 pl-4">
                  {selectedPost.description}
                </div>
                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mb-6 pt-6 border-t">
                  <h3 className="font-bold text-lg mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-6 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <i className="far fa-eye mr-2"></i>
                    {selectedPost.views_count} views
                  </span>
                  <span className="text-sm text-gray-500">
                    <i className="far fa-clock mr-2"></i>
                    5 menit baca
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  const isSearching = activeKeyword || activeCategory;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="keyword-search" className="block text-sm font-medium text-gray-700">
                Cari Artikel
              </label>
              <div className="relative mt-1">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="keyword-search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Judul, konten..."
                  className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                id="category-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
              >
                <option value="">Semua Kategori</option>
                <option value="Karir">Karir</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Tips">Tips</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Bisnis">Bisnis</option>
                <option value="Inspirasi">Inspirasi</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center"
              >
                <i className="fas fa-search mr-2"></i>Cari
              </button>
              <button
                onClick={handleReset}
                title="Reset Filter"
                className="bg-gray-200 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-300 transition"
              >
                <i className="fas fa-undo fa-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSearching ? 'Hasil Pencarian' : 'Blog & Artikel'}
          </h2>
          <p className="text-gray-600 mt-1">{totalPosts} artikel ditemukan</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900">Artikel Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2">
              Saat ini belum ada artikel yang tersedia untuk kriteria pencarian Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onSelect={handleSelectPost}
                />
              ))}
            </div>

            <LoadMore
              hasMore={hasMore}
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              itemsShown={posts.length}
              totalItems={totalPosts}
            />
          </>
        )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <Sidebar
              trendingScholarships={trendingScholarships}
              campusEvents={campusEvents}
              latestArticles={latestArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
