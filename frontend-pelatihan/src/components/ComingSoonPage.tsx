import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <i className="fas fa-tools text-6xl text-primary mb-6"></i>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Halaman ini sedang dalam tahap pengembangan. Kami akan segera meluncurkannya!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Tetap Update dengan Fitur Terbaru
          </h2>
          <p className="text-gray-600 mb-6">
            Sementara menunggu, jelajahi fitur-fitur lain yang sudah tersedia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <i className="fas fa-home mr-2"></i>
              Kembali ke Beranda
            </Link>
            <Link
              to="/courses"
              className="bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
            >
              <i className="fas fa-graduation-cap mr-2"></i>
              Lihat Kursus
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <i className="fas fa-clock text-3xl text-primary mb-3"></i>
            <h3 className="font-semibold text-secondary mb-2">Segera Hadir</h3>
            <p className="text-gray-600 text-sm">Fitur baru sedang dikembangkan</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <i className="fas fa-bell text-3xl text-accent mb-3"></i>
            <h3 className="font-semibold text-secondary mb-2">Notifikasi</h3>
            <p className="text-gray-600 text-sm">Dapatkan update peluncuran</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <i className="fas fa-star text-3xl text-yellow-500 mb-3"></i>
            <h3 className="font-semibold text-secondary mb-2">Premium</h3>
            <p className="text-gray-600 text-sm">Fitur eksklusif akan tersedia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
