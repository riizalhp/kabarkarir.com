import React from 'react';

interface AdCardProps {
  type?: 'banner' | 'card';
  className?: string;
}

/**
 * AdCard Component
 * Komponen untuk menampilkan iklan dalam format card atau banner
 * Bisa disisipkan di antara konten card lainnya
 */
const AdCard: React.FC<AdCardProps> = ({ type = 'card', className = '' }) => {
  
  if (type === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border-2 border-dashed border-blue-200 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Sponsored</span>
            <h3 className="text-lg font-bold text-secondary mt-1">Ruang Iklan Banner</h3>
            <p className="text-sm text-gray-600 mt-2">
              Promosikan produk atau layanan Anda di sini. Hubungi tim kami untuk info lebih lanjut.
            </p>
            <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Pasang Iklan
            </button>
          </div>
          <div className="hidden md:block ml-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <i className="fas fa-ad text-4xl text-blue-300"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden border-2 border-dashed border-gray-200 hover:border-primary transition ${className}`}>
      <div className="p-6 text-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">Sponsored</span>
        <div className="mt-4 mb-4">
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <i className="fas fa-ad text-5xl text-gray-300"></i>
          </div>
        </div>
        <h3 className="font-semibold text-secondary mb-2">Ruang Iklan</h3>
        <p className="text-sm text-gray-600 mb-4">
          Pasang iklan Anda di sini dan jangkau ribuan pencari kerja aktif
        </p>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          Info Iklan
        </button>
      </div>
    </div>
  );
};

export default AdCard;
