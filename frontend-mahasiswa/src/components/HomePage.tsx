import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Platform Lengkap untuk Mahasiswa Indonesia
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Temukan Magang, Beasiswa, Lomba, Webinar, Freelance & Peluang Karir Terbaik
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/magang" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition shadow-lg">
              Cari Magang
            </Link>
            <Link to="/beasiswa" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition">
              Lihat Beasiswa
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Jelajahi Peluang</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Magang', icon: 'fa-briefcase', link: '/magang', bgColor: 'bg-blue-50', iconColor: 'text-primary', borderColor: 'border-primary' },
              { name: 'Beasiswa', icon: 'fa-graduation-cap', link: '/beasiswa', bgColor: 'bg-green-50', iconColor: 'text-green-500', borderColor: 'border-green-500' },
              { name: 'Lomba', icon: 'fa-trophy', link: '/lomba', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-500', borderColor: 'border-yellow-500' },
              { name: 'Webinar', icon: 'fa-video', link: '/webinar', bgColor: 'bg-purple-50', iconColor: 'text-purple-500', borderColor: 'border-purple-500' },
              { name: 'Freelance', icon: 'fa-laptop', link: '/freelance', bgColor: 'bg-red-50', iconColor: 'text-red-500', borderColor: 'border-red-500' },
              { name: 'Event Kampus', icon: 'fa-calendar', link: '/event-kampus', bgColor: 'bg-pink-50', iconColor: 'text-pink-500', borderColor: 'border-pink-500' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-t-4 ${item.borderColor} group`}
              >
                <div className={`w-14 h-14 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                  <i className={`fas ${item.icon} text-2xl ${item.iconColor}`}></i>
                </div>
                <h3 className="font-semibold text-secondary">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Karir Impianmu?</h2>
          <p className="text-xl mb-8 opacity-90">Bergabung dengan ribuan mahasiswa yang sudah memulai perjalanan karir mereka</p>
          <Link to="/komunitas" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition inline-block shadow-lg">
            <i className="fas fa-users mr-2"></i>
            Join Komunitas Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
