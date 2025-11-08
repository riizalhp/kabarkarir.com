import React, { useState, useEffect } from 'react';
import { Job, Company, RecruitmentEvent, BlogPost } from '../types';
import { getFavoriteJobs } from '../utils/favorites';
import JobCard from './JobCard';
import Sidebar from './Sidebar';

interface FavoritesPageProps {
  allJobs: Job[];
  onSelectJob: (jobSlug: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectCompany: (companySlug: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ allJobs, onSelectJob, onSelectCategory, onSelectCompany, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);

  const loadFavorites = () => {
    const favoriteIds = getFavoriteJobs();
    const jobs = allJobs.filter(job => favoriteIds.includes(job.id));
    setFavoriteJobs(jobs);
  };

  useEffect(() => {
    loadFavorites();
  }, [allJobs]);

  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
                {favoriteJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {favoriteJobs.map(job => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                onSelectJob={onSelectJob} 
                                onSelectCategory={onSelectCategory}
                                onSelectCompany={onSelectCompany}
                                onFavoriteToggle={loadFavorites}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow">
                        <i className="far fa-bookmark fa-3x text-gray-400 mb-4"></i>
                        <h3 className="text-xl font-semibold text-secondary">Belum Ada Favorit</h3>
                        <p className="text-gray-500 mt-2">
                            Simpan lowongan yang Anda sukai dengan menekan ikon bookmark.
                        </p>
                    </div>
                )}
            </div>
            <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} />
        </div>
      </div>
    </section>
  );
};

export default FavoritesPage;
