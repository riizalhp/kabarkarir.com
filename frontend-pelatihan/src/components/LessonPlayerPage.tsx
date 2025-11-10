import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdsSpace from './AdsSpace';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  video_url: string;
  description: string;
  completed: boolean;
}

const LessonPlayerPage: React.FC = () => {
  const { courseSlug, lessonId } = useParams<{ courseSlug: string; lessonId: string }>();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile

  // Dummy course data dengan sections dan lessons
  const courseData = {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    sections: [
      {
        id: 1,
        title: 'Pengenalan Web Development',
        lessons: [
          {
            id: 1,
            title: 'Selamat Datang di Kursus',
            duration: '5:30',
            video_url: 'https://www.youtube.com/embed/qz0aGYrrlhU',
            description: 'Perkenalan kursus dan apa yang akan dipelajari',
            completed: true
          },
          {
            id: 2,
            title: 'Setup Development Environment',
            duration: '12:45',
            video_url: 'https://www.youtube.com/embed/nu_pCVPKzTk',
            description: 'Install tools yang diperlukan untuk development',
            completed: true
          },
          {
            id: 3,
            title: 'Cara Kerja Website',
            duration: '8:20',
            video_url: 'https://www.youtube.com/embed/erEgovG9WBs',
            description: 'Memahami bagaimana website bekerja',
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: 'HTML Fundamentals',
        lessons: [
          {
            id: 4,
            title: 'Pengenalan HTML',
            duration: '10:15',
            video_url: 'https://www.youtube.com/embed/UB1O30fR-EE',
            description: 'Dasar-dasar HTML dan struktur dokumen',
            completed: false
          },
          {
            id: 5,
            title: 'HTML Tags & Elements',
            duration: '15:30',
            video_url: 'https://www.youtube.com/embed/salY_Sm6mv4',
            description: 'Mempelajari berbagai tag dan elemen HTML',
            completed: false
          },
          {
            id: 6,
            title: 'HTML Forms',
            duration: '18:45',
            video_url: 'https://www.youtube.com/embed/fNcJuPIZ2WE',
            description: 'Membuat form interaktif dengan HTML',
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: 'CSS Styling',
        lessons: [
          {
            id: 7,
            title: 'Pengenalan CSS',
            duration: '9:30',
            video_url: 'https://www.youtube.com/embed/1PnVor36_40',
            description: 'Dasar-dasar CSS dan styling',
            completed: false
          },
          {
            id: 8,
            title: 'CSS Flexbox',
            duration: '20:15',
            video_url: 'https://www.youtube.com/embed/JJSoEo8JSnc',
            description: 'Layout dengan Flexbox',
            completed: false
          },
          {
            id: 9,
            title: 'CSS Grid',
            duration: '22:30',
            video_url: 'https://www.youtube.com/embed/EFafSYg-PkI',
            description: 'Layout dengan CSS Grid',
            completed: false
          }
        ]
      }
    ]
  };

  // Find current lesson
  const findCurrentLesson = (): Lesson | null => {
    for (const section of courseData.sections) {
      const found = section.lessons.find(l => l.id === Number(lessonId));
      if (found) return found;
    }
    return null;
  };
  
  const currentLesson = findCurrentLesson();

  // Calculate progress
  const totalLessons = courseData.sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const completedLessons = courseData.sections.reduce(
    (acc, section) => acc + section.lessons.filter(l => l.completed).length, 0
  );
  const progress = Math.round((completedLessons / totalLessons) * 100);

  const handleLessonClick = (lesson: Lesson) => {
    navigate(`/learn/${courseSlug}/${lesson.id}`);
  };

  const handleMarkComplete = () => {
    // In real app, this would update the backend
    alert('Lesson ditandai selesai!');
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson tidak ditemukan</h2>
          <button
            onClick={() => navigate('/courses')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Kursus
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Navigation - Fixed */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b-2 border-primary shadow-xl fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/courses/${courseSlug}`)}
              className="flex items-center gap-2 text-white hover:text-primary transition bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700"
            >
              <i className="fas fa-arrow-left"></i>
              <span className="hidden sm:inline font-medium">Kembali</span>
            </button>
            <div className="border-l-2 border-gray-700 pl-3">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-play-circle text-primary text-sm"></i>
                <h1 className="text-white font-bold text-sm md:text-base line-clamp-1">
                  {currentLesson.title}
                </h1>
              </div>
              <p className="text-gray-400 text-xs flex items-center gap-2">
                <i className="fas fa-book text-xs"></i>
                {courseData.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <i className="fas fa-chart-line text-primary"></i>
              <span className="text-sm text-gray-300">Progress:</span>
              <span className="font-bold text-white">{progress}%</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-primary transition bg-gray-800 p-2 rounded-lg"
              title={isSidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
            >
              <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container - with top padding for fixed header */}
      <div className="pt-[65px] bg-gray-900 flex min-h-screen">
        {/* Sidebar - Course Curriculum */}
        <aside
          className={`fixed lg:sticky left-0 top-[65px] lg:top-[65px] h-[calc(100vh-65px)] w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto transition-transform duration-300 z-40 lg:z-auto flex flex-col ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2 text-white text-sm">
              <span>Progress Kursus</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {completedLessons} dari {totalLessons} lesson selesai
            </div>
          </div>

          {/* Curriculum List */}
          <div className="p-4 flex-1">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <i className="fas fa-list mr-2"></i>
              Kurikulum Kursus
            </h3>

            {courseData.sections.map((section, sectionIndex) => (
              <div key={section.id} className="mb-4">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
                  {sectionIndex + 1}. {section.title}
                </div>
                <div className="bg-gray-750">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-700 hover:bg-gray-600 transition ${
                        lesson.id === Number(lessonId) ? 'bg-gray-600 border-l-4 border-l-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {lesson.completed ? (
                            <i className="fas fa-check-circle text-green-500"></i>
                          ) : lesson.id === Number(lessonId) ? (
                            <i className="fas fa-play-circle text-primary"></i>
                          ) : (
                            <i className="far fa-circle text-gray-500"></i>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium mb-1 line-clamp-2">
                            {lessonIndex + 1}. {lesson.title}
                          </div>
                          <div className="text-gray-400 text-xs flex items-center gap-2">
                            <span><i className="fas fa-clock mr-1"></i>{lesson.duration}</span>
                            {lesson.completed && (
                              <span className="text-green-500">
                                <i className="fas fa-check mr-1"></i>Selesai
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="p-4 border-t border-gray-700">
            <button className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition font-medium">
              <i className="fas fa-sticky-note mr-2"></i>
              Tambah Catatan
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Video Container */}
          <div className="bg-black">
            <div className="aspect-video">
              <iframe
                src={currentLesson.video_url}
                title={currentLesson.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Ads Banner Below Video */}
          <div className="bg-gray-800 p-4">
            <AdsSpace size="horizontal" />
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-800 text-white p-6">
            <div className="max-w-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span><i className="fas fa-clock mr-1"></i>{currentLesson.duration}</span>
                    <span>
                      <i className={`fas ${currentLesson.completed ? 'fa-check-circle text-green-500' : 'fa-circle text-gray-600'} mr-1`}></i>
                      {currentLesson.completed ? 'Selesai' : 'Belum Selesai'}
                    </span>
                  </div>
                </div>
                {!currentLesson.completed && (
                  <button
                    onClick={handleMarkComplete}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    <i className="fas fa-check mr-2"></i>
                    Tandai Selesai
                  </button>
                )}
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-2">Tentang Lesson Ini</h3>
                <p className="text-gray-300 leading-relaxed">{currentLesson.description}</p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition font-medium">
                  <i className="fas fa-chevron-left mr-2"></i>
                  Lesson Sebelumnya
                </button>
                <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                  Lesson Selanjutnya
                  <i className="fas fa-chevron-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default LessonPlayerPage;
