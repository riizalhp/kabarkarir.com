import React from 'react';
import { Link } from 'react-router-dom';
import AdsSpace from './AdsSpace';

const KomunitasPage: React.FC = () => {
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
                <i className="fas fa-users text-6xl text-primary mb-4"></i>
                <h1 className="text-4xl font-bold text-secondary mb-4">Komunitas</h1>
                <p className="text-xl text-gray-600">
                  Bergabunglah dengan komunitas pembelajar KabarKarir
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <div className="flex items-start">
                  <i className="fas fa-tools text-yellow-600 text-2xl mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Fitur Sedang Dikembangkan</h3>
                    <p className="text-yellow-700">
                      Kami sedang membangun komunitas pembelajaran yang interaktif untuk Anda. Fitur ini akan segera hadir!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <i className="fas fa-comments text-3xl text-primary mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Forum Diskusi</h3>
                  <p className="text-gray-700 text-sm">Diskusi dengan sesama pembelajar dan instruktur</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <i className="fas fa-user-friends text-3xl text-green-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Networking</h3>
                  <p className="text-gray-700 text-sm">Bangun koneksi dengan profesional di bidang Anda</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                  <i className="fas fa-calendar-alt text-3xl text-purple-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Event & Webinar</h3>
                  <p className="text-gray-700 text-sm">Ikuti event dan webinar eksklusif dari komunitas</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                  <i className="fas fa-trophy text-3xl text-accent mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Kompetisi</h3>
                  <p className="text-gray-700 text-sm">Uji kemampuan Anda dalam kompetisi berhadiah</p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/courses"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Mulai Belajar Dulu
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            {/* Ads Space */}
            <div className="mb-6">
              <AdsSpace size="square" />
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-secondary mb-4">
                <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                Info
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Komunitas KabarKarir Learn akan menjadi tempat berkumpul para pembelajar untuk saling berbagi pengetahuan dan pengalaman.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                  <span className="text-gray-700">Akses ke forum diskusi</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                  <span className="text-gray-700">Networking dengan sesama learner</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                  <span className="text-gray-700">Event & webinar eksklusif</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                  <span className="text-gray-700">Kompetisi berhadiah</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-3">Dapatkan Update</h3>
              <p className="text-sm mb-4 opacity-90">
                Daftarkan email Anda untuk mendapatkan notifikasi saat fitur komunitas diluncurkan.
              </p>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <i className="fas fa-bell text-2xl mb-2"></i>
                <p className="text-xs">Segera Hadir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomunitasPage;
