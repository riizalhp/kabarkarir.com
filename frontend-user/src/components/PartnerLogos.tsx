
import React from 'react';
import { PARTNER_LOGOS } from '../constants';

const PartnerLogos: React.FC = () => {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">Perusahaan Partner</h2>
          <p className="text-gray-600 mt-2">KabarKarir.com berkolaborasi dengan perusahaan terkemuka di Indonesia</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {PARTNER_LOGOS.map((logo, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-center h-24 transition duration-300 hover:shadow-md">
              <img src={logo} alt={`Partner logo ${index + 1}`} className="max-h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;