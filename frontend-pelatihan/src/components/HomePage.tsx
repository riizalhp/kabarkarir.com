import React from 'react';
import { Link } from 'react-router-dom';
import AdsSpace from './AdsSpace';

const HomePage: React.FC = () => {
  // Dummy courses data with YouTube videos
  const courses = [
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
    }
  ];
  
  const categories = ['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Business'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-secondary">Kategori Kursus Populer</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Web Development', icon: 'fa-code', link: '/courses?category=Web Development', bgColor: 'bg-blue-50', iconColor: 'text-primary', borderColor: 'border-primary' },
              { name: 'Data Science', icon: 'fa-chart-line', link: '/courses?category=Data Science', bgColor: 'bg-green-50', iconColor: 'text-green-600', borderColor: 'border-green-600' },
              { name: 'UI/UX Design', icon: 'fa-palette', link: '/courses?category=UI/UX Design', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'border-purple-600' },
              { name: 'Digital Marketing', icon: 'fa-bullhorn', link: '/courses?category=Digital Marketing', bgColor: 'bg-orange-50', iconColor: 'text-orange-600', borderColor: 'border-orange-600' },
              { name: 'Business', icon: 'fa-briefcase', link: '/courses?category=Business', bgColor: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'border-red-600' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-t-4 ${item.borderColor} group`}
              >
                <div className={`w-14 h-14 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                  <i className={`fas ${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <h3 className="font-semibold text-secondary text-sm">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary">Kursus Terbaru</h2>
                  <p className="text-gray-600 mt-1">Tingkatkan skill dengan kursus pilihan</p>
                </div>
                <Link
                  to="/courses"
                  className="bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80">
              {/* Ads Space - Square */}
              <div className="mb-6">
                <AdsSpace size="square" />
              </div>

              {/* Kategori Populer */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="bg-primary text-white p-4 rounded-t-lg">
                  <h3 className="font-semibold">Kategori Populer</h3>
                </div>
                <div className="p-4 space-y-2">
                  {courses.length === 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category}
                        to={`/courses?category=${category}`}
                        className="block p-3 rounded-lg hover:bg-blue-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 hover:text-primary transition text-sm">{category}</span>
                          <i className="fas fa-arrow-right text-gray-400 text-xs"></i>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">Memuat kategori...</p>
                  )}
                </div>
              </div>

              {/* Kursus Gratis */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="bg-green-600 text-white p-4 rounded-t-lg">
                  <h3 className="font-semibold">
                    <i className="fas fa-gift mr-2"></i>
                    Kursus Gratis
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {courses.filter(c => c.is_free).slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-start hover:bg-gray-50 p-2 rounded transition">
                        <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden shrink-0">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-green-600 transition-colors">
                            {course.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <i className="fas fa-star text-yellow-500 mr-1"></i>
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link
                      to="/courses?is_free=true"
                      className="text-green-600 text-sm font-medium hover:text-green-800"
                    >
                      Lihat semua kursus gratis
                    </Link>
                  </div>
                </div>
              </div>

              {/* Download App Banner */}
              <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg shadow p-6">
                <h3 className="font-bold mb-2">Download Aplikasi</h3>
                <p className="text-sm mb-4 opacity-90">
                  Akses lowongan kerja terbaru kapan saja dan di mana saja
                </p>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <i className="fab fa-google-play text-xl mr-2"></i>
                  <span className="font-semibold">Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
