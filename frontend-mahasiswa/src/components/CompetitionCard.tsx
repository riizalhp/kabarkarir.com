import React from 'react';
import { Competition } from '../types';

interface CompetitionCardProps {
  competition: Competition;
  onSelect: (slug: string) => void;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, onSelect }) => {
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
      onClick={() => onSelect(competition.slug)}
      className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start space-x-3 flex-1">
            {competition.organizer_logo && (
              <div className="bg-gray-100 rounded w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={competition.organizer_logo}
                  alt={competition.organizer_name}
                  className="w-10 h-10 object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {competition.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{competition.organizer_name}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap text-xs text-gray-500 gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
            {competition.category}
          </span>
          {competition.prize_pool && (
            <span className="flex items-center text-orange-600 font-semibold">
              <i className="fas fa-trophy mr-1"></i>
              {competition.prize_pool}
            </span>
          )}
          {competition.location && (
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt mr-1"></i>
              {competition.is_online ? 'Online' : competition.location}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{competition.description}</p>

        {competition.tags && competition.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {competition.tags.slice(0, 3).map((tag, index) => (
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
          <span>Diposting {formatDate(competition.posted_date)}</span>
          {competition.registration_deadline && (
            <span className="text-red-600">
              <i className="far fa-clock mr-1"></i>
              Deadline: {new Date(competition.registration_deadline).toLocaleDateString('id-ID')}
            </span>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          <i className="far fa-eye mr-1"></i>
          {competition.views_count} views
        </span>
        <button
          onClick={() => onSelect(competition.slug)}
          className="text-gray-900 text-xs font-medium hover:text-blue-600"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default CompetitionCard;
