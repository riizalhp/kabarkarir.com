import React from 'react';

interface FooterProps {
    onNavigate: (view: 'admin' | 'terms' | 'privacy' | 'help' | 'aboutUs') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: '#' },
    { icon: 'fab fa-twitter', href: '#' },
    { icon: 'fab fa-instagram', href: '#' },
    { icon: 'fab fa-linkedin-in', href: '#' },
  ];

  const categoryLinks = ['BUMN', 'Swasta', 'Manufaktur', 'Oil & Gas', 'Palm Oil', 'Fresh Graduate'];
  const infoLinks = [
    { name: 'Tentang Kami', view: 'aboutUs' as const },
    { name: 'Blog & Artikel', view: null },
    { name: 'Event Rekrutmen', view: null },
    { name: 'Program Magang', view: null },
    { name: 'Info Beasiswa', view: null },
    { name: 'Kontak', view: null },
  ];
  
  const handleNavClick = (e: React.MouseEvent, view: 'admin' | 'terms' | 'privacy' | 'help' | 'aboutUs') => {
    e.preventDefault();
    onNavigate(view);
  };

  return (
    <footer className="bg-secondary text-white pt-12 pb-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <a href="#">
              <img src="https://myimgs.org/storage/images/10610/kabarkarirlogo-removebg-preview (1).png" alt="KabarKarir.com Logo" className="h-10 w-auto mb-4" />
            </a>
            <p className="text-gray-300 text-sm">Portal lowongan kerja terpercaya yang menghubungkan pencari kerja dengan perusahaan BUMN dan swasta di Indonesia.</p>
            <div className="mt-4 flex space-x-3">
              {socialLinks.map(link => (
                <a key={link.icon} href={link.href} className="bg-white bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent transition">
                  <i className={`${link.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Kategori Lowongan</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {categoryLinks.map(link => <li key={link}><a href="#" className="text-gray-300 hover:text-primary transition-colors">{link}</a></li>)}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {infoLinks.map(link => (
                  <li key={link.name}>
                    {link.view ? (
                      <a href="#" onClick={(e) => handleNavClick(e, link.view!)} className="text-gray-300 hover:text-primary transition-colors">{link.name}</a>
                    ) : (
                      <a href="#" className="text-gray-300 hover:text-primary transition-colors">{link.name}</a>
                    )}
                  </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 shrink-0"></i>
                <span>Jl. Persatuan 3 No.28, RT.07/RW.20, Demangan, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span>kabarkarir@outlook.com</span>
              </li>
            </ul>
            <div className="mt-5">
              <a href="#" className="bg-white text-primary py-2 px-4 rounded-full text-sm font-medium inline-flex items-center transition hover:bg-gray-200">
                <i className="fab fa-google-play mr-2"></i> Download App
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} KabarKarir.com. Hak Cipta Dilindungi.</p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-400">
            <a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="text-gray-300 hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="text-gray-300 hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" onClick={(e) => handleNavClick(e, 'help')} className="text-gray-300 hover:text-primary transition-colors">Bantuan</a>
            <a href="#" onClick={(e) => handleNavClick(e, 'admin')} className="text-gray-300 hover:text-primary transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;