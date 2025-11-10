import React, { useState, useEffect } from 'react';
import { Major } from '../../types';
import { toast } from '../../utils/toast';
import { downloadExcelTemplate } from '../../utils/excel';
import Pagination from '../Pagination';
import { adminMajorsService } from '../../services/adminApi';

// Beri tahu TypeScript tentang objek XLSX global dari CDN
declare const XLSX: any;

interface AdminMajorsProps {
    majors: Major[];
    setMajors: React.Dispatch<React.SetStateAction<Major[]>>;
}

const ITEMS_PER_PAGE = 15;

const AdminMajors: React.FC<AdminMajorsProps> = ({ majors, setMajors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMajor, setCurrentMajor] = useState<Partial<Major> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    
    useEffect(() => {
        fetchMajors();
    }, []);

    const fetchMajors = async () => {
        try {
            setDataLoading(true);
            const data = await adminMajorsService.getAll();
            setMajors(data);
        } catch (error) {
            console.error('Error fetching majors:', error);
            toast('Gagal memuat data jurusan');
        } finally {
            setDataLoading(false);
        }
    };
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (major: Partial<Major> | null = null) => {
        setCurrentMajor(major ? { ...major } : { name: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentMajor(null);
    };

    const handleDelete = async (majorId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus jurusan ini? Ini dapat mempengaruhi data lowongan yang ada.')) {
            try {
                setLoading(true);
                await adminMajorsService.delete(majorId);
                setMajors(prevMajors => prevMajors.filter(m => m.id !== majorId));
                toast('Jurusan berhasil dihapus');
            } catch (error) {
                console.error('Error deleting major:', error);
                toast('Gagal menghapus jurusan');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMajor || !currentMajor.name?.trim()) return;

        try {
            setLoading(true);
            
            if (currentMajor.id) {
                // Update (not commonly used for majors, but keeping for consistency)
                const updated = await adminMajorsService.create({ name: currentMajor.name.trim() });
                setMajors(prevMajors => prevMajors.map(m => m.id === currentMajor.id ? updated : m));
                toast('Jurusan berhasil diperbarui');
            } else {
                // Create
                const newMajor = await adminMajorsService.create({ name: currentMajor.name.trim() });
                setMajors(prevMajors => [newMajor, ...prevMajors]);
                toast('Jurusan berhasil ditambahkan');
            }
            
            handleCloseModal();
        } catch (error) {
            console.error('Error saving major:', error);
            toast('Gagal menyimpan jurusan');
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentMajor) {
            setCurrentMajor({ ...currentMajor, [e.target.name]: e.target.value });
        }
    };
    
    const handleFileImport = async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                setLoading(true);
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet);

                if (json.length === 0) {
                    toast('File kosong atau format tidak sesuai.');
                    setLoading(false);
                    return;
                }

                let successCount = 0;
                let errorCount = 0;
                const newMajors: Major[] = [];

                for (const row of json) {
                    try {
                        const name = row['Nama Jurusan'] || row['name'];
                        if (!name || String(name).trim() === '') {
                            errorCount++;
                            continue;
                        }
                        
                        // Create major in database
                        const newMajor = await adminMajorsService.create({
                            name: String(name).trim(),
                        });
                        
                        newMajors.push(newMajor);
                        successCount++;
                    } catch (error) {
                        console.error('Error creating major:', error);
                        errorCount++;
                    }
                }
                
                if (successCount > 0) {
                    setMajors(prev => [...newMajors, ...prev]);
                    toast(`${successCount} jurusan berhasil diimpor ke database.`);
                }
                
                if (errorCount > 0) {
                    toast(`${errorCount} baris gagal diimpor. Periksa format data.`);
                }
                
                if (successCount === 0 && errorCount === 0) {
                    toast('Tidak ada jurusan valid yang ditemukan di file.');
                }

            } catch (error) {
                console.error("Error importing file:", error);
                toast('Gagal mengimpor file. Pastikan formatnya benar.');
            } finally {
                setLoading(false);
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
        downloadExcelTemplate(['Nama Jurusan'], 'Template_Import_Jurusan');
    };

    const filteredMajors = majors
        .filter(major => major.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const totalPages = Math.ceil(filteredMajors.length / ITEMS_PER_PAGE);
    const currentMajorsList = filteredMajors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (dataLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center py-12">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <span className="ml-3 text-lg text-slate-600">Memuat data jurusan...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <h3 className="text-lg font-bold text-secondary">Manajemen Jurusan Kuliah</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Cari jurusan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md"
                    />
                    <button onClick={handleDownloadTemplate} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition shrink-0">
                       <i className="fas fa-file-download mr-2"></i>Template
                    </button>
                    <div className="relative group">
                        <button onClick={triggerImport} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition shrink-0">
                            <i className="fas fa-file-excel mr-2"></i>Impor
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-72 bg-slate-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Impor dari file .xlsx. <br/>
                            File harus memiliki satu kolom dengan header: <strong>"Nama Jurusan"</strong>.
                            <div className="absolute top-full right-4 -ml-1 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                    </div>
                    <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition shrink-0">
                        <i className="fas fa-plus mr-2"></i>Tambah Jurusan
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Nama Jurusan</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMajorsList.map(major => (
                            <tr key={major.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4">{major.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{major.name}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(major)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(major.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
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

             {isModalOpen && currentMajor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentMajor.id ? 'Edit' : 'Tambah'} Jurusan</h4>
                        <form onSubmit={handleSave}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nama Jurusan</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={currentMajor.name || ''} 
                                    onChange={handleInputChange} 
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" 
                                    required 
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300" disabled={loading}>Batal</button>
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

export default AdminMajors;