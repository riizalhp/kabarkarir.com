import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Blog & Artikel</h1>
        <p className="text-gray-600 mb-8">Baca artikel dan tips seputar karir mahasiswa</p>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <i className="fas fa-newspaper text-6xl text-blue-500 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Halaman blog sedang dalam pengembangan.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
