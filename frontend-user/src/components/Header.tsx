import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { NavLink } from '../types';
import { slugify } from '../utils/slugify';

interface HeaderProps {
  onNavigate: (view: 'home' | 'blog' | 'jobCategory' | 'companyList' | 'misiCuan' | 'pasangIklan' | 'joinTelegram' | 'pasangIklanOnGoing' | 'eventRecruitment' | 'favorites' | 'search', category?: string) => void;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
 const handleNavClick = (e: React.MouseEvent, view: 'home' | 'blog' | 'jobCategory' | 'companyList' | 'misiCuan' | 'pasangIklan' | 'joinTelegram' | 'pasangIklanOnGoing' | 'eventRecruitment' | 'favorites', data?: string) => {
    e.preventDefault();
    onNavigate(view, data);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const NavItem: React.FC<{ link: NavLink; className?: string }> = ({ link, className }) => {
    const categoryLinks = ['MT/ODP', 'BUMN', 'Fresh Grad', 'Intern'];
    
    let view: 'home' | 'blog' | 'jobCategory' | 'companyList' | 'misiCuan' | 'pasangIklan' | 'joinTelegram' | 'pasangIklanOnGoing' | 'eventRecruitment' | 'favorites' = 'jobCategory';
    let data: string | undefined = undefined;

    const linkNameLower = link.name.toLowerCase();

    if (linkNameLower === 'home') {
        view = 'home';
    } else if (linkNameLower === 'blog') {
        view = 'blog';
    } else if (linkNameLower === 'event') {
        view = 'eventRecruitment';
    } else if (linkNameLower === 'misi cuan') {
        view = 'misiCuan';
    } else if (linkNameLower === 'pasang iklan') {
        view = 'pasangIklanOnGoing';
    } else if (linkNameLower === 'komunitas') {
        view = 'joinTelegram';
    } else if (linkNameLower === 'favorit') {
        view = 'favorites';
    } else if (link.name === 'Instansi') {
        view = 'companyList';
        data = undefined;
    } else if (categoryLinks.includes(link.name)) {
        view = 'jobCategory';
        data = link.name;
    }
    
    return (
      <a
        href={link.href}
        onClick={(e) => handleNavClick(e, view, data)}
        className={`px-3 py-2 text-sm font-medium ${
          link.isSpecial ? 'text-accent' : 'text-secondary'
        } hover:text-primary flex items-center transition-colors ${className}`}
      >
        {link.icon && <i className={`${link.icon} mr-1`}></i>}
        {link.name}
      </a>
    );
  }


  const favoritLink = NAV_LINKS.find(link => link.name === 'Favorit');

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top bar */}
      <div className="bg-secondary text-white py-1 px-4 text-xs hidden md:block">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center space-x-4">
            <span><i className="fas fa-envelope mr-1"></i> kabarkarir@outlook.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="hover:text-accent"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-accent"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-accent"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-accent"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Search */}
      <div className="container mx-auto py-3 px-4">
        <div className="flex justify-between items-center flex-wrap">
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center order-1">
            <img src="https://myimgs.org/storage/images/10610/kabarkarirlogo-removebg-preview (1).png" alt="KabarKarir.com Logo" className="h-10 w-auto" />
          </a>

          {/* Search bar */}
          <div className="w-full md:flex-1 md:mx-8 order-3 md:order-2 mt-3 md:mt-0">
            <div className="relative flex">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    onNavigate('search', searchQuery.trim());
                  }
                }}
                placeholder="Cari lowongan, perusahaan, atau kata kunci" 
                className="w-full py-2.5 px-5 pl-12 focus:outline-none rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50" 
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    onNavigate('search', searchQuery.trim());
                  }
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer"
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    if (onSearch) {
                      onSearch('');
                    }
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
          
          {/* Right-side actions */}
          <div className="flex items-center space-x-4 order-2 md:order-3">
            {favoritLink && <div className="hidden lg:block"><NavItem link={favoritLink} /></div>}
            <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
              <i className="fas fa-bars text-xl text-secondary"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="bg-white border-t border-gray-200 hidden lg:block">
          <div className="container mx-auto flex justify-center items-center">
            {NAV_LINKS.filter(link => link.name !== 'Favorit').map(link => <NavItem key={link.name} link={link} className="py-3" />)}
          </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed top-0 left-0 h-full w-3/4 bg-white z-50 shadow-lg p-5 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
           <a href="#" onClick={(e) => handleNavClick(e, 'home')}>
            <img src="https://myimgs.org/storage/images/10610/kabarkarirlogo-removebg-preview (1).png" alt="KabarKarir.com Logo" className="h-8 w-auto" />
           </a>
          <button onClick={toggleMenu} className="focus:outline-none">
            <i className="fas fa-times text-xl text-secondary"></i>
          </button>
        </div>
        <div className="flex flex-col space-y-3">
          {NAV_LINKS.map(link => <NavItem key={link.name} link={link} />)}
        </div>
      </div>
      {isMenuOpen && (
        <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
    </header>
  );
};

export default Header;