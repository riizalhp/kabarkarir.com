import React, { useState, useEffect, useMemo } from 'react';
import { Job, Company, RecruitmentEvent, BlogPost } from '../types';
import Sidebar from './Sidebar';
import AdsBanner from './AdsBanner';
import { toast } from '../utils/toast';
import { isJobFavorite, addFavoriteJob, removeFavoriteJob } from '../utils/favorites';
import JobCard from './JobCard';
import { injectJSONLD, updateMetaTags, generateJobPostingSchema, generateBreadcrumbSchema, generateSlug } from '../utils/seo';

interface JobDetailPageProps {
  job: Job;
  allJobs: Job[];
  onBack: () => void;
  onSelectJob: (jobSlug: string) => void;
  onSelectCategory: (category: string) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventSlug: string) => void;
  onSelectCompany: (companySlug: string) => void;
  trendingCompanies: (Company & { jobsAvailable: number })[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
  isPreviewMode?: boolean;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, allJobs, onBack, onSelectJob, onSelectCategory, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, onSelectCompany, trendingCompanies, latestArticles, allEvents, isPreviewMode = false }) => {
  const [activeTab, setActiveTab] = useState('Deskripsi');
  const [isFavorite, setIsFavorite] = useState(isJobFavorite(job.id));

  // Memoize similar jobs calculation to prevent re-calculation on every render
  const finalSimilarJobs = useMemo(() => {
    const similarJobsByCategory = allJobs.filter(j => j.category === job.category && j.id !== job.id);
    const similarJobsByProvince = allJobs.filter(j => j.province === job.province && j.id !== job.id);
    
    const combinedSimilar = [...similarJobsByCategory, ...similarJobsByProvince];
    const similarJobIds = new Set();
    const uniqueSimilarJobs = combinedSimilar.filter(j => {
      if (similarJobIds.has(j.id)) {
        return false;
      } else {
        similarJobIds.add(j.id);
        return true;
      }
    });
    
    return uniqueSimilarJobs.slice(0, 4);
  }, [allJobs, job.category, job.province, job.id]);

  // SEO: Update meta tags and inject JSON-LD
  useEffect(() => {
    if (!isPreviewMode) {
      // Update page meta tags
      updateMetaTags({
        title: `${job.title} - ${job.company} | KabarKarir.com`,
        description: `Lowongan ${job.title} di ${job.company}. ${job.description?.substring(0, 100) || 'Lihat detail lengkap'}... Lokasi: ${job.location}. ${job.type}`,
        keywords: `${job.title}, lowongan ${job.category}, ${job.company}, ${job.location}, ${job.tags?.join(', ')}`,
        canonical: `https://www.kabarkarir.com/lowongan/${job.slug}`,
        ogImage: job.logo || 'https://www.kabarkarir.com/og-image.jpg',
        ogType: 'article'
      });

      // Inject JobPosting structured data
      injectJSONLD(generateJobPostingSchema(job));

      // Inject Breadcrumb structured data
      injectJSONLD(generateBreadcrumbSchema([
        { name: 'Beranda', url: 'https://www.kabarkarir.com/' },
        { name: 'Lowongan Kerja', url: 'https://www.kabarkarir.com/' },
        { name: job.category, url: `https://www.kabarkarir.com/kategori/${job.category}` },
        { name: job.title, url: window.location.href }
      ]));
    }
  }, [job, isPreviewMode]);

  const getEmbeddableGoogleDriveUrl = (url: string): string => {
    // Mencari ID file dari URL Google Drive
    const fileIdMatch = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        // Mengganti format URL menjadi format embed/preview
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    // Jika format URL tidak dikenali atau sudah benar, kembalikan URL asli
    return url;
  };


  const handleApply = () => {
    toast(`Melamar ke posisi ${job.title} di ${job.company}`);
    // Di aplikasi nyata, ini akan mengarahkan ke halaman aplikasi atau situs eksternal
  };
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteJob(job.id);
      toast(`${job.title} telah dihapus dari favorit`);
    } else {
      addFavoriteJob(job.id);
      toast(`${job.title} telah ditambahkan ke favorit`);
    }
    setIsFavorite(!isFavorite);
  };
  
  const handleFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, filterValue: string) => {
    e.preventDefault();
    onSelectCategory(filterValue);
  }
  
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPreviewMode) return;
    onSelectCompany(job.companySlug);
  };

  // Memoize share links to prevent recalculation
  const shareLinks = useMemo(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Lihat lowongan "${job.title}" di ${job.company}. Jangan sampai ketinggalan!`);
    
    return {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      threads: `https://www.threads.net/share?url=${url}&text=${text}`,
    };
  }, [job.title, job.company]);
  
  const handleInstagramShare = () => {
      navigator.clipboard.writeText(window.location.href);
      toast('Link disalin! Bagikan di Instagram Story atau bio Anda.');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Link berhasil disalin!');
  };

  const badgeColorClasses = {
    blue: 'bg-blue-100 text-primary',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  const tabs = ['Deskripsi', 'Kualifikasi', 'Benefit', 'Cara Melamar', 'Tentang Perusahaan'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Deskripsi':
        return (
          <div>
            <h3 className="font-bold text-xs text-secondary mb-2">Deskripsi Pekerjaan</h3>
            <p className="text-[11px]">{job.description}</p>

            {(job.video_embed_url || job.videoEmbedUrl) && (
              <div className="mt-3">
                  <h4 className="font-semibold text-[11px] text-secondary mb-2">Video Terkait</h4>
                  <div className="responsive-iframe-container rounded-lg overflow-hidden shadow">
                      <iframe
                          src={(job.video_embed_url || job.videoEmbedUrl || '').replace("watch?v=", "embed/")}
                          title="Video Lowongan"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                      ></iframe>
                  </div>
              </div>
            )}

            {(job.pdf_embed_url || job.pdfEmbedUrl) && (
              <div className="mt-3">
                  <h4 className="font-semibold text-[11px] text-secondary mb-2">Dokumen Terkait</h4>
                  <div className="flex gap-6">
                      <div className="w-[320px] h-[400px] rounded-lg overflow-hidden shadow border flex-shrink-0">
                          <iframe
                              src={getEmbeddableGoogleDriveUrl(job.pdf_embed_url || job.pdfEmbedUrl || '')}
                              title="Dokumen Lowongan"
                              className="w-full h-full"
                              loading="lazy"
                          ></iframe>
                      </div>
                      <div className="flex-shrink-0">
                          <div className="w-[400px] h-[400px] bg-gray-200 rounded-lg flex items-center justify-center border shadow">
                              <div className="text-center">
                                  <i className="fas fa-ad text-6xl text-gray-400 mb-3"></i>
                                  <p className="text-sm font-semibold text-gray-500">Iklan Persegi</p>
                                  <p className="text-xs text-gray-400">400 x 400</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            )}
          </div>
        );
      case 'Kualifikasi':
        return (
          <div>
            <h3 className="font-bold text-xs text-secondary mb-2">Kualifikasi</h3>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              {job.qualifications.map((q, index) => <li key={index}>{q}</li>)}
            </ul>
          </div>
        );
      case 'Benefit':
        return (
          <div>
            <h3 className="font-bold text-xs text-secondary mb-2">Benefit & Tunjangan</h3>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              {job.benefits.map((b, index) => <li key={index}>{b}</li>)}
            </ul>
          </div>
        );
      case 'Cara Melamar':
         return (
          <div>
            <h3 className="font-bold text-xs text-secondary mb-2">Cara Melamar</h3>
            <p className="text-[11px]">{job.howToApply}</p>
          </div>
        );
      case 'Tentang Perusahaan':
        return (
          <div>
            <h3 className="font-bold text-xs text-secondary mb-2">Tentang Perusahaan</h3>
            <p className="text-[11px]">{job.about_company || job.aboutCompany || 'Informasi tentang perusahaan belum tersedia.'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Sidebar - Ads Banner */}
          {!isPreviewMode && (
            <div className="hidden xl:block w-40 shrink-0">
              <div className="sticky top-4">
                <AdsBanner position="left" size="vertical" />
              </div>
            </div>
          )}

          {/* Main Job Detail */}
          <div className="w-full lg:flex-1">
            <button onClick={onBack} className="mb-3 inline-flex items-center text-xs font-medium text-secondary hover:text-primary transition-colors">
              <i className="fas fa-arrow-left mr-1.5 text-[10px]"></i>
              Kembali
            </button>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
                <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center shrink-0 p-1.5">
                  <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" onClick={(e) => handleFilterClick(e, job.category)} className={`inline-block text-[9px] font-medium px-2 py-0.5 rounded-full ${badgeColorClasses[job.categoryColor]} hover:opacity-80 transition`}>{job.category}</a>
                  <h1 className="text-base font-bold text-secondary mt-1.5 leading-tight">{job.title}</h1>
                  <a href="#" onClick={handleCompanyClick} className="text-primary font-medium text-xs hover:underline hover:text-blue-700 transition-colors block mt-0.5">{job.company}</a>
                  <div className="flex items-center flex-wrap text-[9px] text-gray-500 mt-1.5 gap-x-2 gap-y-0.5">
                    <span className="flex items-center"><i className="fas fa-map-marker-alt mr-1 text-[8px]"></i> {job.location}</span>
                    <span className="flex items-center"><i className="far fa-clock mr-1 text-[8px]"></i> {job.posted}</span>
                    {job.salaryRange && <span className="flex items-center"><i className="fas fa-money-bill-wave mr-1 text-[8px]"></i> {job.salaryRange}</span>}
                    {job.dueDate && <span className="flex items-center text-red-600"><i className="far fa-calendar-times mr-1 text-[8px]"></i> {job.dueDate}</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <button onClick={handleApply} className="flex-1 text-center bg-accent hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-xs">
                  Lamar Sekarang <i className="fas fa-paper-plane ml-1.5"></i>
                </button>
                <button 
                  onClick={toggleFavorite} 
                  className={`sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 border-2 rounded-lg font-bold transition duration-300 text-xs ${
                    isFavorite 
                      ? 'bg-accent/10 border-accent text-accent' 
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400'
                  }`}
                  aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                >
                  <i className={`${isFavorite ? 'fas' : 'far'} fa-bookmark text-sm`}></i>
                  <span className="hidden sm:inline">{isFavorite ? 'Tersimpan' : 'Simpan'}</span>
                </button>
              </div>


              {/* Job Details Info */}
              <div className="border-t border-b border-gray-200 py-3 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2.5">
                  <div>
                    <h4 className="text-[9px] text-gray-500 mb-0.5">Tipe Pekerjaan</h4>
                    <a href="#" onClick={(e) => handleFilterClick(e, job.type)} className="font-semibold text-[10px] text-primary hover:text-secondary hover:underline transition-colors">{job.type}</a>
                  </div>
                  <div>
                    <h4 className="text-[9px] text-gray-500 mb-0.5">Pendidikan</h4>
                    <a href="#" onClick={(e) => handleFilterClick(e, job.education)} className="font-semibold text-[10px] text-primary hover:text-secondary hover:underline transition-colors">{job.education}</a>
                  </div>
                  <div>
                    <h4 className="text-[9px] text-gray-500 mb-0.5">Pengalaman</h4>
                    <a href="#" onClick={(e) => handleFilterClick(e, job.experience)} className="font-semibold text-[10px] text-primary hover:text-secondary hover:underline transition-colors">{job.experience}</a>
                  </div>
                  <div>
                    <h4 className="text-[9px] text-gray-500 mb-0.5">Lokasi</h4>
                    <a href="#" onClick={(e) => handleFilterClick(e, job.location)} className="font-semibold text-[10px] text-primary hover:text-secondary hover:underline transition-colors">{job.location}</a>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-[9px] text-gray-500 mb-1.5">Kategori & Tag</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag, index) => (
                      <a href="#" key={index} onClick={(e) => handleFilterClick(e, tag)} className="bg-blue-50 text-primary text-[9px] font-medium px-2 py-1 rounded-full hover:bg-blue-100 hover:text-secondary transition">{tag}</a>
                    ))}
                  </div>
                </div>
                 {job.majors && job.majors.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-[9px] text-gray-500 mb-1.5">Jurusan yang Relevan</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.majors.map((major, index) => (
                        <a href="#" key={index} onClick={(e) => handleFilterClick(e, major)} className="bg-green-50 text-green-700 text-[9px] font-medium px-2 py-1 rounded-full hover:bg-green-100 hover:text-green-800 transition">{major}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tab System */}
              <div>
                <div className="border-b border-gray-200 mb-3">
                  <nav className="-mb-px flex space-x-3 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                          activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-[10px] focus:outline-none`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="prose max-w-none text-[11px] leading-relaxed">
                  {renderTabContent()}
                </div>
              </div>
              
               <div className="mt-4 pt-3 border-t border-gray-200">
                  <h4 className="font-semibold text-[11px] text-secondary mb-2">Bagikan Lowongan Ini</h4>
                  <div className="flex items-center space-x-2">
                      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke WhatsApp" className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition text-xs">
                          <i className="fab fa-whatsapp"></i>
                      </a>
                      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke Facebook" className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition text-xs">
                          <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke X" className="w-7 h-7 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition text-xs">
                          <i className="fab fa-twitter"></i>
                      </a>
                      <button onClick={handleInstagramShare} aria-label="Bagikan ke Instagram" className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white hover:opacity-90 transition text-xs">
                          <i className="fab fa-instagram"></i>
                      </button>
                      <a href={shareLinks.threads} target="_blank" rel="noopener noreferrer" aria-label="Bagikan ke Threads" className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-black transition text-xs">
                          <i className="fas fa-at"></i>
                      </a>
                      <button onClick={handleCopyLink} aria-label="Salin Link" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-500 transition text-lg">
                          <i className="fas fa-link"></i>
                      </button>
                  </div>
              </div>
            </div>

            {/* Similar Jobs Section */}
            {!isPreviewMode && finalSimilarJobs.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-sm font-bold text-secondary mb-3">Rekomendasi Lowongan Serupa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {finalSimilarJobs.map(similarJob => (
                            <JobCard 
                                key={similarJob.id}
                                job={similarJob}
                                onSelectJob={onSelectJob}
                                onSelectCategory={onSelectCategory}
                                onSelectCompany={onSelectCompany}
                            />
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Sidebar */}
          {!isPreviewMode && <Sidebar onNavigateToBlog={onNavigateToBlog} onNavigateToEventRecruitment={onNavigateToEventRecruitment} onSelectEvent={onSelectEvent} trendingCompanies={trendingCompanies} latestArticles={latestArticles} allEvents={allEvents} /> }
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
