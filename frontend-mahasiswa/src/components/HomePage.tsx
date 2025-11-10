import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Internship, Scholarship, Competition } from '../types';
import InternshipCard from './InternshipCard';
import ScholarshipCard from './ScholarshipCard';
import CompetitionCard from './CompetitionCard';
import Sidebar from './Sidebar';
import { internshipsService, scholarshipsService, competitionsService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSidebarData } from '../hooks/useSidebarData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [latestInternships, setLatestInternships] = useState<Internship[]>([]);
  const [latestScholarships, setLatestScholarships] = useState<Scholarship[]>([]);
  const [latestCompetitions, setLatestCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  // Sidebar data
  const { trendingScholarships, campusEvents, latestArticles } = useSidebarData();

  useEffect(() => {
    fetchLatestData();
  }, []);

  const fetchLatestData = async () => {
    try {
      setLoading(true);
      const [internships, scholarships, competitions] = await Promise.all([
        internshipsService.getAll({ limit: 6, offset: 0 }),
        scholarshipsService.getAll({ limit: 6, offset: 0 }),
        competitionsService.getAll({ limit: 6, offset: 0 })
      ]);
      
      setLatestInternships(internships.data);
      setLatestScholarships(scholarships.data);
      setLatestCompetitions(competitions.data);
    } catch (error) {
      console.error('Error fetching latest data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInternship = (slug: string) => {
    navigate(`/magang/${slug}`);
  };

  const handleSelectScholarship = (slug: string) => {
    navigate(`/beasiswa/${slug}`);
  };

  const handleSelectCompetition = (slug: string) => {
    navigate(`/lomba/${slug}`);
  };

  return (
    <div className="bg-gray-50">
      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Jelajahi Peluang</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Magang', icon: 'fa-briefcase', link: '/magang', bgColor: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-600' },
              { name: 'Beasiswa', icon: 'fa-graduation-cap', link: '/beasiswa', bgColor: 'bg-green-50', iconColor: 'text-green-600', borderColor: 'border-green-600' },
              { name: 'Lomba', icon: 'fa-trophy', link: '/lomba', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600', borderColor: 'border-yellow-600' },
              { name: 'Webinar', icon: 'fa-video', link: '/webinar', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'border-purple-600' },
              { name: 'Freelance', icon: 'fa-laptop', link: '/freelance', bgColor: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'border-red-600' },
              { name: 'Event Kampus', icon: 'fa-calendar', link: '/event-kampus', bgColor: 'bg-pink-50', iconColor: 'text-pink-600', borderColor: 'border-pink-600' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-t-4 ${item.borderColor} group`}
              >
                <div className={`w-14 h-14 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                  <i className={`fas ${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Internships */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Program Magang Terbaru</h2>
              <p className="text-gray-600 mt-1">Kesempatan magang terbaik untuk mahasiswa</p>
            </div>
            <Link
              to="/magang"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
            >
              Lihat Semua
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : latestInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  onSelect={handleSelectInternship}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <i className="fas fa-briefcase fa-3x text-gray-400 mb-4"></i>
              <p className="text-gray-500">Belum ada program magang tersedia</p>
            </div>
          )}

          {/* Latest Scholarships */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Beasiswa Terbaru</h2>
              <p className="text-gray-600 mt-1">Beasiswa dalam dan luar negeri</p>
            </div>
            <Link
              to="/beasiswa"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
            >
              Lihat Semua
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : latestScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  onSelect={handleSelectScholarship}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow">
              <i className="fas fa-graduation-cap fa-3x text-gray-400 mb-4"></i>
              <p className="text-gray-500">Belum ada beasiswa tersedia</p>
            </div>
          )}
          </div>

          {/* Latest Competitions */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Lomba Terbaru</h2>
              <p className="text-gray-600 mt-1">Kompetisi dan lomba untuk mahasiswa</p>
            </div>
            <Link
              to="/lomba"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
            >
              Lihat Semua
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : latestCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestCompetitions.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  onSelect={handleSelectCompetition}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <i className="fas fa-trophy fa-3x text-gray-400 mb-4"></i>
              <p className="text-gray-500">Belum ada lomba tersedia</p>
            </div>
          )}
          </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80">
              <Sidebar
                trendingScholarships={trendingScholarships}
                campusEvents={campusEvents}
                latestArticles={latestArticles}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Karir Impianmu?</h2>
          <p className="text-xl mb-8 opacity-90">Bergabung dengan ribuan mahasiswa yang sudah memulai perjalanan karir mereka</p>
          <Link to="/komunitas" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block shadow-lg">
            <i className="fas fa-users mr-2"></i>
            Join Komunitas Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
