import React from 'react';

const PasangIklanOnGoing: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 min-h-[60vh] flex items-center">
      <div className="container mx-auto">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
          <i className="fas fa-bullhorn fa-4x text-primary mb-6"></i>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">
            Pasang Iklan Lowongan
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Segera hadir! Halaman khusus untuk perusahaan yang ingin menjangkau talenta terbaik di Indonesia. Kami sedang menyiapkan dasbor yang mudah digunakan untuk kebutuhan rekrutmen Anda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PasangIklanOnGoing;
