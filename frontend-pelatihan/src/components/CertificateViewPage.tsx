import React from 'react';

const CertificateViewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-12 rounded-lg shadow-xl text-center border-8 border-double border-yellow-500">
          <i className="fas fa-award text-8xl text-yellow-500 mb-6"></i>
          <h1 className="text-3xl font-bold mb-4">Sertifikat Penyelesaian</h1>
          <div className="border-t-2 border-gray-300 my-6"></div>
          <p className="text-gray-600 mb-4">Preview sertifikat sedang dalam pengembangan.</p>
          <p className="text-sm text-gray-500">Nomor Sertifikat: CERT-XXXX-XXXX</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewPage;
