
import React from 'react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectArticle: (articleSlug: string) => void;
  onNavigateToBlog: () => void;
}

const ArticleCard: React.FC<{ post: BlogPost, onSelectArticle: (slug: string) => void }> = ({ post, onSelectArticle }) => {
  const badgeColorClasses = {
    blue: 'bg-blue-100 text-primary',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div onClick={() => onSelectArticle(post.slug || String(post.id))} className="h-48 overflow-hidden cursor-pointer">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className={`self-start text-xs font-medium px-2 py-1 rounded-full ${badgeColorClasses[post.categoryColor]}`}>{post.category}</span>
        <h3 onClick={() => onSelectArticle(post.slug || String(post.id))} className="font-semibold text-secondary mt-3 h-12 text-ellipsis overflow-hidden cursor-pointer hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-sm text-gray-600 mt-2 mb-4 flex-grow text-truncate-2">{post.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-gray-500">{post.posted}</span>
          <button onClick={() => onSelectArticle(post.slug || String(post.id))} className="text-secondary text-sm font-medium hover:text-primary">
            Baca Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectArticle, onNavigateToBlog }) => {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">Artikel & Berita</h2>
            <p className="text-gray-600 mt-1">Tips karir dan informasi ketenagakerjaan terbaru</p>
          </div>
          <button onClick={onNavigateToBlog} className="bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition mt-3 md:mt-0 text-center md:text-left text-sm">
            Lihat Semua
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0,3).map(post => <ArticleCard key={post.id} post={post} onSelectArticle={onSelectArticle} />)}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
