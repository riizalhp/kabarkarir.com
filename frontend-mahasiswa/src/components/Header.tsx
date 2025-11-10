import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, MAIN_SITE_URL, LMS_SITE_URL, TELEGRAM_LINK, INSTAGRAM_LINK } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      {/* Top bar - Biru Dongker */}
      <div className="bg-secondary text-white py-1 px-4 text-xs hidden md:block">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center space-x-4">
            <span><i className="fas fa-envelope mr-1"></i> kabarkarir@outlook.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Search */}
      <div className="container mx-auto py-3 px-4">
        <div className="flex justify-between items-center flex-wrap">
          {/* Logo */}
          <Link to="/" className="flex items-center order-1">
            <i className="fas fa-graduation-cap text-3xl text-primary mr-2"></i>
            <div>
              <h1 className="text-xl font-bold text-secondary">{SITE_NAME}</h1>
              <p className="text-xs text-gray-500">Magang, Beasiswa & Peluang</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="w-full md:flex-1 md:mx-8 order-3 md:order-2 mt-3 md:mt-0">
            <div className="relative flex">
              <input 
                type="text" 
                placeholder="Cari magang, beasiswa, lomba, atau kata kunci" 
                className="w-full py-2.5 px-5 pl-12 focus:outline-none rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50" 
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          {/* Right-side actions - Favorit */}
          <div className="flex items-center space-x-4 order-2 md:order-3">
            <Link to="/favorit" className="hidden lg:flex items-center px-3 py-2 text-sm font-medium text-secondary hover:text-primary transition">
              <i className="fas fa-bookmark mr-1"></i>Favorit
            </Link>
            <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
              <i className="fas fa-bars text-xl text-secondary"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="bg-white border-t border-gray-200 hidden lg:block">
        <div className="container mx-auto flex justify-center items-center">
          <Link to="/" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Home
          </Link>
          <Link to="/magang" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Magang
          </Link>
          <Link to="/beasiswa" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Beasiswa
          </Link>
          <Link to="/lomba" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Lomba
          </Link>
          <Link to="/webinar" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Webinar
          </Link>
          <Link to="/freelance" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Freelance
          </Link>
          <Link to="/event-kampus" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Event Kampus
          </Link>
          <Link to="/blog" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Blog
          </Link>
          <Link to="/pasang-iklan" className="px-3 py-3 text-sm font-medium text-accent hover:text-orange-600 transition">
            Pasang Iklan
          </Link>
          <Link to="/komunitas" className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Komunitas
          </Link>
          <a href={MAIN_SITE_URL} className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Cari Kerja
          </a>
          <a href={LMS_SITE_URL} className="px-3 py-3 text-sm font-medium text-secondary hover:text-primary transition">
            Pelatihan
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed top-0 left-0 h-full w-3/4 bg-white z-50 shadow-lg p-5 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <Link to="/" onClick={toggleMenu} className="flex items-center">
            <i className="fas fa-graduation-cap text-2xl text-primary mr-2"></i>
            <span className="font-bold text-secondary">{SITE_NAME}</span>
          </Link>
          <button onClick={toggleMenu} className="focus:outline-none">
            <i className="fas fa-times text-xl text-secondary"></i>
          </button>
        </div>
        <div className="flex flex-col space-y-3">
          <Link to="/" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Home
          </Link>
          <Link to="/magang" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Magang
          </Link>
          <Link to="/beasiswa" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Beasiswa
          </Link>
          <Link to="/lomba" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Lomba
          </Link>
          <Link to="/webinar" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Webinar
          </Link>
          <Link to="/freelance" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Freelance
          </Link>
          <Link to="/event-kampus" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Event Kampus
          </Link>
          <Link to="/blog" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Blog
          </Link>
          <Link to="/favorit" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Favorit
          </Link>
          <Link to="/pasang-iklan" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-accent hover:text-orange-600">
            Pasang Iklan
          </Link>
          <Link to="/komunitas" onClick={toggleMenu} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Komunitas
          </Link>
          <a href={MAIN_SITE_URL} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Cari Kerja
          </a>
          <a href={LMS_SITE_URL} className="px-3 py-2 text-sm font-medium text-secondary hover:text-primary">
            Pelatihan
          </a>
        </div>
      </div>
      {isMenuOpen && (
        <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
    </header>
  );
};

export default Header;
