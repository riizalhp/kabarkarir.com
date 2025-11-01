import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminJobs from './sections/AdminJobs';
import PreviewModal from './PreviewModal';
import { Job, CompanyProfile, Major, Tag } from '../types';
import { adminJobsService, adminCompaniesService, adminMajorsService, adminTagsService } from '../services/adminApi';

interface JobsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
  addActivity: (activity: { type: 'CREATE' | 'UPDATE' | 'DELETE'; category: string; text: string }) => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ onNavigateHome, onLogout, addActivity }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [previewData, setPreviewData] = useState<{ type: 'job'; data: any } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsData, companiesData, majorsData, tagsData] = await Promise.all([
        adminJobsService.getAll(),
        adminCompaniesService.getAll(),
        adminMajorsService.getAll(),
        adminTagsService.getAll(),
      ]);

      setJobs(jobsData);
      
      // Add job count to companies
      const companiesWithCount = companiesData.map(company => ({
        ...company,
        jobsAvailable: jobsData.filter(job => job.companySlug === company.slug).length
      }));
      setCompanies(companiesWithCount);
      setMajors(majorsData);
      setTags(tagsData);
    } catch (error) {
      console.error('Error fetching jobs data:', error);
    }
  };

  const handleShowPreview = (type: 'job', data: any) => {
    setPreviewData({ type, data });
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  return (
    <AdminLayout currentSection="jobs" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminJobs 
        jobs={jobs}
        setJobs={setJobs}
        allCompanies={companies}
        allMajors={majors}
        allTags={tags}
        onShowPreview={handleShowPreview}
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

export default JobsPage;
