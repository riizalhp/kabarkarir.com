import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminMajors from './sections/AdminMajors';
import { Major } from '../types';
import { adminMajorsService } from '../services/adminApi';

interface MajorsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const MajorsPage: React.FC<MajorsPageProps> = ({ onNavigateHome, onLogout }) => {
  const [majors, setMajors] = useState<Major[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await adminMajorsService.getAll();
      setMajors(data);
    } catch (error) {
      console.error('Error fetching majors:', error);
    }
  };

  return (
    <AdminLayout currentSection="majors" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminMajors majors={majors} setMajors={setMajors} />
    </AdminLayout>
  );
};

export default MajorsPage;
