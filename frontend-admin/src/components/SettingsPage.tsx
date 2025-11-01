import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminSettings from './sections/AdminSettings';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, MisiSubmission, PelatihanInfo, Major, Tag, AdminUser } from '../types';
import { 
  adminJobsService, 
  adminCompaniesService, 
  adminBlogService, 
  adminEventsService, 
  adminMisiService,
  adminPelatihanService,
  adminMajorsService,
  adminTagsService 
} from '../services/adminApi';
import { INITIAL_ADMIN_USERS } from '../constants';

interface SettingsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigateHome, onLogout }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<RecruitmentEvent[]>([]);
  const [misiOffers, setMisiOffers] = useState<MisiCuanOffer[]>([]);
  const [misiSubmissions, setMisiSubmissions] = useState<MisiSubmission[]>([]);
  const [courses, setCourses] = useState<PelatihanInfo[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        jobsData,
        companiesData,
        articlesData,
        eventsData,
        misiData,
        submissionsData,
        coursesData,
        majorsData,
        tagsData
      ] = await Promise.all([
        adminJobsService.getAll(),
        adminCompaniesService.getAll(),
        adminBlogService.getAll(),
        adminEventsService.getAll(),
        adminMisiService.getAll(),
        adminMisiService.getSubmissions(),
        adminPelatihanService.getAll(),
        adminMajorsService.getAll(),
        adminTagsService.getAll(),
      ]);

      setJobs(jobsData);
      setCompanies(companiesData);
      setBlogPosts(articlesData);
      setEvents(eventsData);
      setMisiOffers(misiData);
      setMisiSubmissions(submissionsData);
      setCourses(coursesData);
      setMajors(majorsData);
      setTags(tagsData);
    } catch (error) {
      console.error('Error fetching settings data:', error);
    }
  };

  return (
    <AdminLayout currentSection="settings" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminSettings 
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
        users={users}
        setUsers={setUsers}
      />
    </AdminLayout>
  );
};

export default SettingsPage;
