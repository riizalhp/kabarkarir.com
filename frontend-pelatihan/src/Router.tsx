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
import KomunitasPage from './components/KomunitasPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ComingSoonPage from './components/ComingSoonPage';

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Full-screen routes without header/footer */}
      <Route path="/learn/:courseSlug/:lessonId" element={<LessonPlayerPage />} />
      
      {/* Regular routes with header/footer */}
      <Route path="/*" element={
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:slug" element={<CourseDetailPage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/certificate/:certificateNumber" element={<CertificateViewPage />} />
              {/* Feature Pages */}
              <Route path="/komunitas" element={<KomunitasPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Coming Soon Pages */}
              <Route path="/privacy" element={<ComingSoonPage />} />
              <Route path="/terms" element={<ComingSoonPage />} />
              <Route path="/help" element={<ComingSoonPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
};

export default Router;
