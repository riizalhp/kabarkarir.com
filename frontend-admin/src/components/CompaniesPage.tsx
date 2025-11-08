import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminCompanies from './sections/AdminCompanies';
import PreviewModal from './PreviewModal';
import { Job, CompanyProfile, Major, Tag } from '../types';
import { adminJobsService, adminCompaniesService, adminMajorsService, adminTagsService } from '../services/adminApi';

interface CompaniesPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
  addActivity: (activity: { type: 'CREATE' | 'UPDATE' | 'DELETE'; category: string; text: string }) => void;
}

const CompaniesPage: React.FC<CompaniesPageProps> = ({ onNavigateHome, onLogout, addActivity }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [previewData, setPreviewData] = useState<{ type: 'company' | 'job'; data: any } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsData, companiesData, majorsData, tagsData] = await Promise.all([
        adminJobsService.getAll(),
        adminCompaniesService.getAll(), // jobsAvailable already calculated in API
        adminMajorsService.getAll(),
        adminTagsService.getAll(),
      ]);

      setJobs(jobsData);
      setCompanies(companiesData); // Use data directly from API
      setMajors(majorsData);
      setTags(tagsData);
    } catch (error) {
      console.error('Error fetching companies data:', error);
    }
  };

  const handleShowPreview = (type: 'company' | 'job', data: any) => {
    setPreviewData({ type, data });
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  return (
    <AdminLayout currentSection="companies" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminCompanies 
        companies={companies}
        setCompanies={setCompanies}
        onShowPreview={handleShowPreview}
        jobs={jobs}
        setJobs={setJobs}
        allMajors={majors}
        allTags={tags}
        addActivity={addActivity}
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

export default CompaniesPage;
