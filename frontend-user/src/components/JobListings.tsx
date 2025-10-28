import React, { useState } from 'react';
import { Job } from '../types';
import JobCard from './JobCard';
import Pagination from './Pagination';

interface JobListingsProps {
  jobs: Job[];
  onSelectJob: (jobId: number) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
}

const ITEMS_PER_PAGE = 10;

const JobListings: React.FC<JobListingsProps> = ({ jobs, onSelectJob, onSelectCategory, onSelectCompany }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // This component is part of a larger page, so we don't scroll the whole window to top
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
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default JobListings;