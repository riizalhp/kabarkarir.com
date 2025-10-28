import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import AppRoutes from './AppRoutes';
import { INITIAL_JOBS, INITIAL_BLOG_POSTS, INITIAL_MISI_CUAN_OFFERS, INITIAL_COMPANY_PROFILES, INITIAL_RECRUITMENT_EVENTS, INITIAL_PELATIHAN_INFO, INITIAL_MAJORS, INITIAL_MISI_SUBMISSIONS, INITIAL_TAGS } from './constants';
import { Job, BlogPost, MisiCuanOffer, CompanyProfile, RecruitmentEvent, PelatihanInfo, Major, MisiSubmission, Tag, Activity } from './types';
import { adminAuth } from './lib/supabase';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await adminAuth.getSession();
      if (session && session.user) {
        const isAdmin = await adminAuth.isAdmin();
        if (isAdmin) {
          setIsLoggedIn(true);
          const adminRole = await adminAuth.getAdminRole();
          setCurrentUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
            role: adminRole,
          });
        } else {
          // Not admin, sign out
          await adminAuth.signOut();
          setIsLoggedIn(false);
          navigate('/login');
        }
      } else {
        setIsLoggedIn(false);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAuth.signOut();
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
        setIsLoggedIn={(loggedIn: boolean, user?: any) => {
          setIsLoggedIn(loggedIn);
          if (user) setCurrentUser(user);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
