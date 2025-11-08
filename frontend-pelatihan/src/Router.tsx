import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import CourseDetailPage from './components/CourseDetailPage';
import LessonPlayerPage from './components/LessonPlayerPage';
import MyLearningPage from './components/MyLearningPage';
import CertificatesPage from './components/CertificatesPage';
import CertificateViewPage from './components/CertificateViewPage';

const Router: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/learn/:courseSlug/:lessonId" element={<LessonPlayerPage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/certificate/:certificateNumber" element={<CertificateViewPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Router;
