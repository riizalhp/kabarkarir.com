import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InternshipPage from './components/InternshipPage';
import ScholarshipPage from './components/ScholarshipPage';
import CompetitionPage from './components/CompetitionPage';
import WebinarPage from './components/WebinarPage';
import CampusEventPage from './components/CampusEventPage';
import FreelancePage from './components/FreelancePage';
import BlogPage from './components/BlogPage';
import MisiCuanPage from './components/MisiCuanPage';
import KonsulKarirPage from './components/KonsulKarirPage';
import BangunCVPage from './components/BangunCVPage';
import PasangIklanPage from './components/PasangIklanPage';
import KomunitasPage from './components/KomunitasPage';
import PsikotestPage from './components/PsikotestPage';

// Coming Soon Pages
import PsikotestComingSoon from './components/PsikotestComingSoon';
import BangunCVComingSoon from './components/BangunCVComingSoon';
import KonsulKarirComingSoon from './components/KonsulKarirComingSoon';
import PasangIklanComingSoon from './components/PasangIklanComingSoon';
import KomunitasComingSoon from './components/KomunitasComingSoon';
import MisiCuanComingSoon from './components/MisiCuanComingSoon';
import FreelanceComingSoon from './components/FreelanceComingSoon';

const Router: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/magang" element={<InternshipPage />} />
          <Route path="/magang/:slug" element={<InternshipPage />} />
          <Route path="/beasiswa" element={<ScholarshipPage />} />
          <Route path="/beasiswa/:slug" element={<ScholarshipPage />} />
          <Route path="/lomba" element={<CompetitionPage />} />
          <Route path="/lomba/:slug" element={<CompetitionPage />} />
          <Route path="/webinar" element={<WebinarPage />} />
          <Route path="/webinar/:slug" element={<WebinarPage />} />
          <Route path="/event-kampus" element={<CampusEventPage />} />
          <Route path="/event-kampus/:slug" element={<CampusEventPage />} />
          <Route path="/freelance" element={<FreelanceComingSoon />} />
          <Route path="/freelance/:slug" element={<FreelanceComingSoon />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          {/* Coming Soon Routes */}
          <Route path="/misi-cuan" element={<MisiCuanComingSoon />} />
          <Route path="/psikotes" element={<PsikotestComingSoon />} />
          <Route path="/konsul-karir" element={<KonsulKarirComingSoon />} />
          <Route path="/bangun-cv" element={<BangunCVComingSoon />} />
          <Route path="/pasang-iklan" element={<PasangIklanComingSoon />} />
          <Route path="/komunitas" element={<KomunitasComingSoon />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Router;
