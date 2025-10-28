import React from 'react';import React from 'react';import React from 'react';

import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer } from '../types';

import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer } from '../types';import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer } from '../types';

interface AdminPreviewPageProps {

  type: 'job' | 'company' | 'article' | 'event' | 'misi' | 'misiSubmissionForm';

  data: any;

  onClose: () => void;interface AdminPreviewPageProps {interface AdminPreviewPageProps {

  allJobs: Job[];

  allCompanies: CompanyProfile[];  type: 'job' | 'company' | 'article' | 'event' | 'misi' | 'misiSubmissionForm';  type: 'job' | 'company' | 'article' | 'event' | 'misi' | 'misiSubmissionForm';

}

  data: any;  data: any;

const AdminPreviewPage: React.FC<AdminPreviewPageProps> = ({ type, data, onClose }) => {

  return (  onClose: () => void;  onClose: () => void;

    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">  allJobs: Job[];  allJobs: Job[];

        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-gray-800">  allCompanies: CompanyProfile[];  allCompanies: CompanyProfile[];

            Preview: {type}

          </h2>}}

          <button

            onClick={onClose}

            className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-3"

          >const AdminPreviewPage: React.FC<AdminPreviewPageProps> = ({ type, data, onClose }) => {const AdminPreviewPage: React.FC<AdminPreviewPageProps> = ({ type, data, onClose }) => {

            ×

          </button>  return (  return (

        </div>

            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">

        <div className="p-6">

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

            <p className="text-sm text-yellow-700">

              Simplified preview mode - Full styling preview will be available after Supabase integration.        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">

            </p>

          </div>          <h2 className="text-2xl font-bold text-gray-800">          <h2 className="text-2xl font-bold text-gray-800">Preview: {type}</h2>

          

          <div className="space-y-4">            <i className="fas fa-eye mr-2"></i>          <button

            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">

              {JSON.stringify(data, null, 2)}            Preview: {type.charAt(0).toUpperCase() + type.slice(1)}            onClick={onClose}

            </pre>

          </div>          </h2>            className="text-gray-500 hover:text-gray-700 text-2xl"

        </div>

      </div>          <button          >

    </div>

  );            onClick={onClose}            ×

};

            className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-3"          </button>

export default AdminPreviewPage;

          >        </div>

            ×        

          </button>        <div className="p-6">

        </div>          <div className="bg-gray-50 rounded-lg p-4 mb-4">

                    <h3 className="font-semibold text-lg mb-2">Data Preview</h3>

        <div className="p-6">            <p className="text-sm text-gray-600 mb-4">

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">              Preview functionality is simplified. Full preview with styling will be available in production.

            <h3 className="font-semibold text-lg mb-2 text-yellow-800">            </p>

              <i className="fas fa-info-circle mr-2"></i>          </div>

              Simplified Preview Mode          

            </h3>          <div className="space-y-4">

            <p className="text-sm text-yellow-700">            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">

              This is a simplified preview showing the raw data structure.               {JSON.stringify(data, null, 2)}

              Full preview with complete styling will be available after Supabase integration.            </pre>

            </p>          </div>

          </div>        </div>

                </div>

          <div className="space-y-4">    </div>

            {type === 'job' && (  );

              <div className="space-y-2">};

                <h3 className="font-bold text-xl">{data.title || 'Job Title'}</h3>

                <p className="text-gray-600">{data.company || 'Company Name'}</p>export default AdminPreviewPage;

                <p className="text-sm text-gray-500">{data.location || 'Location'} • {data.type || 'Job Type'}</p>

              </div>const AdminPreviewPage: React.FC<AdminPreviewPageProps> = ({ type, data, onClose, allJobs, allCompanies }) => {

            )}  const dummyFunc = () => {};

              const dummyFuncNum = (id: number) => {};

            {type === 'company' && (  const dummyFuncStr = (str: string) => {};

              <div className="space-y-2">

                <h3 className="font-bold text-xl">{data.name || 'Company Name'}</h3>  const renderPreviewContent = () => {

                <p className="text-gray-600">{data.type || 'Company Type'}</p>    switch (type) {

              </div>      case 'job':

            )}        const previewJob: Job = {

                        id: data.id || 999,

            {type === 'article' && (            title: data.title || 'Judul Lowongan Preview',

              <div className="space-y-2">            company: data.company || 'Nama Perusahaan',

                <h3 className="font-bold text-xl">{data.title || 'Article Title'}</h3>            companySlug: data.companySlug || 'company-slug',

                <p className="text-gray-600">{data.category || 'Category'}</p>            logo: data.logo || 'https://picsum.photos/40/40',

              </div>            location: data.location || 'Lokasi',

            )}            province: data.province || '',

                        city: data.city || '',

            {type === 'event' && (            type: data.type || 'Full Time',

              <div className="space-y-2">            category: data.category || 'Kategori',

                <h3 className="font-bold text-xl">{data.title || 'Event Title'}</h3>            categoryColor: data.categoryColor || 'blue',

                <p className="text-gray-600">{data.organizer || 'Organizer'}</p>            description: data.description || 'Ini adalah deskripsi lowongan dalam mode pratinjau.',

                <p className="text-sm text-gray-500">{data.date || 'Date'} • {data.location || 'Location'}</p>            posted: data.posted || 'Preview',

              </div>            education: data.education || 'Strata 1',

            )}            qualifications: data.qualifications || ['Kualifikasi pratinjau 1.', 'Kualifikasi pratinjau 2.'],

                        benefits: data.benefits || ['Benefit pratinjau 1.', 'Benefit pratinjau 2.'],

            {type === 'misi' && (            howToApply: data.howToApply || 'Instruksi cara melamar dalam mode pratinjau.',

              <div className="space-y-2">            aboutCompany: data.aboutCompany || 'Tentang perusahaan dalam mode pratinjau.',

                <h3 className="font-bold text-xl">{data.title || 'Misi Title'}</h3>            experience: data.experience || 'Pengalaman kerja pratinjau',

                <p className="text-gray-600">{data.company || 'Partner'}</p>            tags: data.tags || ['preview', 'tag'],

                <p className="text-sm text-gray-500">Reward: {data.reward || 'N/A'}</p>            majors: data.majors || ['Semua Jurusan'],

              </div>            ...data

            )}        };

                    return <JobDetailPage 

            <div className="mt-6 border-t pt-4">                    job={previewJob} 

              <h4 className="font-semibold mb-2 text-gray-700">Full Data Structure:</h4>                    allJobs={allJobs}

              <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs leading-relaxed">                    onBack={onClose}

                {JSON.stringify(data, null, 2)}                    onSelectJob={dummyFuncNum}

              </pre>                    onSelectCategory={dummyFuncStr}

            </div>                    onNavigateToBlog={dummyFunc}

          </div>                    onNavigateToEventRecruitment={dummyFunc}

        </div>                    onSelectEvent={dummyFuncNum}

                            onSelectCompany={dummyFuncStr}

        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">                    isPreviewMode={true}

          <button                />;

            onClick={onClose}      

            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"      case 'article':

          >        const previewArticle: BlogPost = {

            <i className="fas fa-times mr-2"></i>            id: data.id || 999,

            Close Preview            title: data.title || 'Judul Artikel Preview',

          </button>            category: data.category || 'Kategori Preview',

        </div>            description: data.description || 'Deskripsi singkat preview.',

      </div>            content: data.content || 'Konten lengkap artikel dalam mode pratinjau.',

    </div>            posted: data.posted || 'Preview',

  );            image: data.image || 'https://picsum.photos/seed/preview/400/300',

};            categoryColor: data.categoryColor || 'blue',

            ...data

export default AdminPreviewPage;        }

        return <ArticleDetailPage
                    post={previewArticle}
                    onNavigateToBlog={dummyFunc}
                    onNavigateToEventRecruitment={dummyFunc}
                    onSelectEvent={dummyFuncNum}
                    isPreviewMode={true}
                    trendingCompanies={[]}
                    latestArticles={[]}
                    allEvents={[]}
                />
      
      case 'event':
         const previewEvent: RecruitmentEvent = {
            id: data.id || 999,
            title: data.title || 'Judul Event Preview',
            organizer: data.organizer || 'Penyelenggara Preview',
            date: data.date || 'Tanggal Preview',
            location: data.location || 'Lokasi Preview',
            type: data.type || 'Job Fair',
            status: data.status || 'upcoming',
            isFeatured: data.isFeatured || false,
            image: data.image || 'https://picsum.photos/seed/previewevent/800/450',
            description: data.description || 'Deskripsi event dalam mode pratinjau.',
            time: data.time || '09:00 - 17:00',
            province: data.province || 'DKI JAKARTA',
            city: data.city || 'KOTA ADM. JAKARTA PUSAT',
            ...data
         }
         return <EventDetailPage
                    event={previewEvent}
                    onNavigateToBlog={dummyFunc}
                    onNavigateToEventRecruitment={dummyFunc}
                    onSelectEvent={dummyFuncNum}
                    onSelectCompany={dummyFuncStr}
                    isPreviewMode={true}
                    trendingCompanies={[]}
                    latestArticles={[]}
                    allEvents={[]}
                 />

      case 'company':
        const previewCompany: CompanyProfile = {
            id: data.id || 999,
            name: data.name || 'Nama Perusahaan Preview',
            slug: data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'preview-slug',
            logo: data.logo || 'https://picsum.photos/100/100?random=99',
            description: data.description || 'Deskripsi perusahaan dalam mode pratinjau.',
            type: data.type || 'SWASTA',
            jobsAvailable: 0, // In preview, we can assume 0 or just not show it.
        };
        return <CompanyDetailPage
                    companyPreview={previewCompany}
                    allJobs={allJobs}
                    allCompanies={allCompanies}
                    onSelectJob={dummyFuncNum}
                    onSelectCategory={dummyFuncStr}
                    onSelectCompany={dummyFuncStr}
                    onNavigateToBlog={dummyFunc}
                    onNavigateToEventRecruitment={dummyFunc}
                    onSelectEvent={dummyFuncNum}
                    isPreviewMode={true}
                    trendingCompanies={[]}
                    latestArticles={[]}
                    allEvents={[]}
                />

      case 'misi':
        const previewMisi: MisiCuanOffer = {
            id: data.id || 999,
            title: data.title || 'Judul Misi Preview',
            company: data.company || 'Partner Preview',
            companySlug: data.companySlug || 'partner-slug',
            logo: data.logo || 'https://picsum.photos/80/80',
            description: data.description || 'Deskripsi misi dalam mode pratinjau.',
            reward: data.reward || 'Imbalan Preview',
            quota: data.quota || 100,
            submissions: data.submissions || 10,
            time: data.time || '15 Menit',
            expiryDate: data.expiryDate || '31 Des 2024',
            steps: typeof data.steps === 'string' ? data.steps.split('\n').filter(s => s.trim() !== '') : (data.steps || ['Langkah pratinjau 1', 'Langkah pratinjau 2']),
            submissionRequirement: data.submissionRequirement || 'Persyaratan pengumpulan bukti pratinjau.',
            submissionFields: data.submissionFields || [{ id: 1, label: 'Contoh Field', type: 'text' }],
            ...data
        }
        return <MisiDetailPage
            offer={previewMisi}
            onStart={dummyFuncNum}
            onNavigateToBlog={dummyFunc}
            onNavigateToEventRecruitment={dummyFunc}
            onSelectEvent={dummyFuncNum}
            onSelectCompany={dummyFuncStr}
            trendingCompanies={[]}
            latestArticles={[]}
            allEvents={[]}
            isPreviewMode={true}
        />
      
      case 'misiSubmissionForm':
        const previewMisiForForm: MisiCuanOffer = {
            id: data.id || 999,
            title: data.title || 'Judul Misi Preview',
            company: data.company || 'Partner Preview',
            companySlug: data.companySlug || 'partner-slug',
            logo: data.logo || 'https://picsum.photos/80/80',
            description: data.description || 'Deskripsi misi dalam mode pratinjau.',
            reward: data.reward || 'Imbalan Preview',
            quota: data.quota || 100,
            submissions: data.submissions || 10,
            time: data.time || '15 Menit',
            expiryDate: data.expiryDate || '31 Des 2024',
            steps: typeof data.steps === 'string' ? data.steps.split('\n').filter(s => s.trim() !== '') : (data.steps || ['Langkah pratinjau 1', 'Langkah pratinjau 2']),
            submissionRequirement: data.submissionRequirement || 'Persyaratan pengumpulan bukti pratinjau.',
            submissionFields: data.submissionFields || [{ id: 1, label: 'Contoh Field', type: 'text' }],
            ...data
        };
        return <MisiSubmissionPreviewPage offer={previewMisiForForm} />;

      default:
        return <div className="text-center p-8">Preview untuk tipe item ini tidak tersedia.</div>;
    }
  };

  return (
    <div className="font-poppins h-full flex flex-col">
      <header className="bg-yellow-400 text-black p-3 text-center sticky top-0 z-50 shadow-md shrink-0">
        <div className="container mx-auto flex justify-between items-center">
            <span className="font-bold"><i className="fas fa-eye mr-2"></i>MODE PRATINJAU</span>
            <button 
                onClick={onClose}
                className="bg-black text-white px-4 py-1.5 rounded-md font-medium hover:bg-gray-800 transition text-sm"
            >
                <i className="fas fa-times mr-2"></i>Tutup Pratinjau
            </button>
        </div>
      </header>
      <div className="bg-gray-100 flex-1 overflow-y-auto">{renderPreviewContent()}</div>
    </div>
  );
};

export default AdminPreviewPage;
