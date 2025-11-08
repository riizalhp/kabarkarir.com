import React from 'react';
import { TELEGRAM_LINK } from '../constants';

const KomunitasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Komunitas</h1>
        <p className="text-gray-600 mb-8">Bergabung dengan komunitas mahasiswa KabarKarir</p>
        
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto">
          <i className="fab fa-telegram text-8xl text-blue-500 mb-6"></i>
          <h2 className="text-3xl font-bold mb-4">Join Telegram Group</h2>
          <p className="text-gray-600 mb-6">
            Bergabung dengan ribuan mahasiswa Indonesia. Dapatkan update terbaru tentang magang, beasiswa, lomba, dan peluang karir lainnya.
          </p>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition"
          >
            <i className="fab fa-telegram mr-2"></i>
            Join Sekarang
          </a>
        </div>
      </div>
    </div>
  );
};

export default KomunitasPage;
