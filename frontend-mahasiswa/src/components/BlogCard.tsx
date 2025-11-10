import React from 'react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onSelect: (slug: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onSelect(post.slug)}
      className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
            {post.category}
          </span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.posted_date)}</span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{post.description}</p>

        <div className="flex items-center text-xs text-gray-500">
          <i className="fas fa-user mr-1"></i>
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <i className="far fa-eye mr-1"></i>
          <span>{post.views_count} views</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-2.5 flex items-center justify-end">
        <button
          onClick={() => onSelect(post.slug)}
          className="text-blue-600 text-xs font-medium hover:text-blue-700 flex items-center"
        >
          Baca Selengkapnya
          <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
