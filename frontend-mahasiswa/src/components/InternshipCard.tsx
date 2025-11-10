import React from 'react';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
  onSelect: (slug: string) => void;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
    return `${Math.floor(diffDays / 30)} bulan yang lalu`;
  };

  return (
    <div
      onClick={() => onSelect(internship.slug)}
      className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {internship.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{internship.company_name}</p>
          </div>
        </div>

        <div className="flex items-center flex-wrap text-xs text-gray-500 gap-2 mb-2">
          <span className="flex items-center">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {internship.is_remote ? 'Remote' : internship.location}
          </span>
          {internship.duration && (
            <span className="flex items-center">
              <i className="fas fa-clock mr-1"></i>
              {internship.duration}
            </span>
          )}
          {internship.stipend && (
            <span className="flex items-center">
              <i className="fas fa-money-bill-wave mr-1"></i>
              {internship.stipend}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{internship.description}</p>

        {internship.tags && internship.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {internship.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>Diposting {formatDate(internship.posted_date)}</span>
          {internship.application_deadline && (
            <span className="text-red-600">
              <i className="far fa-clock mr-1"></i>
              Deadline: {new Date(internship.application_deadline).toLocaleDateString('id-ID')}
            </span>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          <i className="far fa-eye mr-1"></i>
          {internship.views_count} views
        </span>
        <button
          onClick={() => onSelect(internship.slug)}
          className="text-gray-900 text-xs font-medium hover:text-blue-600"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
