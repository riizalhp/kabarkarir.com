import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminTags from './sections/AdminTags';
import { Tag } from '../types';
import { adminTagsService } from '../services/adminApi';

interface TagsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const TagsPage: React.FC<TagsPageProps> = ({ onNavigateHome, onLogout }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await adminTagsService.getAll();
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  return (
    <AdminLayout currentSection="tags" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminTags tags={tags} setTags={setTags} />
    </AdminLayout>
  );
};

export default TagsPage;
