import React from 'react';
import { BlogPost } from '../types';

interface ArticleCardProps {
  article: BlogPost;
  onSelectArticle: (slug: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (article.slug) {
      onSelectArticle(article.slug);
    }
  };

  return (
    <a
      href={`/blog/${article.slug || article.id}`}
      onClick={handleClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden block group"
    >
      {/* Image */}
      {article.image && (
        <div className="relative h-36 overflow-hidden bg-gray-200">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-3">
        {/* Category Badge */}
        <div className="mb-2">
          <span className={`inline-block px-2 py-0.5 ${
            article.categoryColor === 'blue' ? 'bg-blue-100 text-blue-700' :
            article.categoryColor === 'green' ? 'bg-green-100 text-green-700' :
            'bg-orange-100 text-orange-700'
          } text-xs font-medium rounded`}>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-secondary line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {article.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <i className="far fa-calendar-alt mr-1"></i>
              {new Date(article.posted).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
            {article.view_count !== undefined && (
              <span className="flex items-center">
                <i className="far fa-eye mr-1"></i>
                {article.view_count.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
