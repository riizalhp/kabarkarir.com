import * as React from 'react';
import AdminDashboard from './sections/AdminDashboard';
import AdminJobs from './sections/AdminJobs';
import AdminCompanies from './sections/AdminCompanies';
import AdminArticles from './sections/AdminArticles';
import AdminEvents from './sections/AdminEvents';
import AdminMisi from './sections/AdminMisi';
import AdminAnalytics from './sections/AdminAnalytics';
import AdminSettings from './sections/AdminSettings';
import AdminMajors from './sections/AdminMajors';
import AdminTags from './sections/AdminTags';
// import AdminPreviewPage from './AdminPreviewPage'; // Disabled temporarily
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, PelatihanInfo, Major, MisiSubmission, AdminUser, Tag, Activity } from '../types';
import AdminPelatihan from './sections/AdminPelatihan';
import AdminUsers from './sections/AdminUsers';
import { INITIAL_ADMIN_USERS } from '../constants';

type PreviewableItem = 'job' | 'company' | 'article' | 'event' | 'misi' | 'misiSubmissionForm';

interface AdminPageProps {
  onNavigateHome: () => void;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  companies: CompanyProfile[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProfile[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  events: RecruitmentEvent[];
  setEvents: React.Dispatch<React.SetStateAction<RecruitmentEvent[]>>;
  misiOffers: MisiCuanOffer[];
  setMisiOffers: React.Dispatch<React.SetStateAction<MisiCuanOffer[]>>;
  misiSubmissions: MisiSubmission[];
  setMisiSubmissions: React.Dispatch<React.SetStateAction<MisiSubmission[]>>;
  courses: PelatihanInfo[];
  setCourses: React.Dispatch<React.SetStateAction<PelatihanInfo[]>>;
  majors: Major[];
  setMajors: React.Dispatch<React.SetStateAction<Major[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  allCompaniesWithCount: CompanyProfile[];
  recentActivities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

type AdminSection = 'dashboard' | 'jobs' | 'companies' | 'articles' | 'events' | 'misi' | 'analytics' | 'settings' | 'majors' | 'tags' | 'pelatihan' | 'users';

const NavItem: React.FC<{
  icon: string;
  label: string;
  sectionName: AdminSection;
  currentSection: AdminSection;
  setSection: (section: AdminSection) => void;
}> = ({ icon, label, sectionName, currentSection, setSection }) => {
  const isActive = sectionName === currentSection;
  return (
    <button
      onClick={() => setSection(sectionName)}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
        isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-primary/50 hover:text-white'
      }`}
    >
      <i className={`${icon} w-5 text-center`}></i>
      <span className="font-medium">{label}</span>
    </button>
  );
};

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const {
    onNavigateHome,
    jobs, setJobs,
    companies, setCompanies,
    blogPosts, setBlogPosts,
    events, setEvents,
    misiOffers, setMisiOffers,
    misiSubmissions, setMisiSubmissions,
    courses, setCourses,
    majors, setMajors,
    tags, setTags,
    allCompaniesWithCount,
    recentActivities,
    addActivity,
  } = props;

  const [section, setSection] = React.useState<AdminSection>('dashboard');
  const [users, setUsers] = React.useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [previewData, setPreviewData] = React.useState<{ type: PreviewableItem; data: any } | null>(null);

  const handleShowPreview = (type: PreviewableItem, data: any) => {
    setPreviewData({ type, data });
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };


  const getSectionTitle = () => {
    switch(section) {
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

  const renderSection = () => {
    switch (section) {
      case 'dashboard': return <AdminDashboard 
                                recentActivities={recentActivities} 
                                jobCount={jobs.length}
                                jobChange={5}
                                companyCount={companies.length}
                                companyChange={-2}
                                misiCount={misiOffers.length}
                                misiChange={1}
                                submissionCount={misiSubmissions.length}
                                submissionChange={12}
                              />;
      case 'jobs': return <AdminJobs jobs={jobs} setJobs={setJobs} allCompanies={allCompaniesWithCount} allMajors={majors} allTags={tags} onShowPreview={handleShowPreview} addActivity={addActivity} />;
      case 'companies': return <AdminCompanies companies={allCompaniesWithCount} setCompanies={setCompanies} onShowPreview={handleShowPreview} jobs={jobs} setJobs={setJobs} allMajors={majors} allTags={tags} addActivity={addActivity} />;
      case 'majors': return <AdminMajors majors={majors} setMajors={setMajors} />;
      case 'tags': return <AdminTags tags={tags} setTags={setTags} />;
      case 'articles': return <AdminArticles articles={blogPosts} setArticles={setBlogPosts} onShowPreview={handleShowPreview} addActivity={addActivity} />;
      case 'events': return <AdminEvents events={events} setEvents={setEvents} allCompanies={allCompaniesWithCount} onShowPreview={handleShowPreview} />;
      case 'misi': return <AdminMisi misi={misiOffers} setMisi={setMisiOffers} submissions={misiSubmissions} setSubmissions={setMisiSubmissions} onShowPreview={handleShowPreview} />;
      case 'pelatihan': return <AdminPelatihan courses={courses} setCourses={setCourses} />;
      case 'analytics': return <AdminAnalytics />;
      case 'users': return <AdminUsers users={users} setUsers={setUsers} />;
      case 'settings': return <AdminSettings 
                                jobs={jobs} setJobs={setJobs}
                                companies={companies} setCompanies={setCompanies}
                                blogPosts={blogPosts} setBlogPosts={setBlogPosts}
                                events={events} setEvents={setEvents}
                                misiOffers={misiOffers} setMisiOffers={setMisiOffers}
                                misiSubmissions={misiSubmissions} setMisiSubmissions={setMisiSubmissions}
                                courses={courses} setCourses={setCourses}
                                majors={majors} setMajors={setMajors}
                                tags={tags} setTags={setTags}
                                users={users} setUsers={setUsers}
                             />;
      default: return <AdminDashboard recentActivities={recentActivities} jobCount={jobs.length} jobChange={0} companyCount={companies.length} companyChange={0} misiCount={misiOffers.length} misiChange={0} submissionCount={misiSubmissions.length} submissionChange={0} />;
    }
  };

  const navItems: { icon: string; label: string; sectionName: AdminSection }[] = [
    { icon: 'fas fa-tachometer-alt', label: 'Dashboard', sectionName: 'dashboard' },
    { icon: 'fas fa-briefcase', label: 'Lowongan', sectionName: 'jobs' },
    { icon: 'fas fa-building', label: 'Perusahaan', sectionName: 'companies' },
    { icon: 'fas fa-graduation-cap', label: 'Jurusan', sectionName: 'majors' },
    { icon: 'fas fa-tags', label: 'Tags', sectionName: 'tags' },
    { icon: 'fas fa-newspaper', label: 'Artikel', sectionName: 'articles' },
    { icon: 'fas fa-calendar-alt', label: 'Event', sectionName: 'events' },
    { icon: 'fas fa-coins', label: 'Misi Cuan', sectionName: 'misi' },
    { icon: 'fas fa-book-open', label: 'Pelatihan', sectionName: 'pelatihan' },
    { icon: 'fas fa-chart-line', label: 'Analytics', sectionName: 'analytics' },
    { icon: 'fas fa-users-cog', label: 'Admin', sectionName: 'users' },
    { icon: 'fas fa-cogs', label: 'Pengaturan', sectionName: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-poppins text-slate-800 relative">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex flex-col shrink-0">
        <div className="flex items-center justify-center p-4 border-b border-slate-700 h-16">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <NavItem key={item.sectionName} {...item} currentSection={section} setSection={setSection} />
          ))}
        </nav>
        <div className="p-2 border-t border-slate-700">
          <button
            onClick={onNavigateHome}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span className="font-medium">Kembali ke Situs</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center h-16 shrink-0">
          <h2 className="text-xl font-bold text-secondary">{getSectionTitle()}</h2>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {renderSection()}
        </main>
      </div>

      {/* Preview Overlay - Temporarily Disabled */}
      {previewData && (
        <div className="absolute inset-0 z-50 bg-white overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Preview Mode (Temporarily Disabled)</h3>
              <p className="text-sm text-gray-700 mb-4">
                Preview functionality will be re-enabled after complete Supabase integration.
              </p>
              <button
                onClick={handleClosePreview}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
              <div className="mt-4">
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                  {JSON.stringify(previewData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;