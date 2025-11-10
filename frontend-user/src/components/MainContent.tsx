
import React from 'react';
import JobListings from './JobListings';
import Sidebar from './Sidebar';
import { Job, Company, RecruitmentEvent, BlogPost } from '../types';


interface MainContentProps {
  jobs: Job[];
  globalSearchQuery?: string;
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

const MainContent: React.FC<MainContentProps> = ({ jobs, globalSearchQuery = '', onSelectJob, onSelectCategory, onSelectCompany, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
  return (
    <section className="pt-4 pb-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <JobListings jobs={jobs} globalSearchQuery={globalSearchQuery} onSelectJob={onSelectJob} onSelectCategory={onSelectCategory} onSelectCompany={onSelectCompany} />
          <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents}/>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
