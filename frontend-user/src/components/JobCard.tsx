import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { toast } from '../utils/toast';
import { isJobFavorite, addFavoriteJob, removeFavoriteJob } from '../utils/favorites';

interface JobCardProps {
  job: Job;
  onSelectJob: (jobId: number) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
  onFavoriteToggle?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelectJob, onSelectCategory, onSelectCompany, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(isJobFavorite(job.id));

  useEffect(() => {
    setIsFavorite(isJobFavorite(job.id));
  }, [job.id]);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const currentIsFavorite = isJobFavorite(job.id);
    if (currentIsFavorite) {
      removeFavoriteJob(job.id);
      setIsFavorite(false);
      toast(`${job.title} telah dihapus dari favorit`);
    } else {
      addFavoriteJob(job.id);
      setIsFavorite(true);
      toast(`${job.title} telah ditambahkan ke favorit`);
    }
    if (onFavoriteToggle) {
        onFavoriteToggle();
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCategory(job.category);
  };
  
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCompany(job.companySlug);
  };


  const badgeColorClasses = {
    blue: 'bg-blue-100 text-primary',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  const educationBadgeColor = job.education === 'Strata 1' ? 'badge-green' : 'badge-blue';

  const handleCardClick = () => {
    onSelectJob(job.id);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 rounded w-12 h-12 flex items-center justify-center shrink-0">
              <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary transition-colors hover:text-primary">{job.title}</h3>
              <a href="#" onClick={handleCompanyClick} className="text-gray-500 text-sm hover:text-primary hover:underline">{job.company}</a>
            </div>
          </div>
          <button onClick={toggleFavorite} className={`text-gray-400 hover:text-accent focus:outline-none text-xl transition-colors duration-200 ${isFavorite ? 'text-accent' : ''}`}>
            <i className={`${isFavorite ? 'fas' : 'far'} fa-bookmark`}></i>
          </button>
        </div>
        <div className="flex items-center flex-wrap text-xs text-gray-500 mt-3 gap-x-3 gap-y-1">
          <span className="flex items-center"><i className="fas fa-map-marker-alt mr-1"></i> {job.location}</span>
          <span className="flex items-center"><i className="fas fa-briefcase mr-1"></i> {job.type}</span>
          <button onClick={handleCategoryClick} className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColorClasses[job.categoryColor]} hover:opacity-80 transition`}>{job.category}</button>
        </div>
        <p className="text-sm text-gray-600 mt-3 text-truncate-2">{job.description}</p>
        <div className="mt-4">
          <span className="text-xs text-gray-500">Diposting {job.posted}</span>
        </div>
      </div>
      <div className="bg-gray-50 p-3 flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${job.education === 'Strata 1' ? badgeColorClasses.green : badgeColorClasses.blue}`}>{job.education}</span>
        <button onClick={handleCardClick} className="text-secondary text-sm font-medium hover:text-primary">
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default JobCard;