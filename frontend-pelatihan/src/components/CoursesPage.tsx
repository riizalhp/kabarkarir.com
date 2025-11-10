import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdsSpace from './AdsSpace';

const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  // Dummy courses data with YouTube videos
  const allCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      category: 'Web Development',
      level: 'Beginner',
      is_free: true,
      rating: 4.8,
      students: 1234,
      duration: '52 hours',
      thumbnail: 'https://img.youtube.com/vi/qz0aGYrrlhU/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      description: 'Belajar HTML, CSS, JavaScript, React, Node.js, dan banyak lagi!'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      instructor: 'Jose Portilla',
      category: 'Data Science',
      level: 'Intermediate',
      is_free: true,
      rating: 4.9,
      students: 2567,
      duration: '25 hours',
      thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/embed/rfscVS0vtbw',
      description: 'Master Python untuk analisis data dan machine learning'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Daniel Walter Scott',
      category: 'UI/UX Design',
      level: 'Beginner',
      is_free: true,
      rating: 4.7,
      students: 987,
      duration: '18 hours',
      thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      description: 'Pelajari prinsip-prinsip desain UI/UX dari dasar'
    },
    {
      id: 4,
      title: 'Digital Marketing Masterclass',
      instructor: 'Rob Percival',
      category: 'Digital Marketing',
      level: 'Beginner',
      is_free: true,
      rating: 4.6,
      students: 3421,
      duration: '23 hours',
      thumbnail: 'https://img.youtube.com/vi/nU-IIXBWlS4/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/embed/nU-IIXBWlS4',
      description: 'Strategi marketing digital yang efektif untuk bisnis Anda'
    },
    {
      id: 5,
      title: 'JavaScript ES6 Advanced',
      instructor: 'Maximilian Schwarzmüller',
      category: 'Web Development',
      level: 'Advanced',
      is_free: true,
      rating: 4.9,
      students: 1876,
      duration: '32 hours',
      thumbnail: 'https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
      description: 'Deep dive into modern JavaScript features and best practices'
    },
    {
      id: 6,
      title: 'Business Strategy Fundamentals',
      instructor: 'Chris Haroun',
      category: 'Business',
      level: 'Beginner',
      is_free: true,
      rating: 4.5,
      students: 1543,
      duration: '15 hours',
      thumbnail: 'https://img.youtube.com/vi/SUcJXqQaW6o/maxresdefault.jpg',
      video_url: 'https://www.youtube.com/embed/SUcJXqQaW6o',
      description: 'Fundamental strategi bisnis untuk entrepreneur'
    }
  ];

  // Filter courses based on selected filters
  const courses = allCourses.filter(course => {
    if (selectedCategory && course.category !== selectedCategory) return false;
    if (selectedLevel && course.level !== selectedLevel) return false;
    return true;
  });

  const categories = ['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Business'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Top Banner Ads */}
        <div className="mb-8">
          <AdsSpace size="banner" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select
                    id="level-filter"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Semua Level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedLevel('');
                    }}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition"
                    title="Reset Filter"
                  >
                    <i className="fas fa-undo mr-2"></i>Reset Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-secondary">Daftar Kursus</h2>
              <p className="text-gray-600 mt-1">{courses.length} kursus ditemukan</p>
            </div>

            {courses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Kursus</h3>
                <p className="text-gray-500 mb-6">
                  Tidak ada kursus yang sesuai dengan filter Anda. Coba ubah filter atau reset.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedLevel('');
                  }}
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <i className="fas fa-undo mr-2"></i>
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {courses.slice(0, 4).map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                      <h3 className="font-bold text-secondary text-lg mb-3 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {course.description}
                      </p>
                      
                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Wide Horizontal Ads (4:1) between course listings */}
                {courses.length > 4 && (
                  <div className="mb-8">
                    <AdsSpace size="wide-horizontal" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {courses.slice(4).map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                      <h3 className="font-bold text-secondary text-lg mb-3 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {course.description}
                      </p>
                      
                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            {/* Ads Space */}
            <div className="mb-6">
              <AdsSpace size="square" />
            </div>

            {/* Kategori Populer */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="bg-primary text-white p-4 rounded-t-lg">
                <h3 className="font-semibold">Kategori Populer</h3>
              </div>
              <div className="p-4 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-primary transition">{category}</span>
                    <i className="fas fa-arrow-right text-gray-400 group-hover:text-primary transition"></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-3">
                <i className="fas fa-info-circle mr-2"></i>
                Informasi
              </h3>
              <p className="text-sm mb-4 opacity-90">
                Kursus-kursus berkualitas sedang disiapkan oleh tim kami. Pantau terus untuk update terbaru!
              </p>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-clock text-2xl"></i>
                </div>
                <p className="text-center text-sm font-semibold">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
