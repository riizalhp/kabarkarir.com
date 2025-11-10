import { useState, useEffect } from 'react';
import { Scholarship, CampusEvent, BlogPost } from '../types';
import { scholarshipsService, campusEventsService, blogService } from '../services/api';

export const useSidebarData = () => {
  const [trendingScholarships, setTrendingScholarships] = useState<Scholarship[]>([]);
  const [campusEvents, setCampusEvents] = useState<CampusEvent[]>([]);
  const [latestArticles, setLatestArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);
        const [scholarshipsRes, eventsRes, blogRes] = await Promise.all([
          scholarshipsService.getAll({ limit: 5, offset: 0 }),
          campusEventsService.getAll({ limit: 2, offset: 0 }),
          blogService.getAll({ limit: 5, offset: 0 })
        ]);
        
        setTrendingScholarships(scholarshipsRes.data);
        setCampusEvents(eventsRes.data);
        setLatestArticles(blogRes.data);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  return {
    trendingScholarships,
    campusEvents,
    latestArticles,
    loading
  };
};
