import React, { useState, useMemo, useEffect } from 'react';
import { MisiCuanOffer, SubmissionField, MisiSubmission } from '../../types';
import { downloadExcelTemplate } from '../../utils/excel';
import { formatDisplayDate } from '../../utils/formatting';
import Pagination from '../Pagination';
import { adminMisiService, activityLogsService } from '../../services/adminApi';
import { toast } from '../../utils/toast';

interface AdminMisiProps {
    misi: MisiCuanOffer[];
    setMisi: React.Dispatch<React.SetStateAction<MisiCuanOffer[]>>;
    submissions: MisiSubmission[];
    setSubmissions: React.Dispatch<React.SetStateAction<MisiSubmission[]>>;
    onShowPreview: (type: 'misi' | 'misiSubmissionForm', data: any) => void;
}

const MISI_ITEMS_PER_PAGE = 10;
const SUBMISSION_ITEMS_PER_PAGE = 10;

const AdminMisi: React.FC<AdminMisiProps> = ({ misi, setMisi, submissions, setSubmissions, onShowPreview }) => {
    // Loading states
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    // State for Mission Add/Edit Modal
    const [isMisiModalOpen, setIsMisiModalOpen] = useState(false);
    const [currentMisi, setCurrentMisi] = useState<Omit<Partial<MisiCuanOffer>, 'steps'> & { steps?: string } | null>(null);

    // State for viewing submissions
    const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState<MisiCuanOffer | null>(null);
    const [submissionStatusFilter, setSubmissionStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
    
    // State for Submission Detail Modal
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<MisiSubmission | null>(null);

    // State for main mission list search
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination States
    const [misiPage, setMisiPage] = useState(1);
    const [submissionPage, setSubmissionPage] = useState(1);

    // Fetch misi and submissions from Supabase
    useEffect(() => {
        fetchMisi();
        fetchSubmissions();
    }, []);

    const fetchMisi = async () => {
        try {
            setDataLoading(true);
            const data = await adminMisiService.getAll();
            setMisi(data);
        } catch (error) {
            console.error('Error fetching misi:', error);
            toast('Gagal memuat data misi');
        } finally {
            setDataLoading(false);
        }
    };

    const fetchSubmissions = async () => {
        try {
            const data = await adminMisiService.getSubmissions();
            setSubmissions(data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            toast('Gagal memuat data pengumpulan');
        }
    };

    useEffect(() => {
        setMisiPage(1);
    }, [searchTerm]);

    useEffect(() => {
        setSubmissionPage(1);
    }, [submissionStatusFilter]);


     const convertToInputDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) return date.toISOString().split('T')[0];
        return '';
    };

     const handleOpenMisiModal = (m: Partial<MisiCuanOffer> | null = null) => {
        const today = new Date();
        today.setDate(today.getDate() + 30);
        const defaultExpiry = today.toISOString().split('T')[0];

        setCurrentMisi(m ? { 
            ...m, 
            steps: m.steps?.join('\n') || '',
            submissionFields: m.submissionFields || [],
            expiryDate: convertToInputDate(m.expiryDate),
        } : { 
            title: '', company: '', companySlug: '', logo: '',
            reward: '', quota: 100, submissions: 0,
            description: '', time: '10 Menit', expiryDate: defaultExpiry,
            steps: '', submissionRequirement: '', submissionFields: [],
        });
        setIsMisiModalOpen(true);
    };

    const handleCloseMisiModal = () => {
        setIsMisiModalOpen(false);
        setCurrentMisi(null);
    };

    const handleDeleteMisi = async (misiId: number) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus misi ini?')) return;

        try {
            setLoading(true);
            await adminMisiService.delete(misiId);
            setMisi(prevMisi => prevMisi.filter(m => m.id !== misiId));
            toast('Misi berhasil dihapus');
        } catch (error) {
            console.error('Error deleting misi:', error);
            toast('Gagal menghapus misi');
        } finally {
            setLoading(false);
        }
    };
    
    const handleSaveMisi = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMisi) return;

        // Validation
        if (!currentMisi.title || !currentMisi.company || !currentMisi.reward || !currentMisi.expiryDate) {
            toast('Harap lengkapi semua field yang wajib');
            return;
        }

        try {
            setLoading(true);

            const finalMisiData = {
                ...currentMisi,
                steps: currentMisi.steps ? currentMisi.steps.split('\n').filter(s => s.trim() !== '') : [],
            };

            let savedMisi: MisiCuanOffer;

            if (finalMisiData.id) {
                // Update existing
                savedMisi = await adminMisiService.update(finalMisiData.id, finalMisiData as Partial<MisiCuanOffer>);
                setMisi(prevMisi => prevMisi.map(m => m.id === savedMisi.id ? savedMisi : m));
                
                // Log activity
                await activityLogsService.create({
                    type: 'UPDATE',
                    category: 'misi',
                    text: `Memperbarui misi: ${savedMisi.title}`,
                });
                
                toast('Misi berhasil diperbarui');
            } else {
                // Create new
                if (!finalMisiData.logo) {
                    finalMisiData.logo = 'https://picsum.photos/80/80?random=' + Math.floor(Math.random() * 100);
                }
                
                savedMisi = await adminMisiService.create(finalMisiData as Omit<MisiCuanOffer, 'id'>);
                setMisi(prevMisi => [savedMisi, ...prevMisi]);
                
                // Log activity
                await activityLogsService.create({
                    type: 'CREATE',
                    category: 'misi',
                    text: `Menambahkan misi baru: ${savedMisi.title}`,
                });
                
                toast('Misi berhasil ditambahkan');
            }

            handleCloseMisiModal();
        } catch (error) {
            console.error('Error saving misi:', error);
            toast('Gagal menyimpan misi');
        } finally {
            setLoading(false);
        }
    };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (currentMisi) {
            const { name, value, type } = e.target;
            const val = type === 'number' ? parseInt(value, 10) : value;
            setCurrentMisi({ ...currentMisi, [name]: val });
        }
    };

    // --- Submission Field Handlers ---
    const handleAddField = () => {
        if (!currentMisi) return;
        const newField: SubmissionField = { id: Date.now(), label: '', type: 'text' };
        const updatedFields = [...(currentMisi.submissionFields || []), newField];
        setCurrentMisi({ ...currentMisi, submissionFields: updatedFields });
    };

    const handleRemoveField = (fieldId: number) => {
        if (!currentMisi) return;
        const updatedFields = currentMisi.submissionFields?.filter(f => f.id !== fieldId);
        setCurrentMisi({ ...currentMisi, submissionFields: updatedFields });
    };

    const handleFieldChange = (fieldId: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!currentMisi) return;
        const { name, value } = e.target;
        const updatedFields = currentMisi.submissionFields?.map(f => f.id === fieldId ? { ...f, [name]: value } : f);
        setCurrentMisi({ ...currentMisi, submissionFields: updatedFields });
    };

    // --- Submission View Handlers ---
    const handleViewSubmissionsFor = (m: MisiCuanOffer) => {
        setViewingSubmissionsFor(m);
        setSubmissionPage(1); // Reset page when viewing a new mission's submissions
    };

    const handleViewSubmission = (submission: MisiSubmission) => {
        setSelectedSubmission(submission);
        setIsSubmissionModalOpen(true);
    };

    const handleCloseSubmissionModal = () => {
        setIsSubmissionModalOpen(false);
        setSelectedSubmission(null);
    };

    const handleUpdateStatus = async (submissionId: number, status: 'Approved' | 'Rejected') => {
        try {
            setLoading(true);
            const updatedSubmission = await adminMisiService.updateSubmissionStatus(submissionId, status);
            setSubmissions(prev => prev.map(sub => sub.id === submissionId ? updatedSubmission : sub));
            toast(`Pengumpulan berhasil ${status === 'Approved' ? 'disetujui' : 'ditolak'}`);
            handleCloseSubmissionModal();
        } catch (error) {
            console.error('Error updating submission status:', error);
            toast('Gagal memperbarui status');
        } finally {
            setLoading(false);
        }
    };
    
    const statusColor: { [key in MisiSubmission['status']]: string } = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Approved: 'bg-green-100 text-green-800',
        Rejected: 'bg-red-100 text-red-800',
    };

    const handleDownloadTemplate = () => {
        const columns = [ "Judul Misi", "Partner", "Reward", "Kuota", "Deskripsi", "Langkah-langkah Misi", "Instruksi Pengumpulan" ];
        downloadExcelTemplate(columns, 'Template_Import_Misi_Cuan');
    };

    // Calculate filtered misi (must be before any conditional returns)
    const filteredMisi = useMemo(() => {
        return misi.filter(m => 
            m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [misi, searchTerm]);

    const totalMisiPages = Math.ceil(filteredMisi.length / MISI_ITEMS_PER_PAGE);
    const currentMisiList = filteredMisi.slice((misiPage - 1) * MISI_ITEMS_PER_PAGE, misiPage * MISI_ITEMS_PER_PAGE);

    // Loading state UI
    if (dataLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center py-12">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <span className="ml-3 text-lg text-slate-600">Memuat data...</span>
                </div>
            </div>
        );
    }

    // Main Render Logic
    if (viewingSubmissionsFor) {
        const filteredSubmissions = submissions.filter(s => {
            const missionMatch = s.misiId === viewingSubmissionsFor.id;
            const statusMatch = submissionStatusFilter === 'All' || s.status === submissionStatusFilter;
            return missionMatch && statusMatch;
        });
        const totalSubmissionPages = Math.ceil(filteredSubmissions.length / SUBMISSION_ITEMS_PER_PAGE);
        const currentSubmissions = filteredSubmissions.slice((submissionPage - 1) * SUBMISSION_ITEMS_PER_PAGE, submissionPage * SUBMISSION_ITEMS_PER_PAGE);

        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <div>
                        <button onClick={() => setViewingSubmissionsFor(null)} className="text-sm text-slate-600 hover:text-primary mb-2">
                            <i className="fas fa-arrow-left mr-2"></i>Kembali ke Daftar Misi
                        </button>
                        <h3 className="text-lg font-bold text-secondary">Pengumpulan untuk: {viewingSubmissionsFor.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="status-filter" className="text-sm font-medium">Filter Status:</label>
                        <select
                            id="status-filter"
                            value={submissionStatusFilter}
                            onChange={(e) => setSubmissionStatusFilter(e.target.value as any)}
                            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
                        >
                            <option value="All">Semua</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Pengguna</th>
                                <th scope="col" className="px-6 py-3">Tanggal</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSubmissions.length > 0 ? (
                                currentSubmissions.map(sub => (
                                    <tr key={sub.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4">{sub.user}</td>
                                        <td className="px-6 py-4">{sub.submissionDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[sub.status]}`}>{sub.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleViewSubmission(sub)} className="text-primary hover:text-blue-800" title="Lihat Detail">
                                                <i className="fas fa-eye mr-1"></i> Lihat
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="text-center py-10 text-slate-500">Belum ada data pengumpulan untuk filter ini.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 <Pagination
                    currentPage={submissionPage}
                    totalPages={totalSubmissionPages}
                    onPageChange={setSubmissionPage}
                />

                {isSubmissionModalOpen && selectedSubmission && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseSubmissionModal}>
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h4 className="text-xl font-bold mb-2">Detail Pengumpulan</h4>
                            <p className="text-sm text-slate-500 mb-4">Misi: {selectedSubmission.misiTitle} oleh {selectedSubmission.user}</p>
                            <div className="space-y-4 border-t pt-4">
                                {selectedSubmission.data.map(field => (
                                    <div key={field.fieldId}>
                                        <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                                        {typeof field.value === 'string' ? (
                                            <p className="mt-1 p-2 bg-slate-100 rounded-md">{field.value}</p>
                                        ) : (
                                            <a href={field.value.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-primary hover:underline">
                                               <i className="fas fa-file"></i> {field.value.fileName}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseSubmissionModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300" disabled={loading}>Tutup</button>
                                <button type="button" onClick={() => handleUpdateStatus(selectedSubmission.id, 'Rejected')} className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 disabled:opacity-50" disabled={loading}>
                                    {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Memproses...</> : <><i className="fas fa-times-circle mr-2"></i>Tolak</>}
                                </button>
                                <button type="button" onClick={() => handleUpdateStatus(selectedSubmission.id, 'Approved')} className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50" disabled={loading}>
                                    {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Memproses...</> : <><i className="fas fa-check-circle mr-2"></i>Setujui</>}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-bold text-secondary">Manajemen Misi Cuan</h3>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Cari misi atau partner..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button onClick={handleDownloadTemplate} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition shrink-0">
                       <i className="fas fa-file-download mr-2"></i>Template
                    </button>
                    <button onClick={() => handleOpenMisiModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                        <i className="fas fa-plus mr-2"></i>Tambah Misi
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Judul Misi</th>
                            <th scope="col" className="px-6 py-3">Partner</th>
                            <th scope="col" className="px-6 py-3">Tgl Berlaku</th>
                            <th scope="col" className="px-6 py-3">Kuota</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMisiList.map(m => (
                            <tr key={m.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    <button onClick={() => handleViewSubmissionsFor(m)} className="text-primary hover:underline font-semibold text-left">
                                        {m.title}
                                    </button>
                                </td>
                                <td className="px-6 py-4">{m.company}</td>
                                <td className="px-6 py-4">{formatDisplayDate(m.expiryDate)}</td>
                                <td className="px-6 py-4">{m.submissions}/{m.quota}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenMisiModal(m)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDeleteMisi(m.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={misiPage}
                totalPages={totalMisiPages}
                onPageChange={setMisiPage}
            />

             {isMisiModalOpen && currentMisi && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-[51] flex justify-center items-center p-4" onClick={handleCloseMisiModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentMisi.id ? 'Edit' : 'Tambah'} Misi Cuan</h4>
                        <form onSubmit={handleSaveMisi} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Judul Misi</label>
                                <input type="text" name="title" value={currentMisi.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Partner</label>
                                    <input type="text" name="company" value={currentMisi.company} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Reward</label>
                                    <input type="text" name="reward" value={currentMisi.reward} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Logo Partner</label>
                                    <input type="text" name="logo" value={currentMisi.logo} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://example.com/logo.png" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Estimasi Pengerjaan</label>
                                    <select name="time" value={currentMisi.time} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white" required >
                                        <option>5 Menit</option><option>10 Menit</option><option>15 Menit</option><option>30 Menit</option><option>1 Jam</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Tanggal Berlaku</label>
                                    <input type="date" name="expiryDate" value={currentMisi.expiryDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Kuota Misi</label>
                                    <input type="number" name="quota" value={currentMisi.quota} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" min="0" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Jumlah Pengumpulan</label>
                                    <input type="number" name="submissions" value={currentMisi.submissions} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" min="0" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
                                <textarea name="description" value={currentMisi.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Langkah-langkah Misi</label>
                                <textarea name="steps" value={currentMisi.steps || ''} onChange={handleInputChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Satu langkah per baris"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Form Pengumpulan Kustom</label>
                                <div className="mt-1 p-3 border border-slate-300 rounded-md space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600">Instruksi Pengumpulan</label>
                                         <textarea name="submissionRequirement" value={currentMisi.submissionRequirement} onChange={handleInputChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Jelaskan apa saja yang harus dikumpulkan pengguna"/>
                                    </div>
                                    <label className="block text-xs font-medium text-slate-600">Field Form</label>
                                    {currentMisi.submissionFields?.map((field) => (
                                        <div key={field.id} className="flex items-center gap-2">
                                            <input type="text" name="label" value={field.label} onChange={(e) => handleFieldChange(field.id, e)} placeholder="Label Field" className="flex-grow px-2 py-1 border border-slate-300 rounded-md text-sm" />
                                            <select name="type" value={field.type} onChange={(e) => handleFieldChange(field.id, e)} className="px-2 py-1 border border-slate-300 rounded-md text-sm bg-white" >
                                                <option value="text">Teks</option><option value="file">File</option><option value="url">URL/Link</option>
                                            </select>
                                            <button type="button" onClick={() => handleRemoveField(field.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={handleAddField} className="text-sm text-primary font-medium hover:text-blue-700">+ Tambah Field</button>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseMisiModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300" disabled={loading}>Batal</button>
                                <button type="button" onClick={() => onShowPreview('misi', currentMisi)} className="bg-slate-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600" disabled={loading}>
                                    <i className="fas fa-eye mr-2"></i>Preview Detail
                                </button>
                                <button type="button" onClick={() => onShowPreview('misiSubmissionForm', currentMisi)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600" disabled={loading}>
                                    <i className="fas fa-tasks mr-2"></i>Preview Form
                                </button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
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

export default AdminMisi;