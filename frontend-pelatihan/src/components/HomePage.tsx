import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Tingkatkan Skill Anda dengan Kursus Online
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Pelajari skill baru dari instruktur terbaik. Akses ribuan video pembelajaran, dapatkan sertifikat, dan raih karir impian Anda.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/courses"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold text-lg hover:shadow-xl transition shadow-lg"
            >
              <i className="fas fa-graduation-cap mr-2"></i>
              Jelajahi Kursus
            </Link>
            <Link
              to="/courses?is_free=true"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition"
            >
              <i className="fas fa-gift mr-2"></i>
              Kursus Gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-105 transition">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-secondary font-medium">Kursus Online</div>
            </div>
            <div className="group hover:scale-105 transition">
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-secondary font-medium">Siswa Aktif</div>
            </div>
            <div className="group hover:scale-105 transition">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-secondary font-medium">Instruktur Expert</div>
            </div>
            <div className="group hover:scale-105 transition">
              <div className="text-4xl font-bold text-accent mb-2">30K+</div>
              <div className="text-secondary font-medium">Sertifikat Diterbitkan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Kategori Kursus Populer</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Web Development', icon: 'fa-code', bgColor: 'bg-blue-50', iconColor: 'text-primary', borderColor: 'border-primary' },
              { name: 'Data Science', icon: 'fa-chart-line', bgColor: 'bg-green-50', iconColor: 'text-green-600', borderColor: 'border-green-600' },
              { name: 'UI/UX Design', icon: 'fa-palette', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'border-purple-600' },
              { name: 'Digital Marketing', icon: 'fa-bullhorn', bgColor: 'bg-orange-50', iconColor: 'text-accent', borderColor: 'border-accent' },
              { name: 'Business', icon: 'fa-briefcase', bgColor: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'border-red-600' },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/courses?category=${encodeURIComponent(category.name)}`}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-t-4 ${category.borderColor} group`}
              >
                <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}>
                  <i className={`fas ${category.icon} text-3xl ${category.iconColor}`}></i>
                </div>
                <h3 className="font-semibold text-secondary">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Mengapa Belajar di KabarKarir Learn?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-light p-8 rounded-xl shadow-md hover:shadow-xl transition text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <i className="fas fa-video text-3xl text-primary"></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-secondary">Video HD Berkualitas</h3>
              <p className="text-gray-600">
                Akses video pembelajaran HD dari instruktur berpengalaman kapan saja, di mana saja.
              </p>
            </div>
            <div className="bg-light p-8 rounded-xl shadow-md hover:shadow-xl transition text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <i className="fas fa-certificate text-3xl text-green-600"></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-secondary">Sertifikat Resmi</h3>
              <p className="text-gray-600">
                Dapatkan sertifikat setelah menyelesaikan kursus untuk meningkatkan kredibilitas Anda.
              </p>
            </div>
            <div className="bg-light p-8 rounded-xl shadow-md hover:shadow-xl transition text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <i className="fas fa-infinity text-3xl text-purple-600"></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-secondary">Akses Selamanya</h3>
              <p className="text-gray-600">
                Beli sekali, akses selamanya. Belajar dengan kecepatan Anda sendiri tanpa batas waktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Memulai Perjalanan Belajar Anda?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Bergabung dengan ribuan siswa lainnya yang sudah meningkatkan skill dan meraih karir impian mereka.
          </p>
          <Link
            to="/courses"
            className="bg-white text-primary px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition inline-block shadow-xl"
          >
            <i className="fas fa-rocket mr-2"></i>
            Mulai Belajar Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
