import React from 'react';
import { Link } from 'react-router-dom';
import AdsSpace from './AdsSpace';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Top Banner Ads */}
        <div className="mb-8">
          <AdsSpace size="banner" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <i className="fas fa-blog text-6xl text-purple-600 mb-4"></i>
                <h1 className="text-4xl font-bold text-secondary mb-4">Blog & Artikel</h1>
                <p className="text-xl text-gray-600">
                  Tips, tutorial, dan inspirasi seputar pembelajaran dan karir
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <div className="flex items-start">
                  <i className="fas fa-tools text-yellow-600 text-2xl mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Fitur Sedang Dikembangkan</h3>
                    <p className="text-yellow-700">
                      Kami sedang menyiapkan artikel-artikel berkualitas untuk membantu perjalanan belajar Anda. Tunggu ya!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                  <i className="fas fa-newspaper text-3xl text-purple-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Artikel Tutorial</h3>
                  <p className="text-gray-700 text-sm">Panduan lengkap dan tutorial step-by-step</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <i className="fas fa-lightbulb text-3xl text-primary mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Tips & Trick</h3>
                  <p className="text-gray-700 text-sm">Tips belajar efektif dan produktif</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <i className="fas fa-briefcase text-3xl text-green-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Career Insights</h3>
                  <p className="text-gray-700 text-sm">Wawasan karir dan industri terkini</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                  <i className="fas fa-star text-3xl text-red-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Success Stories</h3>
                  <p className="text-gray-700 text-sm">Kisah sukses alumni dan siswa</p>
                </div>
              </div>

              {/* Wide Horizontal Ads (4:1) */}
              <div className="mb-8">
                <AdsSpace size="wide-horizontal" />
              </div>

              <div className="text-center">
                <Link
                  to="/courses"
                  className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Jelajahi Kursus
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            {/* Sidebar Ads - Square */}
            <div className="mb-6">
              <AdsSpace size="square" />
            </div>

            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h3 className="font-bold text-secondary mb-4">
                <i className="fas fa-bookmark text-purple-600 mr-2"></i>
                Kategori Blog
              </h3>
              <div className="space-y-2">
                {['Web Development', 'Data Science', 'UI/UX Design', 'Career Tips', 'Productivity', 'Success Stories'].map((category) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition cursor-pointer">
                    <span className="text-gray-700 text-sm">{category}</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-3">Newsletter</h3>
              <p className="text-sm mb-4 opacity-90">
                Dapatkan artikel terbaru langsung ke inbox Anda setiap minggu.
              </p>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <i className="fas fa-envelope text-2xl mb-2"></i>
                <p className="text-xs">Segera Hadir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
