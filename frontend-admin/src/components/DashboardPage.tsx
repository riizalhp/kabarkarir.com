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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalActivities, setTotalActivities] = useState<number>(0);
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

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.time('Dashboard stats fetch');
      
      // Fetch stats in parallel
      const [jobs, companies, misi, submissions, activitiesCount] = await Promise.all([
        adminJobsService.getAll(),
        adminCompaniesService.getAll(),
        adminMisiService.getAll(),
        adminMisiService.getSubmissions(),
        activityLogsService.getCount(),
      ]);

      console.timeEnd('Dashboard stats fetch');

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

      setTotalActivities(activitiesCount);

      // Fetch first page of activities
      await fetchActivities(1);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Gagal memuat data dashboard. Silakan refresh halaman.');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async (page: number) => {
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const activities = await activityLogsService.getRecent(ITEMS_PER_PAGE, offset);
      setRecentActivities(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <AdminLayout currentSection="dashboard" onNavigateHome={onNavigateHome} onLogout={onLogout}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
            <p className="text-slate-600">Memuat data dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout currentSection="dashboard" onNavigateHome={onNavigateHome} onLogout={onLogout}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={fetchStats}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              <i className="fas fa-redo mr-2"></i>
              Coba Lagi
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentSection="dashboard" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminDashboard 
        recentActivities={recentActivities}
        currentPage={currentPage}
        totalPages={Math.ceil(totalActivities / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
        {...stats}
      />
    </AdminLayout>
  );
};

export default DashboardPage;
