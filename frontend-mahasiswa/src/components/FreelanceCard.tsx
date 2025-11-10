import React from 'react';
import { FreelanceJob } from '../types';

interface FreelanceCardProps {
  job: FreelanceJob;
  onSelect: (slug: string) => void;
}

const FreelanceCard: React.FC<FreelanceCardProps> = ({ job, onSelect }) => {
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

  const formatBudget = () => {
    if (job.budget_min && job.budget_max) {
      return `${job.budget_currency} ${job.budget_min.toLocaleString()} - ${job.budget_max.toLocaleString()}`;
    } else if (job.budget_min) {
      return `${job.budget_currency} ${job.budget_min.toLocaleString()}+`;
    }
    return 'Negosiasi';
  };

  return (
    <div
      onClick={() => onSelect(job.slug)}
      className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {job.title}
            </h3>
            {job.client_name && (
              <p className="text-sm text-gray-600 mt-1">{job.client_name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center flex-wrap text-xs text-gray-500 gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            {job.category}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
            {job.experience_level}
          </span>
          <span className="flex items-center">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {job.is_remote ? 'Remote' : job.location || 'Remote'}
          </span>
          {job.duration && (
            <span className="flex items-center">
              <i className="fas fa-clock mr-1"></i>
              {job.duration}
            </span>
          )}
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-2 mb-2">
          <p className="text-sm font-semibold text-green-700">
            <i className="fas fa-money-bill-wave mr-1"></i>
            {formatBudget()}
            {job.budget_type && ` / ${job.budget_type}`}
          </p>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{job.description}</p>

        {job.skills_required && job.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {job.skills_required.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
            {job.skills_required.length > 4 && (
              <span className="text-xs text-gray-500">+{job.skills_required.length - 4} lagi</span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>Diposting {formatDate(job.posted_date)}</span>
          {job.deadline && (
            <span className="text-red-600">
              <i className="far fa-clock mr-1"></i>
              Deadline: {new Date(job.deadline).toLocaleDateString('id-ID')}
            </span>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          <i className="far fa-eye mr-1"></i>
          {job.views_count} views
        </span>
        <button
          onClick={() => onSelect(job.slug)}
          className="text-gray-900 text-xs font-medium hover:text-blue-600"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default FreelanceCard;
