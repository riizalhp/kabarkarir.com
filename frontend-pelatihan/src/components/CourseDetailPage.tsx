import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdsSpace from './AdsSpace';

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  price: number;
  is_free: boolean;
  rating: number;
  students: number;
  duration: string;
  thumbnail: string;
  video_url: string;
  description: string;
}

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Dummy data (same as in CoursesPage)
  const allCourses: Course[] = [
    {
      id: 1,
      title: "Web Development Bootcamp 2024",
      instructor: "Budi Santoso",
      category: "Web Development",
      level: "Pemula",
      price: 0,
      is_free: true,
      rating: 4.8,
      students: 1250,
      duration: "12 jam",
      thumbnail: "https://img.youtube.com/vi/nu_pCVPKzTk/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/nu_pCVPKzTk",
      description: "Pelajari web development dari dasar hingga mahir. Mulai dari HTML, CSS, JavaScript hingga React dan Node.js."
    },
    {
      id: 2,
      title: "Python untuk Data Science",
      instructor: "Siti Nurhaliza",
      category: "Data Science",
      level: "Menengah",
      price: 0,
      is_free: true,
      rating: 4.9,
      students: 2100,
      duration: "8 jam",
      thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/_uQrJ0TkZlc",
      description: "Menguasai Python untuk analisis data, visualisasi, dan machine learning dasar dengan praktik langsung."
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Ahmad Fauzi",
      category: "UI/UX Design",
      level: "Pemula",
      price: 0,
      is_free: true,
      rating: 4.7,
      students: 890,
      duration: "10 jam",
      thumbnail: "https://img.youtube.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/c9Wg6Cb_YlU",
      description: "Pelajari prinsip desain UI/UX, wireframing, prototyping dengan Figma dari desainer berpengalaman."
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "Rina Wijaya",
      category: "Digital Marketing",
      level: "Pemula",
      price: 0,
      is_free: true,
      rating: 4.6,
      students: 1560,
      duration: "6 jam",
      thumbnail: "https://img.youtube.com/vi/nU-IIXBWlS4/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/nU-IIXBWlS4",
      description: "Strategi digital marketing lengkap: SEO, SEM, Social Media Marketing, dan Content Marketing."
    },
    {
      id: 5,
      title: "JavaScript Modern: ES6 dan Beyond",
      instructor: "Doni Prakoso",
      category: "Web Development",
      level: "Menengah",
      price: 0,
      is_free: true,
      rating: 4.8,
      students: 980,
      duration: "9 jam",
      thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/PkZNo7MFNFg",
      description: "Dalami JavaScript modern dengan ES6+, async/await, promises, dan best practices development."
    },
    {
      id: 6,
      title: "Business Strategy Fundamentals",
      instructor: "Mega Sari",
      category: "Business",
      level: "Pemula",
      price: 0,
      is_free: true,
      rating: 4.5,
      students: 1320,
      duration: "7 jam",
      thumbnail: "https://img.youtube.com/vi/YJjsfrD4k-s/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/YJjsfrD4k-s",
      description: "Pelajari fundamental strategi bisnis, analisis kompetitor, dan cara membuat business plan yang efektif."
    },
    {
      id: 7,
      title: "React.js Complete Guide",
      instructor: "Agus Prasetyo",
      category: "Web Development",
      level: "Menengah",
      price: 0,
      is_free: true,
      rating: 4.9,
      students: 1450,
      duration: "15 jam",
      thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/Ke90Tje7VS0",
      description: "Pelajari React.js dari dasar hingga advanced, termasuk hooks, context API, dan Redux."
    },
    {
      id: 8,
      title: "Machine Learning with Python",
      instructor: "Dr. Linda Wijaya",
      category: "Data Science",
      level: "Lanjutan",
      price: 0,
      is_free: true,
      rating: 4.8,
      students: 890,
      duration: "20 jam",
      thumbnail: "https://img.youtube.com/vi/7eh4d6sabA0/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/7eh4d6sabA0",
      description: "Implementasi machine learning dengan Python, scikit-learn, dan TensorFlow untuk berbagai kasus."
    },
    {
      id: 9,
      title: "Figma for Beginners",
      instructor: "Rizki Maulana",
      category: "UI/UX Design",
      level: "Pemula",
      price: 0,
      is_free: true,
      rating: 4.6,
      students: 1200,
      duration: "8 jam",
      thumbnail: "https://img.youtube.com/vi/FTFaQWZBqQ8/maxresdefault.jpg",
      video_url: "https://www.youtube.com/embed/FTFaQWZBqQ8",
      description: "Kuasai Figma dari nol, tools design modern untuk membuat prototype dan mockup profesional."
    }
  ];

  const course = allCourses.find(c => c.id === Number(slug));

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-secondary mb-4">Kursus Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6">Maaf, kursus yang Anda cari tidak tersedia.</p>
        <Link to="/courses" className="text-primary hover:underline">
          ← Kembali ke Daftar Kursus
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-200 mb-4 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali
          </button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/20 text-white text-sm px-3 py-1 rounded">
                {course.category}
              </span>
              <span className="bg-white/20 text-white text-sm px-3 py-1 rounded">
                {course.level}
              </span>
              <span className="bg-green-500 text-white text-sm px-3 py-1 rounded font-semibold">
                <i className="fas fa-gift mr-1"></i>GRATIS
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {course.title}
            </h1>
            
            <p className="text-lg mb-4 text-gray-100">
              {course.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center">
                <i className="fas fa-user mr-2"></i>
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                <span className="font-semibold mr-1">{course.rating}</span>
                <span className="text-gray-200">({course.students} siswa)</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="aspect-video bg-gray-900">
                <iframe
                  src={course.video_url}
                  title={course.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-secondary mb-4">Tentang Kursus</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {course.description}
              </p>
              
              <h3 className="text-xl font-bold text-secondary mb-3 mt-6">Yang Akan Anda Pelajari</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-600">Memahami konsep dasar hingga lanjutan</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-600">Praktik langsung dengan project nyata</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-600">Tips dan best practices dari instruktur</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-600">Sertifikat setelah menyelesaikan kursus</span>
                </li>
              </ul>
            </div>

            {/* Wide Horizontal Ads (4:1) */}
            <div className="mb-8">
              <AdsSpace size="wide-horizontal" />
            </div>

            {/* Kursus Lain yang Relevan */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-secondary mb-6">Kursus Lain yang Relevan</h2>
              <div className="space-y-4">
                {allCourses
                  .filter(c => c.id !== course.id && c.category === course.category)
                  .slice(0, 3)
                  .map((relatedCourse) => (
                    <Link
                      key={relatedCourse.id}
                      to={`/courses/${relatedCourse.id}`}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition group"
                    >
                      <div className="w-24 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <i className="fas fa-play-circle text-3xl text-primary group-hover:scale-110 transition"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-secondary text-sm line-clamp-2 group-hover:text-primary transition mb-1">
                          {relatedCourse.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                          {relatedCourse.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <i className="fas fa-clock mr-1"></i>
                            {relatedCourse.duration}
                          </span>
                          <span className="flex items-center">
                            <i className="fas fa-star text-yellow-500 mr-1"></i>
                            {relatedCourse.rating}
                          </span>
                          <span className="flex items-center">
                            <i className="fas fa-users mr-1"></i>
                            {relatedCourse.students}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              
              {allCourses.filter(c => c.id !== course.id && c.category === course.category).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-search text-3xl mb-3"></i>
                  <p>Belum ada kursus relevan lainnya</p>
                </div>
              )}
              
              <Link
                to="/courses"
                className="block mt-6 text-center text-primary hover:text-blue-700 font-medium"
              >
                Lihat Semua Kursus <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  <i className="fas fa-gift mr-2"></i>GRATIS
                </div>
                <p className="text-sm text-gray-500">Akses pembelajaran tanpa batas</p>
              </div>

              <Link
                to={`/learn/${course.id}/1`}
                className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 text-center"
              >
                <i className="fas fa-play mr-2"></i>
                Mulai Belajar Sekarang
              </Link>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <i className="fas fa-clock text-primary mr-2"></i>
                    Durasi
                  </span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <i className="fas fa-signal text-primary mr-2"></i>
                    Level
                  </span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <i className="fas fa-users text-primary mr-2"></i>
                    Siswa
                  </span>
                  <span className="font-semibold">{course.students} siswa</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <i className="fas fa-certificate text-primary mr-2"></i>
                    Sertifikat
                  </span>
                  <span className="font-semibold">Ya</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="font-bold text-secondary mb-3">Kursus ini termasuk:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    Video pembelajaran berkualitas
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    Materi downloadable
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    Akses selamanya
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    Akses di mobile dan TV
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    Sertifikat penyelesaian
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
