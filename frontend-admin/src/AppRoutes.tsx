import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import JobsPage from './components/JobsPage';
import CompaniesPage from './components/CompaniesPage';
import MajorsPage from './components/MajorsPage';
import TagsPage from './components/TagsPage';
import ArticlesPage from './components/ArticlesPage';
import EventsPage from './components/EventsPage';
import MisiPage from './components/MisiPage';
import PelatihanPage from './components/PelatihanPage';
import AnalyticsPage from './components/AnalyticsPage';
import UsersPage from './components/UsersPage';
import SettingsPage from './components/SettingsPage';
import { activityLogsService } from './services/adminApi';

interface AppRoutesProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean, user?: any) => void;
  currentUser: any;
  onLogout: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  isLoggedIn,
  setIsLoggedIn,
  onLogout,
}) => {
  
  const handleNavigateHome = () => {
    window.location.href = 'https://kabarkarir.com';
  };

  const handleAddActivity = async (activity: { type: 'CREATE' | 'UPDATE' | 'DELETE'; category: string; text: string }) => {
    try {
      await activityLogsService.create(activity);
    } catch (error) {
      console.error('Error adding activity log:', error);
    }
  };

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
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          isLoggedIn ? 
          <DashboardPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/lowongan" 
        element={
          isLoggedIn ? 
          <JobsPage onNavigateHome={handleNavigateHome} onLogout={onLogout} addActivity={handleAddActivity} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/perusahaan" 
        element={
          isLoggedIn ? 
          <CompaniesPage onNavigateHome={handleNavigateHome} onLogout={onLogout} addActivity={handleAddActivity} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/jurusan" 
        element={
          isLoggedIn ? 
          <MajorsPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/tags" 
        element={
          isLoggedIn ? 
          <TagsPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/artikel" 
        element={
          isLoggedIn ? 
          <ArticlesPage onNavigateHome={handleNavigateHome} onLogout={onLogout} addActivity={handleAddActivity} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/event" 
        element={
          isLoggedIn ? 
          <EventsPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/misi" 
        element={
          isLoggedIn ? 
          <MisiPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/pelatihan" 
        element={
          isLoggedIn ? 
          <PelatihanPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/analytics" 
        element={
          isLoggedIn ? 
          <AnalyticsPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/pengguna" 
        element={
          isLoggedIn ? 
          <UsersPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
          <Navigate to="/login" replace />
        } 
      />
      
      <Route 
        path="/admin/pengaturan" 
        element={
          isLoggedIn ? 
          <SettingsPage onNavigateHome={handleNavigateHome} onLogout={onLogout} /> : 
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

