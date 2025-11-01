import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminDashboard from './sections/AdminDashboard';
import { Activity, Job, CompanyProfile, MisiCuanOffer, MisiSubmission } from '../types';
import { activityLogsService, adminJobsService, adminCompaniesService, adminMisiService } from '../services/adminApi';

interface DashboardPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateHome, onLogout }) => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    jobCount: 0,
    jobChange: 0,
    companyCount: 0,
    companyChange: 0,
    misiCount: 0,
    misiChange: 0,
    submissionCount: 0,
    submissionChange: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch activity logs
      const activities = await activityLogsService.getRecent(10);
      setRecentActivities(activities);

      // Fetch stats
      const [jobs, companies, misi, submissions] = await Promise.all([
        adminJobsService.getAll(),
        adminCompaniesService.getAll(),
        adminMisiService.getAll(),
        adminMisiService.getSubmissions(),
      ]);

      setStats({
        jobCount: jobs.length,
        jobChange: 5, // TODO: Calculate actual change
        companyCount: companies.length,
        companyChange: -2, // TODO: Calculate actual change
        misiCount: misi.length,
        misiChange: 1, // TODO: Calculate actual change
        submissionCount: submissions.length,
        submissionChange: 12, // TODO: Calculate actual change
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <AdminLayout currentSection="dashboard" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminDashboard 
        recentActivities={recentActivities}
        {...stats}
      />
    </AdminLayout>
  );
};

export default DashboardPage;
