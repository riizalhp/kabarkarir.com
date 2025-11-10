import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { PelatihanInfo } from '../../types';
import Pagination from '../Pagination';
import AutoResizeTextarea from '../AutoResizeTextarea';
import RichTextEditor from '../RichTextEditor';
import { adminPelatihanService } from '../../services/adminApi';
import { toast } from '../../utils/toast';

interface AdminPelatihanProps {
    courses: PelatihanInfo[];
    setCourses: React.Dispatch<React.SetStateAction<PelatihanInfo[]>>;
}

const ITEMS_PER_PAGE = 10;

const AdminPelatihan: React.FC<AdminPelatihanProps> = ({ courses, setCourses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Partial<PelatihanInfo> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setDataLoading(true);
            const data = await adminPelatihanService.getAll();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast('Gagal memuat data pelatihan');
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    const handleOpenModal = (course: Partial<PelatihanInfo> | null = null) => {
        setCurrentCourse(course ? { ...course } : { 
            title: '', 
            category: 'Sertifikasi', 
            organizer: '',
            date: '',
            location: 'Online',
            description: '',
            fullDescription: '',
            registrationLink: '',
            videoEmbedUrl: '',
            pdfEmbedUrl: '',
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCourse(null);
    };

    const handleDelete = async (courseId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus info pelatihan ini?')) {
            try {
                setLoading(true);
                await adminPelatihanService.delete(courseId);
                setCourses(prev => prev.filter(c => c.id !== courseId));
                toast('Pelatihan berhasil dihapus');
            } catch (error) {
                console.error('Error deleting course:', error);
                toast('Gagal menghapus pelatihan');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentCourse) return;

        try {
            setLoading(true);
            
            if (currentCourse.id) {
                // Update
                const updated = await adminPelatihanService.update(currentCourse.id, currentCourse);
                setCourses(prev => prev.map(c => c.id === currentCourse.id ? updated : c));
                toast('Pelatihan berhasil diperbarui');
            } else {
                // Create
                const newCourse = await adminPelatihanService.create({
                    title: currentCourse.title || '',
                    category: currentCourse.category || 'Sertifikasi',
                    organizer: currentCourse.organizer || '',
                    date: currentCourse.date || '',
                    location: currentCourse.location || 'Online',
                    description: currentCourse.description || '',
                    fullDescription: currentCourse.fullDescription || '',
                    registrationLink: currentCourse.registrationLink || '',
                    image: `https://picsum.photos/seed/course${Date.now()}/400/300`,
                    videoEmbedUrl: currentCourse.videoEmbedUrl || '',
                    pdfEmbedUrl: currentCourse.pdfEmbedUrl || '',
                });
                setCourses(prev => [newCourse, ...prev]);
                toast('Pelatihan berhasil ditambahkan');
            }
            
            handleCloseModal();
        } catch (error) {
            console.error('Error saving course:', error);
            toast('Gagal menyimpan pelatihan');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (currentCourse) {
            const { name, value } = e.target;
            setCurrentCourse({ ...currentCourse, [name]: value });
        }
    };
    
    const handleContentChange = useCallback((newContent: string) => {
        setCurrentCourse(prev => {
            if (!prev) return null;
            return { ...prev, fullDescription: newContent };
        });
    }, []);

    const filteredCourses = useMemo(() => {
        return courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [courses, searchTerm]);

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
    const currentCoursesList = filteredCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (dataLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center py-12">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <span className="ml-3 text-lg text-slate-600">Memuat data pelatihan...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-bold text-secondary">Manajemen Info Pelatihan</h3>
                <div className="flex items-center gap-2">
                     <input
                        type="text"
                        placeholder="Cari pelatihan..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                        <i className="fas fa-plus mr-2"></i>Tambah Info
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Judul Pelatihan</th>
                            <th scope="col" className="px-6 py-3">Penyelenggara</th>
                            <th scope="col" className="px-6 py-3">Tanggal</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoursesList.map(course => (
                            <tr key={course.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                                <td className="px-6 py-4">{course.organizer}</td>
                                <td className="px-6 py-4">{course.date}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(course)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
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

            {isModalOpen && currentCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentCourse.id ? 'Edit' : 'Tambah'} Info Pelatihan</h4>
                        <form onSubmit={handleSave} id="pelatihan-form" className="space-y-4 flex-1 overflow-y-auto pr-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Judul Pelatihan</label>
                                <input type="text" name="title" value={currentCourse.title || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Kategori</label>
                                <select name="category" value={currentCourse.category || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white">
                                    <option>Sertifikasi</option>
                                    <option>Bahasa Asing</option>
                                    <option>Data & Analitik</option>
                                    <option>Keuangan</option>
                                    <option>Manajemen Proyek</option>
                                    <option>Digital Marketing</option>
                                    <option>Lainnya</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Penyelenggara</label>
                                <input type="text" name="organizer" value={currentCourse.organizer || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Jadwal</label>
                                    <input type="text" name="date" value={currentCourse.date || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Cth: 15 Agu 2024" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Lokasi</label>
                                    <input type="text" name="location" value={currentCourse.location || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="Cth: Online" required />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Deskripsi Singkat (untuk kartu)</label>
                                <AutoResizeTextarea 
                                    name="description" 
                                    value={currentCourse.description || ''} 
                                    onChange={handleInputChange} 
                                    minRows={3}
                                    maxRows={10}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" 
                                    required 
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">Deskripsi Lengkap (untuk halaman detail)</label>
                                <RichTextEditor
                                    initialContent={currentCourse.fullDescription || ''}
                                    onChange={handleContentChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">URL Gambar</label>
                                <input type="text" name="image" value={currentCourse.image || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://example.com/image.jpg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Link Pendaftaran/Info</label>
                                <input type="text" name="registrationLink" value={currentCourse.registrationLink || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed Video (YouTube)</label>
                                    <input type="text" name="videoEmbedUrl" value={currentCourse.videoEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://www.youtube.com/embed/..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed PDF (Google Drive)</label>
                                    <input type="text" name="pdfEmbedUrl" value={currentCourse.pdfEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://drive.google.com/.../preview" />
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end space-x-3 pt-4 border-t mt-6 shrink-0">
                            <button type="button" onClick={handleCloseModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300" disabled={loading}>Batal</button>
                            <button type="submit" form="pelatihan-form" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...</> : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPelatihan;