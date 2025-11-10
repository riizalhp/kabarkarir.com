import React from 'react';
import { Link } from 'react-router-dom';
import { TELEGRAM_LINK, INSTAGRAM_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-graduation-cap text-2xl text-primary"></i>
              <h3 className="text-white font-bold text-lg">KabarKarir Learn</h3>
            </div>
            <p className="text-sm mb-4">
              Platform pembelajaran online terbaik di Indonesia. Tingkatkan skill Anda dengan kursus berkualitas dan dapatkan sertifikat.
            </p>
            <div className="flex space-x-3">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Kursus */}
          <div>
            <h4 className="text-white font-bold mb-4">Kursus</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses?category=Web+Development" className="hover:text-primary transition">Web Development</Link>
              </li>
              <li>
                <Link to="/courses?category=Data+Science" className="hover:text-primary transition">Data Science</Link>
              </li>
              <li>
                <Link to="/courses?category=UI/UX+Design" className="hover:text-primary transition">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/courses?category=Digital+Marketing" className="hover:text-primary transition">Digital Marketing</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-primary transition">Lihat Semua Kursus</Link>
              </li>
            </ul>
          </div>

          {/* Fitur */}
          <div>
            <h4 className="text-white font-bold mb-4">Fitur</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/my-learning" className="hover:text-primary transition">Pembelajaran Saya</Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-primary transition">Sertifikat</Link>
              </li>
              <li>
                <Link to="/courses?level=beginner" className="hover:text-primary transition">Kursus Pemula</Link>
              </li>
              <li>
                <Link to="/courses?is_free=true" className="hover:text-primary transition">Kursus Gratis</Link>
              </li>
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="text-white font-bold mb-4">Lainnya</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/komunitas" className="hover:text-primary transition">Komunitas</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition">Blog & Artikel</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">Tentang Kami</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">Hubungi Kami</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 KabarKarir.com - Platform Karir & Pembelajaran Terpercaya Indonesia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
