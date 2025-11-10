import React from 'react';
import { Link } from 'react-router-dom';
import AdsSpace from './AdsSpace';

const AboutPage: React.FC = () => {
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
                <i className="fas fa-info-circle text-6xl text-primary mb-4"></i>
                <h1 className="text-4xl font-bold text-secondary mb-4">Tentang Kami</h1>
                <p className="text-xl text-gray-600">
                  Platform pembelajaran online terpercaya di Indonesia
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <div className="flex items-start">
                  <i className="fas fa-tools text-yellow-600 text-2xl mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Halaman Sedang Dikembangkan</h3>
                    <p className="text-yellow-700">
                      Kami sedang menyusun cerita dan visi misi kami untuk Anda. Halaman ini akan segera dilengkapi!
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">Visi Kami</h2>
                <p className="text-gray-700 mb-6">
                  Menjadi platform pembelajaran online terdepan yang memberdayakan jutaan orang Indonesia untuk meningkatkan skill dan meraih karir impian mereka.
                </p>

                <h2 className="text-2xl font-bold text-secondary mb-4">Misi Kami</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <span>Menyediakan kursus berkualitas tinggi dengan instruktur berpengalaman</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <span>Membuat pembelajaran online yang terjangkau dan mudah diakses</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <span>Membangun komunitas pembelajar yang saling mendukung</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-600 mr-3 mt-1"></i>
                    <span>Memberikan sertifikat yang diakui industri</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-700">Kursus Online</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
                  <div className="text-gray-700">Siswa Aktif</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                  <div className="text-gray-700">Instruktur Expert</div>
                </div>
              </div>

              {/* Wide Horizontal Ads (4:1) */}
              <div className="mb-8">
                <AdsSpace size="wide-horizontal" />
              </div>

              <div className="text-center">
                <Link
                  to="/courses"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Mulai Belajar Sekarang
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
                <i className="fas fa-building text-primary mr-2"></i>
                Informasi Kontak
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <i className="fas fa-envelope text-primary mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-secondary mb-1">Email</div>
                    <div className="text-gray-600">kabarkarir@outlook.com</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-primary mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-secondary mb-1">Lokasi</div>
                    <div className="text-gray-600">Indonesia</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-3">Join Our Community</h3>
              <p className="text-sm mb-4 opacity-90">
                Bergabung dengan ribuan pembelajar lainnya dan mulai journey Anda hari ini!
              </p>
              <Link
                to="/komunitas"
                className="block bg-white text-primary text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                <i className="fas fa-users mr-2"></i>
                Lihat Komunitas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
