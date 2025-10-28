import React from 'react';

const BangunCVOnGoing: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 min-h-[60vh] flex items-center">
      <div className="container mx-auto">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
          <i className="fas fa-file-signature fa-4x text-primary mb-6"></i>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">
            Bangun CV & Review Profesional
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Segera hadir! Alat pembuat CV canggih dengan template ATS-friendly dan layanan review CV oleh praktisi HR. Kami sedang menyempurnakannya agar CV Anda dilirik perusahaan impian.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BangunCVOnGoing;
