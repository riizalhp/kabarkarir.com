import React from 'react';

const LessonPlayerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Video Player</h1>
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <i className="fas fa-play-circle text-6xl text-blue-400 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-gray-400">Video player dengan iframe support sedang dalam pengembangan.</p>
          <p className="text-sm text-gray-500 mt-4">Support: YouTube, Google Drive, Vimeo</p>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayerPage;
