import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import { Job, BlogPost, MisiCuanOffer, CompanyProfile, RecruitmentEvent, PelatihanInfo, Major, MisiSubmission, Tag, Activity } from './types';

interface AppRoutesProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  misiOffers: MisiCuanOffer[];
  setMisiOffers: React.Dispatch<React.SetStateAction<MisiCuanOffer[]>>;
  misiSubmissions: MisiSubmission[];
  setMisiSubmissions: React.Dispatch<React.SetStateAction<MisiSubmission[]>>;
  companies: CompanyProfile[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProfile[]>>;
  events: RecruitmentEvent[];
  setEvents: React.Dispatch<React.SetStateAction<RecruitmentEvent[]>>;
  courses: PelatihanInfo[];
  setCourses: React.Dispatch<React.SetStateAction<PelatihanInfo[]>>;
  majors: Major[];
  setMajors: React.Dispatch<React.SetStateAction<Major[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  recentActivities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean, user?: any) => void;
  currentUser: any;
  onLogout: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  jobs,
  setJobs,
  blogPosts,
  setBlogPosts,
  misiOffers,
  setMisiOffers,
  misiSubmissions,
  setMisiSubmissions,
  companies,
  setCompanies,
  events,
  setEvents,
  courses,
  setCourses,
  majors,
  setMajors,
  tags,
  setTags,
  recentActivities,
  addActivity,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  onLogout,
}) => {
  
  // Calculate companies with job count
  const companiesWithJobCount = companies.map(company => {
    const jobsAvailable = jobs.filter(job => job.companySlug === company.slug).length;
    return {
      ...company,
      jobsAvailable
    };
  });

  return (
    <Routes>
      {/* Login Route */}
      <Route 
        path="/login" 
        element={
          isLoggedIn ? (
            <Navigate to="/admin" replace />
          ) : (
            <LoginPage onLoginSuccess={(user) => setIsLoggedIn(true, user)} />
          )
        } 
      />
      
      {/* Admin Dashboard Route */}
      <Route 
        path="/admin" 
        element={
          isLoggedIn ? 
          <AdminPage 
            onNavigateHome={() => window.location.href = 'https://kabarkarir.com'}
            onLogout={onLogout}
            jobs={jobs} 
            setJobs={setJobs}
            companies={companies} 
            setCompanies={setCompanies}
            blogPosts={blogPosts} 
            setBlogPosts={setBlogPosts}
            events={events} 
            setEvents={setEvents}
            misiOffers={misiOffers} 
            setMisiOffers={setMisiOffers}
            misiSubmissions={misiSubmissions} 
            setMisiSubmissions={setMisiSubmissions}
            courses={courses} 
            setCourses={setCourses}
            majors={majors} 
            setMajors={setMajors}
            tags={tags} 
            setTags={setTags}
            allCompaniesWithCount={companiesWithJobCount}
            recentActivities={recentActivities}
            addActivity={addActivity}
          /> : 
          <Navigate to="/login" replace />
        } 
      />

      {/* Default Route - Redirect to login or admin */}
      <Route 
        path="/" 
        element={<Navigate to={isLoggedIn ? "/admin" : "/login"} replace />} 
      />

      {/* 404 - Redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
