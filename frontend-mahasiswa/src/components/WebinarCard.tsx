import React from 'react';
import { Webinar } from '../types';

interface WebinarCardProps {
  webinar: Webinar;
  onSelect: (slug: string) => void;
}

const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div
      onClick={() => onSelect(webinar.slug)}
      className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start space-x-3 flex-1">
            {webinar.host_logo && (
              <div className="bg-gray-100 rounded w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={webinar.host_logo}
                  alt={webinar.host_name}
                  className="w-10 h-10 object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {webinar.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{webinar.host_name}</p>
            </div>
          </div>
        </div>

        {webinar.speaker_name && (
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <i className="fas fa-user-tie mr-2"></i>
            <span>{webinar.speaker_name} {webinar.speaker_title && `- ${webinar.speaker_title}`}</span>
          </div>
        )}

        <div className="flex items-center flex-wrap text-xs text-gray-500 gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${webinar.is_free ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {webinar.is_free ? 'Gratis' : webinar.price || 'Berbayar'}
          </span>
          {webinar.platform && (
            <span className="flex items-center">
              <i className="fas fa-laptop mr-1"></i>
              {webinar.platform}
            </span>
          )}
          {webinar.certificate_available && (
            <span className="flex items-center text-blue-600">
              <i className="fas fa-certificate mr-1"></i>
              Sertifikat
            </span>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{webinar.description}</p>

        {webinar.topics && webinar.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {webinar.topics.slice(0, 3).map((topic, index) => (
              <span
                key={index}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center text-xs text-gray-700">
            <i className="far fa-calendar mr-2 text-blue-600"></i>
            <span className="font-semibold">{formatDate(webinar.date)}</span>
          </div>
          {webinar.duration && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <i className="far fa-clock mr-2"></i>
              <span>{webinar.duration}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          <i className="far fa-eye mr-1"></i>
          {webinar.views_count} views
        </span>
        <button
          onClick={() => onSelect(webinar.slug)}
          className="text-gray-900 text-xs font-medium hover:text-blue-600"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default WebinarCard;
