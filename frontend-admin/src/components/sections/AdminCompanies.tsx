import React, { useState, useEffect, useMemo } from 'react';
import { CompanyProfile, Job, Major, Tag, Activity } from '../../types';
import { toast } from '../../utils/toast';
import { downloadExcelTemplate } from '../../utils/excel';
import Pagination from '../Pagination';
import AutoResizeTextarea from '../AutoResizeTextarea';
import { adminCompaniesService, adminJobsService, activityLogsService } from '../../services/adminApi';

// Beri tahu TypeScript tentang objek XLSX global dari CDN
declare const XLSX: any;

interface AdminCompaniesProps {
  companies: CompanyProfile[];
  setCompanies: React.Dispatch<React.SetStateAction<CompanyProfile[]>>;
  onShowPreview: (type: 'company' | 'job', data: any) => void;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  allMajors: Major[];
  allTags: Tag[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const COMPANY_ITEMS_PER_PAGE = 10;
const JOB_ITEMS_PER_PAGE = 5;

const AdminCompanies: React.FC<AdminCompaniesProps> = ({ companies, setCompanies, onShowPreview, jobs, setJobs, allMajors, allTags, addActivity }) => {
    // State untuk modal Perusahaan
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState<Partial<CompanyProfile> | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    
    // State untuk modal Lowongan
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<Job> | null>(null);

    // State untuk paginasi
    const [companyPage, setCompanyPage] = useState(1);
    const [jobPage, setJobPage] = useState(1);

    // Fetch companies on mount
    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setDataLoading(true);
            const data = await adminCompaniesService.getAll();
            setCompanies(data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            toast('Gagal memuat data perusahaan');
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        setCompanyPage(1);
    }, [searchTerm]);

    // --- Handler untuk Modal Perusahaan ---
    const handleOpenModal = (company: Partial<CompanyProfile> | null = null) => {
        setCurrentCompany(company ? { ...company } : { name: '', type: 'SWASTA', description: '', logo: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCompany(null);
    };

    const handleDelete = async (companyId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus perusahaan ini?')) {
            try {
                setLoading(true);
                const companyToDelete = companies.find(c => c.id === companyId);
                
                await adminCompaniesService.delete(companyId);
                setCompanies(prevCompanies => prevCompanies.filter(c => c.id !== companyId));
                
                if (companyToDelete) {
                    await activityLogsService.create({
                        type: 'DELETE',
                        category: 'Perusahaan',
                        text: `Perusahaan "${companyToDelete.name}" dihapus.`,
                    });
                    
                    addActivity({ type: 'DELETE', category: 'Perusahaan', text: `Perusahaan "${companyToDelete.name}" dihapus.` });
                }
                
                toast('Perusahaan berhasil dihapus');
            } catch (error) {
                console.error('Error deleting company:', error);
                toast('Gagal menghapus perusahaan');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentCompany) return;

        try {
            setLoading(true);
            
            if (currentCompany.id) {
                // Remove jobsAvailable from update payload (it's a computed field)
                const { jobsAvailable, ...updateData } = currentCompany;
                const updated = await adminCompaniesService.update(currentCompany.id, updateData);
                setCompanies(prevCompanies => prevCompanies.map(c => c.id === currentCompany.id ? updated : c));
                
                // Try to log activity, but don't fail if RLS blocks it
                try {
                    await activityLogsService.create({
                        type: 'UPDATE',
                        category: 'Perusahaan',
                        text: `Data perusahaan "${currentCompany.name}" diperbarui.`,
                    });
                } catch (logError) {
                    console.warn('Failed to log activity (RLS policy):', logError);
                }
                
                addActivity({ type: 'UPDATE', category: 'Perusahaan', text: `Data perusahaan "${currentCompany.name}" diperbarui.` });
                toast('Perusahaan berhasil diperbarui');
            } else {
                const newCompany = await adminCompaniesService.create({
                    name: currentCompany.name || '',
                    logo: currentCompany.logo || '',
                    description: currentCompany.description || '',
                    type: currentCompany.type || 'SWASTA',
                    slug: currentCompany.name?.toLowerCase().replace(/ /g, '-') || '',
                    website: currentCompany.website || '',
                });
                
                setCompanies(prevCompanies => [newCompany, ...prevCompanies]);
                
                // Try to log activity, but don't fail if RLS blocks it
                try {
                    await activityLogsService.create({
                        type: 'CREATE',
                        category: 'Perusahaan',
                        text: `Perusahaan baru ditambahkan: "${newCompany.name}".`,
                    });
                } catch (logError) {
                    console.warn('Failed to log activity (RLS policy):', logError);
                }
                
                addActivity({ type: 'CREATE', category: 'Perusahaan', text: `Perusahaan baru ditambahkan: "${newCompany.name}".` });
                toast('Perusahaan berhasil ditambahkan');
            }
            
            handleCloseModal();
        } catch (error) {
            console.error('Error saving company:', error);
            toast('Gagal menyimpan perusahaan');
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (currentCompany) {
            const { name, value } = e.target;
            setCurrentCompany({ ...currentCompany, [name]: value });
        }
    };
    
    // --- Handler untuk Impor/Ekspor Perusahaan ---
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

                const currentMaxId = Math.max(0, ...companies.map(c => c.id));
                let nextId = currentMaxId + 1;

                const newCompanies: CompanyProfile[] = json.map((row: any) => {
                    const name = row['Nama Perusahaan'] || row['name'];
                    const type = row['Tipe'] || row['type'];
                    if (!name || !type || !['BUMN', 'SWASTA', 'INSTANSI'].includes(String(type).toUpperCase())) return null;
                    
                    return {
                        id: nextId++, name: String(name).trim(), slug: String(name).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        logo: `https://picsum.photos/100/100?random=${nextId}`, description: String(row['Deskripsi'] || '').trim(),
                        jobsAvailable: 0, type: String(type).toUpperCase() as 'BUMN' | 'SWASTA' | 'INSTANSI',
                    };
                }).filter((c): c is CompanyProfile => c !== null);

                if (newCompanies.length > 0) {
                    setCompanies(prev => [...prev, ...newCompanies]);
                    toast(`${newCompanies.length} perusahaan berhasil diimpor.`);
                } else {
                    toast('Tidak ada perusahaan valid yang ditemukan di file.');
                }
            } catch (error) { toast('Gagal mengimpor file.'); }
        };
        reader.readAsArrayBuffer(file);
    };

    const triggerImport = () => {
        const input = document.createElement('input'); input.type = 'file'; input.accept = ".xlsx, .xls";
        input.onchange = handleFileImport; input.click();
    };

    const handleDownloadTemplate = () => {
        const columns = ["Nama Perusahaan", "Tipe", "URL Logo", "Website Resmi", "Deskripsi"];
        const exampleData = [
            "PT Teknologi Nusantara",
            "SWASTA",
            "https://picsum.photos/seed/company1/200/200",
            "https://www.teknologinusantara.com",
            "Perusahaan teknologi yang berfokus pada pengembangan aplikasi mobile dan web dengan pengalaman lebih dari 10 tahun melayani berbagai industri"
        ];
        downloadExcelTemplate(columns, 'Template_Import_Perusahaan', exampleData);
    };

    const handleSelectCompany = (company: CompanyProfile) => {
        setSelectedCompany(company);
        setJobPage(1); // Reset job page when selecting a new company
    };

    // --- Handler untuk Modal Lowongan ---
    const handleOpenJobModal = (job: Partial<Job> | null = null) => {
        if (job) {
             setCurrentJob({ ...job, majors: job.majors || [], qualifications: job.qualifications || [], benefits: job.benefits || [], tags: job.tags || [] });
        } else {
            if (!selectedCompany) return;
            setCurrentJob({
                title: '', company: selectedCompany.name, companySlug: selectedCompany.slug, logo: selectedCompany.logo,
                education: 'SMA/SMK', description: '', location: '', type: 'Full Time', category: 'Swasta',
                categoryColor: 'green', majors: [], qualifications: [], benefits: [], howToApply: '',
                aboutCompany: selectedCompany.description, experience: 'Fresh Graduate', tags: [], pdfEmbedUrl: '', videoEmbedUrl: '',
            });
        }
        setIsJobModalOpen(true);
    };
    
    const handleCloseJobModal = () => { setIsJobModalOpen(false); setCurrentJob(null); };

    const handleDeleteJob = (jobId: number) => {
        if (window.confirm('Hapus lowongan ini?')) setJobs(prev => prev.filter(j => j.id !== jobId));
    };

    const handleSaveJob = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentJob) return;

        const finalJobData = {
            ...currentJob,
            qualifications: currentJob.qualifications?.filter(q => q.trim() !== '') || [],
            benefits: currentJob.benefits?.filter(b => b.trim() !== '') || [],
            tags: currentJob.tags || [],
        };

        if (finalJobData.id) {
            setJobs(prev => prev.map(j => j.id === finalJobData.id ? (finalJobData as Job) : j));
        } else {
            const newJob: Job = {
                id: Math.max(...jobs.map(j => j.id), 0) + 1, posted: 'Baru saja',
                province: '', city: '', ...finalJobData,
            } as Job;
            setJobs(prev => [newJob, ...prev]);
        }
        handleCloseJobModal();
    };

    const handleJobInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (currentJob) setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
    };

    const handleMajorChange = (majorName: string) => {
        if (currentJob) {
            const currentMajors = currentJob.majors || [];
            const newMajors = currentMajors.includes(majorName) ? currentMajors.filter(m => m !== majorName) : [...currentMajors, majorName];
            setCurrentJob({ ...currentJob, majors: newMajors });
        }
    };
    
    const handleTagChange = (tagName: string) => {
        if (currentJob) {
            const currentTags = currentJob.tags || [];
            const newTags = currentTags.includes(tagName) ? currentTags.filter(t => t !== tagName) : [...currentTags, tagName];
            setCurrentJob({ ...currentJob, tags: newTags });
        }
    };

    // --- Tampilan Daftar Lowongan ---
    if (selectedCompany) {
        const companyJobs = jobs.filter(job => job.companySlug === selectedCompany.slug);
        const totalJobPages = Math.ceil(companyJobs.length / JOB_ITEMS_PER_PAGE);
        const currentCompanyJobs = companyJobs.slice((jobPage - 1) * JOB_ITEMS_PER_PAGE, jobPage * JOB_ITEMS_PER_PAGE);
        
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <button onClick={() => setSelectedCompany(null)} className="text-sm text-slate-600 hover:text-primary mb-2">
                            <i className="fas fa-arrow-left mr-2"></i>Kembali
                        </button>
                        <h3 className="text-lg font-bold text-secondary">Lowongan di {selectedCompany.name}</h3>
                    </div>
                     <button onClick={() => handleOpenJobModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                        <i className="fas fa-plus mr-2"></i>Tambah Lowongan
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Judul Posisi</th>
                                <th scope="col" className="px-6 py-3">Lokasi</th>
                                <th scope="col" className="px-6 py-3">Tipe</th>
                                <th scope="col" className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCompanyJobs.length > 0 ? (
                                currentCompanyJobs.map(job => (
                                    <tr key={job.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{job.title}</td>
                                        <td className="px-6 py-4">{job.location}</td>
                                        <td className="px-6 py-4">{job.type}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button onClick={() => handleOpenJobModal(job)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-500">Belum ada lowongan.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={jobPage}
                    totalPages={totalJobPages}
                    onPageChange={setJobPage}
                />
            </div>
        );
    }

    // --- Tampilan Utama: Daftar Perusahaan ---
    const filteredCompanies = useMemo(() => {
        return companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [companies, searchTerm]);

    const totalCompanyPages = Math.ceil(filteredCompanies.length / COMPANY_ITEMS_PER_PAGE);
    const currentCompanies = filteredCompanies.slice((companyPage - 1) * COMPANY_ITEMS_PER_PAGE, companyPage * COMPANY_ITEMS_PER_PAGE);
    
    if (dataLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center py-12">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <span className="ml-3 text-lg text-slate-600">Memuat data perusahaan...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-bold text-secondary">Manajemen Perusahaan Partner</h3>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Cari perusahaan..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button onClick={handleDownloadTemplate} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition shrink-0"><i className="fas fa-file-download mr-2"></i>Template</button>
                    <button onClick={triggerImport} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shrink-0"><i className="fas fa-file-excel mr-2"></i>Impor</button>
                    <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"><i className="fas fa-plus mr-2"></i>Tambah</button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr><th className="px-6 py-3">Nama Perusahaan</th><th className="px-6 py-3">Tipe</th><th className="px-6 py-3">Lowongan</th><th className="px-6 py-3">Aksi</th></tr>
                    </thead>
                    <tbody>
                        {currentCompanies.map(company => (
                            <tr key={company.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900 flex items-center space-x-3">
                                    <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain"/>
                                    <button onClick={() => handleSelectCompany(company)} className="text-primary hover:underline font-semibold text-left">{company.name}</button>
                                </td>
                                <td className="px-6 py-4">{company.type}</td><td className="px-6 py-4">{company.jobsAvailable}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(company)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(company.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={companyPage}
                totalPages={totalCompanyPages}
                onPageChange={setCompanyPage}
            />

            {/* Modal Edit/Tambah Perusahaan */}
            {isModalOpen && currentCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentCompany.id ? 'Edit' : 'Tambah'} Perusahaan</h4>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div><label>Nama</label><input type="text" name="name" value={currentCompany.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" required /></div>
                            <div><label>URL Logo</label><input type="text" name="logo" value={currentCompany.logo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" /></div>
                            <div><label>Tipe</label><select name="type" value={currentCompany.type} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md"><option>BUMN</option><option>SWASTA</option><option>INSTANSI</option></select></div>
                            <div><label>Website Resmi</label><input type="url" name="website" value={currentCompany.website || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="https://www.perusahaan.com" /></div>
                            <div>
                                <label>Deskripsi</label>
                                <AutoResizeTextarea 
                                    name="description" 
                                    value={currentCompany.description || ''} 
                                    onChange={handleInputChange} 
                                    minRows={3}
                                    maxRows={15}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md" 
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseModal} className="bg-slate-200 px-4 py-2 rounded-lg" disabled={loading}>Batal</button>
                                <button type="button" onClick={() => onShowPreview('company', currentCompany)} className="bg-slate-500 text-white px-4 py-2 rounded-lg" disabled={loading}><i className="fas fa-eye mr-2"></i>Preview</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50" disabled={loading}>
                                    {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...</> : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Edit/Tambah Lowongan */}
            {isJobModalOpen && currentJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[51] flex justify-center items-center p-4" onClick={handleCloseJobModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentJob.id ? 'Edit' : 'Tambah'} Lowongan</h4>
                        <form onSubmit={handleSaveJob} className="space-y-4">
                            <input type="text" name="title" value={currentJob.title} onChange={handleJobInputChange} placeholder="Judul Posisi" className="block w-full px-3 py-2 border rounded-md" required />
                            <select name="company" value={currentJob.company} className="block w-full px-3 py-2 border rounded-md bg-slate-100" required disabled><option>{currentJob.company}</option></select>
                            <AutoResizeTextarea 
                                name="description" 
                                value={currentJob.description || ''} 
                                onChange={handleJobInputChange} 
                                minRows={3}
                                maxRows={15}
                                placeholder="Deskripsi" 
                                className="block w-full px-3 py-2 border rounded-md" 
                                required 
                            />
                            <div>
                                <label className="text-sm">Kualifikasi (satu per baris)</label>
                                <AutoResizeTextarea 
                                    name="qualifications" 
                                    value={currentJob.qualifications?.join('\n') || ''} 
                                    onChange={(e) => setCurrentJob({...currentJob, qualifications: e.target.value.split('\n')})} 
                                    minRows={4}
                                    maxRows={15}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md" 
                                />
                            </div>
                            <div>
                                <label className="text-sm">Benefit (satu per baris)</label>
                                <AutoResizeTextarea 
                                    name="benefits" 
                                    value={currentJob.benefits?.join('\n') || ''} 
                                    onChange={(e) => setCurrentJob({...currentJob, benefits: e.target.value.split('\n')})} 
                                    minRows={4}
                                    maxRows={15}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md" 
                                />
                            </div>
                            <div><label className="text-sm">Jurusan</label><div className="mt-1 p-3 border rounded-md max-h-40 overflow-y-auto grid grid-cols-3 gap-2">{allMajors.sort((a,b) => a.name.localeCompare(b.name)).map(major => (<label key={major.id} className="flex items-center text-sm gap-2"><input type="checkbox" checked={currentJob.majors?.includes(major.name) || false} onChange={() => handleMajorChange(major.name)} />{major.name}</label>))}</div></div>
                            <div><label className="text-sm">Tags</label><div className="mt-1 p-3 border rounded-md max-h-40 overflow-y-auto grid grid-cols-3 gap-2">{allTags.sort((a,b) => a.name.localeCompare(b.name)).map(tag => (<label key={tag.id} className="flex items-center text-sm gap-2"><input type="checkbox" checked={currentJob.tags?.includes(tag.name) || false} onChange={() => handleTagChange(tag.name)} />{tag.name}</label>))}</div></div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="location" value={currentJob.location} onChange={handleJobInputChange} placeholder="Lokasi" className="px-3 py-2 border rounded-md" required />
                                <input type="text" name="experience" value={currentJob.experience} onChange={handleJobInputChange} placeholder="Pengalaman" className="px-3 py-2 border rounded-md" required />
                                <select name="type" value={currentJob.type} onChange={handleJobInputChange} className="px-3 py-2 border rounded-md"><option>Full Time</option><option>Part Time</option><option>Internship</option><option>Contract</option></select>
                                <select name="education" value={currentJob.education} onChange={handleJobInputChange} className="px-3 py-2 border rounded-md"><option>SMA/SMK</option><option>Diploma III</option><option>Strata 1</option><option>Strata 2</option></select>
                                <input type="text" name="salaryRange" value={currentJob.salaryRange || ''} onChange={handleJobInputChange} placeholder="Rentang Gaji" className="px-3 py-2 border rounded-md" />
                                <input type="date" name="dueDate" value={currentJob.dueDate || ''} onChange={handleJobInputChange} placeholder="Tanggal Berakhir" className="px-3 py-2 border rounded-md" title="Tanggal berakhir lowongan" />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseJobModal} className="bg-slate-200 px-4 py-2 rounded-lg" disabled={loading}>Batal</button>
                                <button type="button" onClick={() => onShowPreview('job', currentJob)} className="bg-slate-500 text-white px-4 py-2 rounded-lg" disabled={loading}><i className="fas fa-eye mr-2"></i>Preview</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50" disabled={loading}>
                                    {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...</> : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCompanies;