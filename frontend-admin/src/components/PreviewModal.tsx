import React from 'react';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, PelatihanInfo, Major, Tag } from '../types';

type PreviewType = 'job' | 'company' | 'article' | 'event' | 'misi' | 'misiSubmissionForm' | 'pelatihan' | 'major' | 'tag';

interface PreviewModalProps {
  type: PreviewType;
  data: any;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ type, data, onClose }) => {
  
  const renderJobPreview = (job: Partial<Job>) => {
    const jobData = job as any; // Type assertion for preview
    return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4 mb-4">
          {jobData.companyLogo && (
            <img src={jobData.companyLogo} alt={job.company} className="w-16 h-16 rounded-lg object-cover" />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary mb-2">{job.title}</h2>
            <p className="text-lg text-slate-600 mb-1">{job.company}</p>
            <p className="text-sm text-slate-500">{job.location}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.type && <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{job.type}</span>}
          {jobData.level && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{jobData.level}</span>}
          {job.salaryRange && <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"><i className="fas fa-money-bill-wave mr-1"></i>{job.salaryRange}</span>}
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Deskripsi</h3>
          <div dangerouslySetInnerHTML={{ __html: job.description || '' }} className="prose max-w-none" />
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Requirements</h3>
          <div dangerouslySetInnerHTML={{ __html: jobData.requirements || '' }} className="prose max-w-none" />
        </div>

        {jobData.benefits && (
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Benefits</h3>
            <div dangerouslySetInnerHTML={{ __html: jobData.benefits }} className="prose max-w-none" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {job.majors?.map((major, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              {major}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {job.tags?.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex gap-4 text-sm text-slate-500">
          <span><i className="far fa-clock mr-2"></i>Posted: {jobData.posted_date || jobData.postedDate || jobData.posted || 'Today'}</span>
          {job.dueDate && <span className="text-red-600"><i className="far fa-calendar-times mr-2"></i>Berakhir: {job.dueDate}</span>}
        </div>
      </div>
    </div>
  );
  };

  const renderCompanyPreview = (company: Partial<CompanyProfile>) => {
    const companyData = company as any;
    return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4 mb-4">
          {company.logo && (
            <img src={company.logo} alt={company.name} className="w-20 h-20 rounded-lg object-cover" />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary mb-2">{company.name}</h2>
            <p className="text-slate-600">{companyData.industry}</p>
            <p className="text-sm text-slate-500">{companyData.location}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Tentang Perusahaan</h3>
          <p className="text-slate-700 whitespace-pre-wrap">{company.description}</p>
        </div>

        {(company.website || companyData.website) && (
          <div className="mb-2">
            <span className="font-semibold">Website:</span>{' '}
            <a href={company.website || companyData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              <i className="fas fa-globe mr-1"></i>{company.website || companyData.website}
            </a>
          </div>
        )}

        {companyData.size && (
          <div className="mb-2">
            <span className="font-semibold">Ukuran:</span> {companyData.size}
          </div>
        )}
      </div>
    </div>
  );
  };

  const renderArticlePreview = (article: Partial<BlogPost>) => {
    const articleData = article as any;
    return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {articleData.imageUrl && (
          <img src={articleData.imageUrl} alt={article.title} className="w-full h-64 object-cover" />
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <span>{articleData.date}</span>
            <span>•</span>
            <span>{article.category}</span>
          </div>
          <h2 className="text-3xl font-bold text-secondary mb-4">{article.title}</h2>
          <p className="text-slate-600 mb-4">{articleData.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content || '' }} className="prose max-w-none" />
        </div>
      </div>
    </div>
  );
  };

  const renderEventPreview = (event: Partial<RecruitmentEvent>) => {
    const eventData = event as any;
    return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {event.image && (
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            {eventData.companyLogo && (
              <img src={eventData.companyLogo} alt={eventData.company} className="w-12 h-12 rounded-lg object-cover" />
            )}
            <div>
              <h2 className="text-2xl font-bold text-secondary">{event.title}</h2>
              <p className="text-slate-600">{eventData.company}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-slate-700">
            <div><i className="far fa-calendar mr-2"></i>{event.date}</div>
            <div><i className="far fa-clock mr-2"></i>{event.time}</div>
            <div><i className="fas fa-map-marker-alt mr-2"></i>{event.location}</div>
            {eventData.registrationLink && (
              <div>
                <i className="fas fa-link mr-2"></i>
                <a href={eventData.registrationLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Link Registrasi
                </a>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Deskripsi</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const renderMisiPreview = (misi: Partial<MisiCuanOffer>) => {
    const steps = misi.steps ? (typeof misi.steps === 'string' ? (misi.steps as string).split('\n') : misi.steps) : [];
    return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4 mb-4">
          {misi.logo && (
            <img src={misi.logo} alt={misi.company} className="w-16 h-16 rounded-lg object-cover" />
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary mb-2">{misi.title}</h2>
            <p className="text-slate-600">{misi.company}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                {misi.reward}
              </span>
              <span className="text-sm text-slate-500">
                <i className="far fa-clock mr-1"></i>{misi.time}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Deskripsi</h3>
          <p className="text-slate-700 whitespace-pre-wrap">{misi.description}</p>
        </div>

        {steps.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Langkah-langkah</h3>
            <ol className="list-decimal list-inside space-y-2">
              {steps.map((step: any, idx: number) => (
                <li key={idx} className="text-slate-700">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {misi.submissionRequirement && (
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Cara Pengumpulan</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{misi.submissionRequirement}</p>
          </div>
        )}

        <div className="flex gap-4 text-sm text-slate-600 pt-4 border-t">
          <span>Kuota: {misi.submissions || 0}/{misi.quota}</span>
          <span>Berlaku hingga: {misi.expiryDate}</span>
        </div>
      </div>
    </div>
  );
  };

  const renderMisiSubmissionFormPreview = (misi: Partial<MisiCuanOffer>) => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-secondary mb-4">Form Pengumpulan: {misi.title}</h2>
        
        {misi.submissionRequirement && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Instruksi Pengumpulan</h3>
            <p className="text-slate-700">{misi.submissionRequirement}</p>
          </div>
        )}

        <div className="space-y-4">
          {misi.submissionFields && misi.submissionFields.length > 0 ? (
            misi.submissionFields.map((field, idx) => (
              <div key={idx} className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'text' && (
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    placeholder={`Masukkan ${field.label.toLowerCase()}`}
                    disabled
                  />
                )}
                {field.type === 'url' && (
                  <input 
                    type="url" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    placeholder="https://..."
                    disabled
                  />
                )}
                {field.type === 'file' && (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <i className="fas fa-cloud-upload-alt text-4xl text-slate-400 mb-2"></i>
                    <p className="text-slate-600">Upload file</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic">Belum ada field form yang ditambahkan</p>
          )}
        </div>

        <div className="mt-6 pt-4 border-t">
          <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700" disabled>
            Submit Pengumpulan
          </button>
        </div>
      </div>
    </div>
  );

  const renderPelatihanPreview = (pelatihan: Partial<PelatihanInfo>) => {
    const pelatihanData = pelatihan as any;
    return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {pelatihanData.image && (
          <img src={pelatihanData.image} alt={pelatihan.title} className="w-full h-64 object-cover" />
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {pelatihan.category}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {pelatihan.location}
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-secondary mb-4">{pelatihan.title}</h2>
          
          <div className="space-y-2 mb-4 text-slate-700">
            <div><i className="fas fa-building mr-2"></i>{pelatihan.organizer}</div>
            <div><i className="far fa-calendar mr-2"></i>{pelatihan.date}</div>
            {pelatihanData.registrationLink && (
              <div>
                <i className="fas fa-link mr-2"></i>
                <a href={pelatihanData.registrationLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Link Registrasi
                </a>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Deskripsi Singkat</h3>
            <p className="text-slate-700">{pelatihan.description}</p>
          </div>

          {pelatihanData.fullDescription && (
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Deskripsi Lengkap</h3>
              <div dangerouslySetInnerHTML={{ __html: pelatihanData.fullDescription }} className="prose max-w-none" />
            </div>
          )}

          {pelatihanData.videoEmbedUrl && (
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Video</h3>
              <div className="aspect-video">
                <iframe
                  src={pelatihanData.videoEmbedUrl}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {pelatihanData.pdfEmbedUrl && (
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Dokumen PDF</h3>
              <div className="h-96">
                <iframe
                  src={pelatihanData.pdfEmbedUrl}
                  className="w-full h-full rounded-lg border"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  };

  const renderMajorPreview = (major: Partial<Major>) => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <i className="fas fa-graduation-cap text-6xl text-primary mb-4"></i>
        </div>
        <h2 className="text-3xl font-bold text-secondary mb-2">Jurusan</h2>
        <p className="text-2xl text-slate-700 font-semibold">{major.name}</p>
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-slate-500">
            Jurusan ini akan muncul sebagai filter di halaman lowongan kerja
          </p>
        </div>
      </div>
    </div>
  );

  const renderTagPreview = (tag: Partial<Tag>) => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <i className="fas fa-tag text-6xl text-primary mb-4"></i>
        </div>
        <h2 className="text-3xl font-bold text-secondary mb-2">Tag</h2>
        <div className="flex justify-center">
          <span className="px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-xl font-semibold">
            {tag.name}
          </span>
        </div>
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-slate-500">
            Tag ini akan muncul di kartu lowongan kerja
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'job':
        return renderJobPreview(data);
      case 'company':
        return renderCompanyPreview(data);
      case 'article':
        return renderArticlePreview(data);
      case 'event':
        return renderEventPreview(data);
      case 'misi':
        return renderMisiPreview(data);
      case 'misiSubmissionForm':
        return renderMisiSubmissionFormPreview(data);
      case 'pelatihan':
        return renderPelatihanPreview(data);
      case 'major':
        return renderMajorPreview(data);
      case 'tag':
        return renderTagPreview(data);
      default:
        return <div>Preview not available</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-100 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-secondary">Preview Mode</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700"
          >
            Tutup Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
