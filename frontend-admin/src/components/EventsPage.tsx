import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminEvents from './sections/AdminEvents';
import PreviewModal from './PreviewModal';
import { RecruitmentEvent, CompanyProfile } from '../types';
import { adminEventsService, adminCompaniesService } from '../services/adminApi';

interface EventsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigateHome, onLogout }) => {
  const [events, setEvents] = useState<RecruitmentEvent[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [previewData, setPreviewData] = useState<{ type: 'event'; data: any } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsData, companiesData] = await Promise.all([
        adminEventsService.getAll(),
        adminCompaniesService.getAll(),
      ]);
      setEvents(eventsData);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error fetching events data:', error);
    }
  };

  const handleShowPreview = (type: 'event', data: any) => {
    setPreviewData({ type, data });
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  return (
    <AdminLayout currentSection="events" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminEvents 
        events={events}
        setEvents={setEvents}
        allCompanies={companies}
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

export default EventsPage;
