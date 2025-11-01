import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminMisi from './sections/AdminMisi';
import PreviewModal from './PreviewModal';
import { MisiCuanOffer, MisiSubmission } from '../types';
import { adminMisiService } from '../services/adminApi';

interface MisiPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const MisiPage: React.FC<MisiPageProps> = ({ onNavigateHome, onLogout }) => {
  const [misi, setMisi] = useState<MisiCuanOffer[]>([]);
  const [submissions, setSubmissions] = useState<MisiSubmission[]>([]);
  const [previewData, setPreviewData] = useState<{ type: 'misi' | 'misiSubmissionForm'; data: any } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [misiData, submissionsData] = await Promise.all([
        adminMisiService.getAll(),
        adminMisiService.getSubmissions(),
      ]);
      setMisi(misiData);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching misi data:', error);
    }
  };

  const handleShowPreview = (type: 'misi' | 'misiSubmissionForm', data: any) => {
    setPreviewData({ type, data });
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  return (
    <AdminLayout currentSection="misi" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminMisi 
        misi={misi}
        setMisi={setMisi}
        submissions={submissions}
        setSubmissions={setSubmissions}
        onShowPreview={handleShowPreview}
      />
      {previewData && (
        <PreviewModal
          type={previewData.type}
          data={previewData.data}
          onClose={handleClosePreview}
        />
      )}
    </AdminLayout>
  );
};

export default MisiPage;
