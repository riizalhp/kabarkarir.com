import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminArticles from './sections/AdminArticles';
import PreviewModal from './PreviewModal';
import { BlogPost } from '../types';
import { adminBlogService } from '../services/adminApi';

interface ArticlesPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
  addActivity: (activity: { type: 'CREATE' | 'UPDATE' | 'DELETE'; category: string; text: string }) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ onNavigateHome, onLogout, addActivity }) => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [previewData, setPreviewData] = useState<{ type: 'article'; data: any } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await adminBlogService.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleShowPreview = (type: 'article', data: any) => {
    setPreviewData({ type, data });
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  return (
    <AdminLayout currentSection="articles" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminArticles 
        articles={articles}
        setArticles={setArticles}
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

export default ArticlesPage;
