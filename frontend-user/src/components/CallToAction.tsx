
import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Siap Meraih Karir Impianmu?</h2>
        <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
          Daftar lowongan kerja terbaru dari perusahaan BUMN dan swasta terkemuka di Indonesia. Mulai langkah pertama menuju kesuksesan karirmu.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <a href="#" className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-full transition">
            Lihat Lowongan <i className="fas fa-search ml-2"></i>
          </a>
          <a href="#" className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-8 rounded-full transition">
            Pasang Iklan <i className="fas fa-bullhorn ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
