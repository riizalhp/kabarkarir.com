import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { toast } from '../utils/toast';
import { isJobFavorite, addFavoriteJob, removeFavoriteJob } from '../utils/favorites';

interface JobCardProps {
  job: Job;
  onSelectJob: (jobSlug: string) => void;
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
    onSelectJob(job.slug);
  };

  return (
    <div onClick={handleCardClick} className="cursor-pointer bg-white rounded-lg shadow overflow-hidden transition duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="p-3 flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-2">
            <div className="bg-gray-100 rounded w-8 h-8 flex items-center justify-center shrink-0">
              <img src={job.logo} alt={job.company} className="w-6 h-6 object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xs text-secondary transition-colors hover:text-primary truncate leading-tight">{job.title}</h3>
              <a href="#" onClick={handleCompanyClick} className="text-gray-500 text-[10px] hover:text-primary hover:underline truncate block mt-0.5">{job.company}</a>
            </div>
          </div>
          <button onClick={toggleFavorite} className={`text-gray-400 hover:text-accent focus:outline-none text-sm transition-colors duration-200 shrink-0 ${isFavorite ? 'text-accent' : ''}`}>
            <i className={`${isFavorite ? 'fas' : 'far'} fa-bookmark`}></i>
          </button>
        </div>
        <div className="flex items-center flex-wrap text-[9px] text-gray-500 mt-1.5 gap-x-1.5 gap-y-0.5">
          <span className="flex items-center"><i className="fas fa-map-marker-alt mr-0.5 text-[8px]"></i> {job.location}</span>
          <span className="flex items-center"><i className="fas fa-briefcase mr-0.5 text-[8px]"></i> {job.type}</span>
          {job.salaryRange && <span className="flex items-center"><i className="fas fa-money-bill-wave mr-0.5 text-[8px]"></i> {job.salaryRange}</span>}
          <button onClick={handleCategoryClick} className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${badgeColorClasses[job.categoryColor]} hover:opacity-80 transition`}>{job.category}</button>
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${job.education === 'Strata 1' ? badgeColorClasses.green : badgeColorClasses.blue}`}>{job.education}</span>
        </div>
        <p className="text-[10px] text-gray-600 mt-1.5 line-clamp-2 leading-snug">{job.description}</p>
        <div className="mt-2 flex items-center justify-between text-[9px] text-gray-500">
          <span>Diposting {job.posted}</span>
          {job.dueDate && <span className="text-red-600"><i className="far fa-clock mr-0.5 text-[8px]"></i>Berakhir {job.dueDate}</span>}
        </div>
      </div>
      <div className="bg-gray-50 p-2 flex items-center justify-end">
        <button onClick={handleCardClick} className="text-secondary text-[10px] font-medium hover:text-primary">
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default JobCard;