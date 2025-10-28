import React, { useState, useMemo, useEffect } from 'react';
import { Job, CompanyProfile, Major, Tag, Activity } from '../../types';
import { toast } from '../../utils/toast';
import { downloadExcelTemplate } from '../../utils/excel';
import Pagination from '../Pagination';

// Beri tahu TypeScript tentang objek XLSX global dari CDN
declare const XLSX: any;

interface AdminJobsProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  allCompanies: CompanyProfile[];
  allMajors: Major[];
  allTags: Tag[];
  onShowPreview: (type: 'job', data: any) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const ITEMS_PER_PAGE = 10;

const AdminJobs: React.FC<AdminJobsProps> = ({ jobs, setJobs, allCompanies, allMajors, allTags, onShowPreview, addActivity }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<Job> | null>(null);
    const [companySearch, setCompanySearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (job: Partial<Job> | null = null) => {
        const defaultCompany = allCompanies[0];
        setCurrentJob(job ? { 
            ...job,
            majors: job.majors || [],
            qualifications: job.qualifications || [],
            benefits: job.benefits || [],
            tags: job.tags || [],
        } : { 
            title: '', 
            company: defaultCompany?.name || '', 
            companySlug: defaultCompany?.slug || '',
            logo: defaultCompany?.logo || '',
            education: 'SMA/SMK',
            description: '',
            location: '',
            type: 'Full Time',
            category: 'Swasta',
            categoryColor: 'green',
            majors: [],
            qualifications: [],
            benefits: [],
            howToApply: '',
            aboutCompany: defaultCompany?.description || '',
            experience: 'Fresh Graduate',
            tags: [],
            pdfEmbedUrl: '',
            videoEmbedUrl: '',
        });
        setCompanySearch('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentJob(null);
    };

    const handleDelete = (jobId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
            const jobToDelete = jobs.find(job => job.id === jobId);
            if (jobToDelete) {
                setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
                addActivity({
                    type: 'DELETE',
                    category: 'Lowongan',
                    text: `Lowongan "${jobToDelete.title}" dihapus.`
                });
            }
        }
    };
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentJob) return;

        const finalJobData = {
            ...currentJob,
            qualifications: currentJob.qualifications?.filter(q => q.trim() !== '') || [],
            benefits: currentJob.benefits?.filter(b => b.trim() !== '') || [],
            tags: currentJob.tags || [],
        };

        if (finalJobData.id) {
            // Update
            setJobs(prevJobs => prevJobs.map(job => job.id === finalJobData.id ? (finalJobData as Job) : job));
            addActivity({
              type: 'UPDATE',
              category: 'Lowongan',
              text: `Lowongan "${finalJobData.title}" di ${finalJobData.company} diperbarui.`
          });
        } else {
            // Create
            const newJob: Job = {
                id: Math.max(...jobs.map(j => j.id), 0) + 1,
                posted: 'Baru saja',
                province: '',
                city: '',
                ...finalJobData,
            } as Job;
            setJobs(prevJobs => [newJob, ...prevJobs]);
            addActivity({
                type: 'CREATE',
                category: 'Lowongan',
                text: `Lowongan baru ditambahkan: "${newJob.title}" oleh ${newJob.company}.`
            });
        }
        handleCloseModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (currentJob) {
            const { name, value } = e.target;
            if (name === 'company') {
                const selectedCompany = allCompanies.find(c => c.name === value);
                if (selectedCompany) {
                    setCurrentJob({
                        ...currentJob,
                        company: selectedCompany.name,
                        companySlug: selectedCompany.slug,
                        logo: selectedCompany.logo,
                        aboutCompany: selectedCompany.description,
                    });
                }
            } else {
                 setCurrentJob({ ...currentJob, [name]: value });
            }
        }
    };
    
    const handleMajorChange = (majorName: string) => {
        if (currentJob) {
            const currentMajors = currentJob.majors || [];
            const isSelected = currentMajors.includes(majorName);
            let newMajors;
            if (isSelected) {
                newMajors = currentMajors.filter(major => major !== majorName);
            } else {
                newMajors = [...currentMajors, majorName];
            }
            setCurrentJob({ ...currentJob, majors: newMajors });
        }
    };
    
     const handleTagChange = (tagName: string) => {
        if (currentJob) {
            const currentTags = currentJob.tags || [];
            const isSelected = currentTags.includes(tagName);
            let newTags;
            if (isSelected) {
                newTags = currentTags.filter(tag => tag !== tagName);
            } else {
                newTags = [...currentTags, tagName];
            }
            setCurrentJob({ ...currentJob, tags: newTags });
        }
    };
    
    const filteredCompanies = useMemo(() => 
        allCompanies
            .filter(c => c.name.toLowerCase().includes(companySearch.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name)),
        [companySearch, allCompanies]
    );

    const handleFileImport = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet);

                if (json.length === 0) {
                    toast('File kosong atau format tidak sesuai.');
                    return;
                }

                const currentMaxId = Math.max(0, ...jobs.map(j => j.id));
                let nextId = currentMaxId + 1;
                let importedCount = 0;
                let skippedCount = 0;

                const newJobs: Job[] = json.map((row: any) => {
                    const companyName = row['Nama Perusahaan'];
                    const title = row['Judul Posisi'];
                    
                    if (!companyName || !title) {
                        skippedCount++;
                        return null;
                    }

                    const company = allCompanies.find(c => c.name.toLowerCase() === String(companyName).toLowerCase());

                    if (!company) {
                        console.warn(`Company not found: "${companyName}". Skipping job: "${title}"`);
                        skippedCount++;
                        return null;
                    }

                    const parseStringArray = (value: any): string[] => {
                        if (!value) return [];
                        return String(value).split(',').map(item => item.trim()).filter(Boolean);
                    };
                    
                    const newJob: Job = {
                        id: nextId++,
                        title: String(title),
                        company: company.name,
                        companySlug: company.slug,
                        logo: company.logo,
                        location: String(row['Lokasi'] || 'Lokasi tidak ditentukan'),
                        province: String(row['Provinsi'] || ''),
                        city: String(row['Kota'] || ''),
                        type: String(row['Tipe Pekerjaan'] || 'Full Time'),
                        category: String(row['Kategori'] || 'Swasta'),
                        categoryColor: 'blue',
                        description: String(row['Deskripsi'] || ''),
                        posted: 'Baru saja',
                        education: String(row['Pendidikan'] || 'SMA/SMK'),
                        qualifications: parseStringArray(row['Kualifikasi']),
                        benefits: parseStringArray(row['Benefit']),
                        howToApply: String(row['Cara Melamar'] || ''),
                        aboutCompany: company.description,
                        experience: String(row['Pengalaman'] || 'Fresh Graduate'),
                        tags: parseStringArray(row['Tags']),
                        majors: parseStringArray(row['Jurusan']),
                    };
                    importedCount++;
                    return newJob;
                }).filter((j): j is Job => j !== null);

                if (newJobs.length > 0) {
                    setJobs(prev => [...prev, ...newJobs]);
                }

                let message = '';
                if (importedCount > 0) message += `${importedCount} lowongan berhasil diimpor. `;
                if (skippedCount > 0) message += `${skippedCount} lowongan dilewati (perusahaan tidak ditemukan/data tidak valid).`;
                if (!message) message = 'Tidak ada lowongan valid yang ditemukan di file.';
                
                toast(message);

            } catch (error) {
                console.error("Error importing file:", error);
                toast('Gagal mengimpor file. Pastikan formatnya benar.');
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const triggerImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = ".xlsx, .xls";
        input.onchange = handleFileImport;
        input.click();
    };

    const handleDownloadTemplate = () => {
        const columns = [
            "Judul Posisi", "Nama Perusahaan", "Lokasi", "Provinsi", "Kota", 
            "Tipe Pekerjaan", "Kategori", "Deskripsi", "Pendidikan", "Pengalaman",
            "Kualifikasi", "Benefit", "Cara Melamar", "Tags", "Jurusan"
        ];
        downloadExcelTemplate(columns, 'Template_Import_Lowongan');
    };
    
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [jobs, searchTerm]);

    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const currentJobsList = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-bold text-secondary">Daftar Lowongan Kerja</h3>
                 <div className="flex items-center gap-2 flex-wrap">
                    <input 
                        type="text"
                        placeholder="Cari lowongan atau perusahaan..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button onClick={handleDownloadTemplate} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition shrink-0">
                       <i className="fas fa-file-download mr-2"></i>Template
                    </button>
                    <div className="relative group">
                        <button onClick={triggerImport} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shrink-0">
                            <i className="fas fa-file-excel mr-2"></i>Impor
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-96 bg-slate-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Impor dari file .xlsx.
                            <br/><strong>Kolom Wajib:</strong> "Judul Posisi", "Nama Perusahaan" (harus sudah ada di sistem).
                            <br/><strong>Kolom Opsional:</strong> "Lokasi", "Tipe Pekerjaan", "Kategori", "Deskripsi", "Pendidikan", "Pengalaman", dll.
                            <br/><strong>Kolom Array (pisahkan dengan koma):</strong> "Kualifikasi", "Benefit", "Tags", "Jurusan".
                            <div className="absolute top-full right-4 -ml-1 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                    </div>
                    <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                        <i className="fas fa-plus mr-2"></i>Tambah Lowongan
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Posisi</th>
                            <th scope="col" className="px-6 py-3">Perusahaan</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobsList.map(job => (
                            <tr key={job.id} className="bg-white border-b hover:bg-slate-50">
                                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{job.title}</th>
                                <td className="px-6 py-4">{job.company}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(job)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isModalOpen && currentJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentJob.id ? 'Edit' : 'Tambah'} Lowongan</h4>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Judul Posisi</label>
                                <input type="text" name="title" value={currentJob.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Cari Perusahaan</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ketik untuk mencari..." 
                                        value={companySearch} 
                                        onChange={(e) => setCompanySearch(e.target.value)} 
                                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Nama Perusahaan</label>
                                    <select 
                                        name="company" 
                                        value={currentJob.company} 
                                        onChange={handleInputChange} 
                                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white" 
                                        required
                                    >
                                        <option value="" disabled>Pilih Perusahaan</option>
                                        {filteredCompanies.map(company => (
                                            <option key={company.id} value={company.name}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
                                <textarea name="description" value={currentJob.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed Video (YouTube)</label>
                                    <input type="text" name="videoEmbedUrl" value={currentJob.videoEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://www.youtube.com/embed/..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed PDF (Google Drive)</label>
                                    <input type="text" name="pdfEmbedUrl" value={currentJob.pdfEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://drive.google.com/.../preview" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Kualifikasi</label>
                                <textarea name="qualifications" value={currentJob.qualifications?.join('\n')} onChange={(e) => setCurrentJob({...currentJob, qualifications: e.target.value.split('\n')})} rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Satu kualifikasi per baris" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Benefit</label>
                                <textarea name="benefits" value={currentJob.benefits?.join('\n')} onChange={(e) => setCurrentJob({...currentJob, benefits: e.target.value.split('\n')})} rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Satu benefit per baris" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Cara Melamar</label>
                                <textarea name="howToApply" value={currentJob.howToApply} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Tentang Perusahaan (untuk lowongan)</label>
                                <p className="text-xs text-slate-500 mt-1">Data ini diambil otomatis dari profil perusahaan yang dipilih.</p>
                                <textarea 
                                    name="aboutCompany" 
                                    value={currentJob.aboutCompany} 
                                    onChange={handleInputChange} 
                                    rows={3} 
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-100 cursor-not-allowed" 
                                    readOnly 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Jurusan Kuliah</label>
                                <div className="mt-1 p-3 border border-slate-300 rounded-md max-h-40 overflow-y-auto bg-slate-50">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                                        {allMajors.sort((a,b) => a.name.localeCompare(b.name)).map(major => (
                                            <label key={major.id} className="flex items-center space-x-2 text-sm cursor-pointer hover:text-primary">
                                                <input 
                                                    type="checkbox"
                                                    checked={currentJob.majors?.includes(major.name) || false}
                                                    onChange={() => handleMajorChange(major.name)}
                                                    className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                                                />
                                                <span>{major.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Tags</label>
                                <div className="mt-1 p-3 border border-slate-300 rounded-md max-h-40 overflow-y-auto bg-slate-50">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                                        {allTags.sort((a,b) => a.name.localeCompare(b.name)).map(tag => (
                                            <label key={tag.id} className="flex items-center space-x-2 text-sm cursor-pointer hover:text-primary">
                                                <input 
                                                    type="checkbox"
                                                    checked={currentJob.tags?.includes(tag.name) || false}
                                                    onChange={() => handleTagChange(tag.name)}
                                                    className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
                                                />
                                                <span>{tag.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Lokasi</label>
                                    <input type="text" name="location" value={currentJob.location} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Contoh: Jakarta Pusat" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Pengalaman</label>
                                    <input type="text" name="experience" value={currentJob.experience} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Contoh: Minimal 2 tahun" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Tipe Pekerjaan</label>
                                    <select name="type" value={currentJob.type} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white">
                                        <option>Full Time</option>
                                        <option>Part Time</option>
                                        <option>Internship</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Jenjang Pendidikan</label>
                                    <select name="education" value={currentJob.education} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white">
                                        <option>SD</option>
                                        <option>SMP</option>
                                        <option>SMA/SMK</option>
                                        <option>Diploma III</option>
                                        <option>Strata 1</option>
                                        <option>Strata 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Kategori</label>
                                    <select name="category" value={currentJob.category} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white">
                                        <option>BUMN</option>
                                        <option>Swasta</option>
                                        <option>Manufaktur</option>
                                        <option>Teknologi</option>
                                        <option>Pendidikan</option>
                                        <option>Kesehatan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300">Batal</button>
                                <button type="button" onClick={() => onShowPreview('job', currentJob)} className="bg-slate-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600">
                                    <i className="fas fa-eye mr-2"></i>Preview
                                </button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobs;