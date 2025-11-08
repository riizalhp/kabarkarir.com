import React from 'react';

const InternshipPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Program Magang</h1>
        <p className="text-gray-600 mb-8">
          Temukan program magang terbaik dari berbagai perusahaan untuk mahasiswa
        </p>
        
        {/* Placeholder - Will be implemented with real data fetching */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <i className="fas fa-briefcase text-6xl text-blue-500 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-gray-600">
            Halaman magang sedang dalam pengembangan. Data akan ditampilkan setelah database diisi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;
