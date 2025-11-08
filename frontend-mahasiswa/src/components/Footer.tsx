import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, TELEGRAM_LINK, INSTAGRAM_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <i className="fas fa-graduation-cap text-2xl text-primary"></i>
              <h3 className="text-lg font-bold">{SITE_NAME}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Platform terlengkap untuk mahasiswa Indonesia menemukan magang, beasiswa, lomba, webinar, dan peluang karir.
            </p>
            <div className="flex gap-3">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Peluang */}
          <div>
            <h4 className="font-bold mb-4 text-white">Peluang</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/magang" className="hover:text-primary transition">Magang</Link></li>
              <li><Link to="/beasiswa" className="hover:text-primary transition">Beasiswa</Link></li>
              <li><Link to="/lomba" className="hover:text-primary transition">Lomba</Link></li>
              <li><Link to="/webinar" className="hover:text-primary transition">Webinar</Link></li>
              <li><Link to="/freelance" className="hover:text-primary transition">Freelance</Link></li>
              <li><Link to="/event-kampus" className="hover:text-primary transition">Event Kampus</Link></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-bold mb-4 text-white">Layanan</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/konsul-karir" className="hover:text-primary transition">Konsultasi Karir</Link></li>
              <li><Link to="/bangun-cv" className="hover:text-primary transition">Bangun CV</Link></li>
              <li><Link to="/misi-cuan" className="hover:text-primary transition">Misi Cuan</Link></li>
              <li><Link to="/pasang-iklan" className="hover:text-primary transition">Pasang Iklan</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition">Blog Artikel</Link></li>
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="font-bold mb-4 text-white">Tentang</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/komunitas" className="hover:text-primary transition">Komunitas</Link></li>
              <li><a href="https://kabarkarir.com" className="hover:text-primary transition">Karir</a></li>
              <li><a href="https://learn.kabarkarir.com" className="hover:text-primary transition">Pelatihan</a></li>
              <li><a href="https://admin.kabarkarir.com" className="hover:text-primary transition">Admin</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
