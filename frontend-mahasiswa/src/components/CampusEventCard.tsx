import React from 'react';
import { CampusEvent } from '../types';

interface CampusEventCardProps {
  event: CampusEvent;
  onSelect: (slug: string) => void;
}

const CampusEventCard: React.FC<CampusEventCardProps> = ({ event, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onSelect(event.slug)}
      className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      {event.poster_image && (
        <div className="h-40 bg-gray-200 overflow-hidden">
          <img
            src={event.poster_image}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start space-x-3 flex-1">
            {event.university_logo && !event.poster_image && (
              <div className="bg-gray-100 rounded w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={event.university_logo}
                  alt={event.university_name}
                  className="w-10 h-10 object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{event.university_name}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap text-xs text-gray-500 gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
            {event.event_type}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${event.is_free ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {event.is_free ? 'Gratis' : event.ticket_price || 'Berbayar'}
          </span>
          <span className="flex items-center">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {event.is_online ? 'Online' : event.location || 'Lihat detail'}
          </span>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{event.description}</p>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center text-xs text-gray-700 mb-1">
            <i className="far fa-calendar mr-2 text-pink-600"></i>
            <span className="font-semibold">{formatDate(event.date)}</span>
            {event.end_date && (
              <span> - {formatDate(event.end_date)}</span>
            )}
          </div>
          {event.registration_required && (
            <div className="flex items-center text-xs text-blue-600">
              <i className="fas fa-user-check mr-2"></i>
              <span>Perlu Registrasi</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          <i className="far fa-eye mr-1"></i>
          {event.views_count} views
        </span>
        <button
          onClick={() => onSelect(event.slug)}
          className="text-gray-900 text-xs font-medium hover:text-blue-600"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default CampusEventCard;
