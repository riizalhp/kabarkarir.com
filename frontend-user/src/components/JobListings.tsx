import React, { useState } from 'react';
import { Job } from '../types';
import JobCard from './JobCard';
import LoadMore from './LoadMore';

interface JobListingsProps {
  jobs: Job[];
  onSelectJob: (jobSlug: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
}

const INITIAL_ITEMS = 10;
const ITEMS_TO_LOAD = 10;

const JobListings: React.FC<JobListingsProps> = ({ jobs, onSelectJob, onSelectCategory, onSelectCompany }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [isLoading, setIsLoading] = useState(false);

  const currentJobs = jobs.slice(0, visibleItems);
  const hasMore = visibleItems < jobs.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_TO_LOAD);
      setIsLoading(false);
    }, 300);
  };


  return (
    <div className="w-full lg:w-2/3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">Lowongan Terbaru</h2>
          <p className="text-gray-600 mt-1">Update lowongan kerja terbaru dari berbagai perusahaan</p>
        </div>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onSelectCategory('Lowongan Terbaru');
        }} className="bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition mt-3 md:mt-0 text-center md:text-left text-sm">
          Lihat Semua
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentJobs.map(job => (
          <JobCard key={job.id} job={job} onSelectJob={onSelectJob} onSelectCategory={onSelectCategory} onSelectCompany={onSelectCompany} />
        ))}
      </div>
      
      <LoadMore
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        itemsShown={currentJobs.length}
        totalItems={jobs.length}
      />

    </div>
  );
};

export default JobListings;