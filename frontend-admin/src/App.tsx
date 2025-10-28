import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import AppRoutes from './AppRoutes';
import { INITIAL_JOBS, INITIAL_BLOG_POSTS, INITIAL_MISI_CUAN_OFFERS, INITIAL_COMPANY_PROFILES, INITIAL_RECRUITMENT_EVENTS, INITIAL_PELATIHAN_INFO, INITIAL_MAJORS, INITIAL_MISI_SUBMISSIONS, INITIAL_TAGS } from './constants';
import { Job, BlogPost, MisiCuanOffer, CompanyProfile, RecruitmentEvent, PelatihanInfo, Major, MisiSubmission, Tag, Activity } from './types';

const App: React.FC = () => {
  const location = useLocation();
  
  // --- STATE MANAGEMENT ---
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [misiOffers, setMisiOffers] = useState<MisiCuanOffer[]>(INITIAL_MISI_CUAN_OFFERS);
  const [misiSubmissions, setMisiSubmissions] = useState<MisiSubmission[]>(INITIAL_MISI_SUBMISSIONS);
  const [companies, setCompanies] = useState<CompanyProfile[]>(INITIAL_COMPANY_PROFILES);
  const [events, setEvents] = useState<RecruitmentEvent[]>(INITIAL_RECRUITMENT_EVENTS);
  const [courses, setCourses] = useState<PelatihanInfo[]>(INITIAL_PELATIHAN_INFO);
  const [majors, setMajors] = useState<Major[]>(INITIAL_MAJORS);
  const [tags, setTags] = useState<Tag[]>(INITIAL_TAGS);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    setRecentActivities(prev => {
      const newActivity: Activity = {
        ...activity,
        id: Date.now(),
        timestamp: new Date(),
      };
      return [newActivity, ...prev].slice(0, 10);
    });
  };

  return (
    <div className="bg-gray-50 font-poppins min-h-screen">
      <AppRoutes 
        jobs={jobs}
        setJobs={setJobs}
        blogPosts={blogPosts}
        setBlogPosts={setBlogPosts}
        misiOffers={misiOffers}
        setMisiOffers={setMisiOffers}
        misiSubmissions={misiSubmissions}
        setMisiSubmissions={setMisiSubmissions}
        companies={companies}
        setCompanies={setCompanies}
        events={events}
        setEvents={setEvents}
        courses={courses}
        setCourses={setCourses}
        majors={majors}
        setMajors={setMajors}
        tags={tags}
        setTags={setTags}
        recentActivities={recentActivities}
        addActivity={addActivity}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
