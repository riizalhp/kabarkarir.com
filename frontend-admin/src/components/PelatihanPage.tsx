import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminPelatihan from './sections/AdminPelatihan';
import { PelatihanInfo } from '../types';
import { adminPelatihanService } from '../services/adminApi';

interface PelatihanPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const PelatihanPage: React.FC<PelatihanPageProps> = ({ onNavigateHome, onLogout }) => {
  const [courses, setCourses] = useState<PelatihanInfo[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await adminPelatihanService.getAll();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching pelatihan data:', error);
    }
  };

  return (
    <AdminLayout currentSection="pelatihan" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminPelatihan courses={courses} setCourses={setCourses} />
    </AdminLayout>
  );
};

export default PelatihanPage;
