import * as React from 'react';

type AdminSection = 'dashboard' | 'jobs' | 'companies' | 'articles' | 'events' | 'misi' | 'analytics' | 'settings' | 'majors' | 'tags' | 'pelatihan' | 'users';

interface AdminLayoutProps {
  currentSection: AdminSection;
  onNavigateHome: () => void;
  onLogout?: () => void;
  children: React.ReactNode;
}

const NavItem: React.FC<{
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}> = ({ icon, label, href, isActive }) => {
  return (
    <a
      href={href}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-white shadow-md' 
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <i className={`${icon} w-5 text-center`}></i>
      <span className="font-medium">{label}</span>
    </a>
  );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ currentSection, onNavigateHome, onLogout, children }) => {
  
  const getSectionTitle = () => {
    switch(currentSection) {
        case 'dashboard': return 'Dashboard';
        case 'jobs': return 'Manajemen Lowongan';
        case 'companies': return 'Manajemen Perusahaan';
        case 'majors': return 'Manajemen Jurusan Kuliah';
        case 'tags': return 'Manajemen Tags';
        case 'articles': return 'Manajemen Artikel';
        case 'events': return 'Manajemen Event';
        case 'misi': return 'Manajemen Misi Cuan';
        case 'pelatihan': return 'Manajemen Info Pelatihan';
        case 'analytics': return 'Analytics & Laporan';
        case 'users': return 'Manajemen Pengguna Admin';
        case 'settings': return 'Pengaturan Sistem';
        default: return 'Admin Panel';
    }
  };

  const navItems: { icon: string; label: string; href: string; sectionName: AdminSection }[] = [
    { icon: 'fas fa-tachometer-alt', label: 'Dashboard', href: '/admin', sectionName: 'dashboard' },
    { icon: 'fas fa-briefcase', label: 'Lowongan', href: '/admin/lowongan', sectionName: 'jobs' },
    { icon: 'fas fa-building', label: 'Perusahaan', href: '/admin/perusahaan', sectionName: 'companies' },
    { icon: 'fas fa-graduation-cap', label: 'Jurusan', href: '/admin/jurusan', sectionName: 'majors' },
    { icon: 'fas fa-tags', label: 'Tags', href: '/admin/tags', sectionName: 'tags' },
    { icon: 'fas fa-newspaper', label: 'Artikel', href: '/admin/artikel', sectionName: 'articles' },
    { icon: 'fas fa-calendar-alt', label: 'Event', href: '/admin/event', sectionName: 'events' },
    { icon: 'fas fa-coins', label: 'Misi Cuan', href: '/admin/misi', sectionName: 'misi' },
    { icon: 'fas fa-book-open', label: 'Pelatihan', href: '/admin/pelatihan', sectionName: 'pelatihan' },
    { icon: 'fas fa-chart-line', label: 'Analytics', href: '/admin/analytics', sectionName: 'analytics' },
    { icon: 'fas fa-users-cog', label: 'Admin', href: '/admin/pengguna', sectionName: 'users' },
    { icon: 'fas fa-cogs', label: 'Pengaturan', href: '/admin/pengaturan', sectionName: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-poppins text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex flex-col shrink-0 overflow-hidden">
        <div className="flex items-center justify-center p-4 border-b border-slate-700 h-16 shrink-0">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {navItems.map(item => (
            <NavItem 
              key={item.sectionName} 
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.sectionName === currentSection}
            />
          ))}
        </nav>
        <div className="p-2 border-t border-slate-700 shrink-0 space-y-1">
          <button
            onClick={onNavigateHome}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <i className="fas fa-globe w-5 text-center"></i>
            <span className="font-medium text-sm">Lihat Situs</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center h-16 shrink-0">
          <h2 className="text-xl font-bold text-secondary">{getSectionTitle()}</h2>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
