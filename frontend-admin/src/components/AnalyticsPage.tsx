import React from 'react';
import AdminLayout from './AdminLayout';
import AdminAnalytics from './sections/AdminAnalytics';

interface AnalyticsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onNavigateHome, onLogout }) => {
  return (
    <AdminLayout currentSection="analytics" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminAnalytics />
    </AdminLayout>
  );
};

export default AnalyticsPage;
