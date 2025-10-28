import React from 'react';

interface KomunitasPageProps {
  onBack: () => void;
}

const KomunitasPage: React.FC<KomunitasPageProps> = ({ onBack }) => {
  return (
    <section className="py-10 px-4 bg-gray-50 min-h-[60vh] flex items-center">
      <div className="container mx-auto">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
          <i className="fas fa-users fa-4x text-primary mb-6"></i>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">
            Komunitas KabarKarir
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Segera hadir! Ruang diskusi bagi para pencari kerja untuk berbagi pengalaman, tips, dan saling mendukung dalam perjalanan karir. Terhubung dengan ribuan profesional lainnya!
          </p>
           <button onClick={onBack} className="mt-8 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </section>
  );
};

export default KomunitasPage;
