import React, { useState, useMemo, useRef, useEffect } from 'react';
import { RecruitmentEvent, CompanyProfile } from '../../types';
import { toast } from '../../utils/toast';
import { downloadExcelTemplate } from '../../utils/excel';
import Pagination from '../Pagination';
import AutoResizeTextarea from '../AutoResizeTextarea';
import { adminEventsService, activityLogsService } from '../../services/adminApi';

// Beri tahu TypeScript tentang objek XLSX global dari CDN
declare const XLSX: any;

const convertToInputDate = (dateStr: string | undefined): string => {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
    }
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
    }
    return '';
};

interface AdminEventsProps {
  events: RecruitmentEvent[];
  setEvents: React.Dispatch<React.SetStateAction<RecruitmentEvent[]>>;
  allCompanies: CompanyProfile[];
  onShowPreview: (type: 'event', data: any) => void;
}

const ITEMS_PER_PAGE = 10;

const AdminEvents: React.FC<AdminEventsProps> = ({ events, setEvents, allCompanies, onShowPreview }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Partial<RecruitmentEvent> | null>(null);
    const [companySearch, setCompanySearch] = useState('');
    const companySearchInputRef = useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setDataLoading(true);
            const data = await adminEventsService.getAll();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast('Gagal memuat data event');
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (event: Partial<RecruitmentEvent> | null = null) => {
        setCurrentEvent(event ? { 
            ...event,
            availablePositions: event.availablePositions || [],
            whatToBring: event.whatToBring || [],
            participatingCompanies: event.participatingCompanies || [],
        } : { 
            title: '', 
            organizer: '', 
            date: new Date().toISOString().split('T')[0],
            time: '09:00 - 17:00 WIB',
            location: '', 
            type: 'Job Fair',
            description: '',
            image: '',
            availablePositions: [],
            whatToBring: [],
            participatingCompanies: [],
            mapEmbedUrl: '',
            mapDirectionUrl: '',
            pdfEmbedUrl: '',
            videoEmbedUrl: '',
        });
        setCompanySearch('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentEvent(null);
    };

    const handleDelete = async (eventId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus event ini?')) {
            try {
                setLoading(true);
                const eventToDelete = events.find(e => e.id === eventId);
                
                await adminEventsService.delete(eventId);
                setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
                
                if (eventToDelete) {
                    await activityLogsService.create({
                        type: 'DELETE',
                        category: 'Event',
                        text: `Event "${eventToDelete.title}" dihapus.`,
                    });
                }
                
                toast('Event berhasil dihapus');
            } catch (error) {
                console.error('Error deleting event:', error);
                toast('Gagal menghapus event');
            } finally {
                setLoading(false);
            }
        }
    };
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentEvent) return;
        
        try {
            setLoading(true);
            
            const finalEventData = {
                ...currentEvent,
                availablePositions: Array.isArray(currentEvent.availablePositions) ? currentEvent.availablePositions : [],
                whatToBring: Array.isArray(currentEvent.whatToBring) ? currentEvent.whatToBring : [],
                participatingCompanies: Array.isArray(currentEvent.participatingCompanies) ? currentEvent.participatingCompanies : [],
            };

            if (finalEventData.id) {
                // Update
                const updated = await adminEventsService.update(finalEventData.id, finalEventData);
                setEvents(prevEvents => prevEvents.map(event => event.id === finalEventData.id ? updated : event));
                
                await activityLogsService.create({
                    type: 'UPDATE',
                    category: 'Event',
                    text: `Event "${finalEventData.title}" diperbarui.`,
                });
                
                toast('Event berhasil diperbarui');
            } else {
                // Create
                const newEvent = await adminEventsService.create({
                    title: finalEventData.title || '',
                    organizer: finalEventData.organizer || '',
                    date: finalEventData.date || '',
                    time: finalEventData.time || '',
                    location: finalEventData.location || '',
                    type: finalEventData.type || 'Job Fair',
                    description: finalEventData.description || '',
                    image: finalEventData.image || '',
                    availablePositions: finalEventData.availablePositions,
                    whatToBring: finalEventData.whatToBring,
                    participatingCompanies: finalEventData.participatingCompanies,
                    isFeatured: false,
                    province: finalEventData.province || '',
                    city: finalEventData.city || '',
                    mapEmbedUrl: finalEventData.mapEmbedUrl || '',
                    mapDirectionUrl: finalEventData.mapDirectionUrl || '',
                    pdfEmbedUrl: finalEventData.pdfEmbedUrl || '',
                    videoEmbedUrl: finalEventData.videoEmbedUrl || '',
                });
                
                setEvents(prevEvents => [newEvent, ...prevEvents]);
                
                await activityLogsService.create({
                    type: 'CREATE',
                    category: 'Event',
                    text: `Event baru ditambahkan: "${newEvent.title}".`,
                });
                
                toast('Event berhasil ditambahkan');
            }
            
            handleCloseModal();
        } catch (error) {
            console.error('Error saving event:', error);
            toast('Gagal menyimpan event');
        } finally {
            setLoading(false);
        }
    };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (currentEvent) {
            setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
        }
    };
    
    const handleArrayTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (currentEvent) {
            const { name, value } = e.target;
            setCurrentEvent({ ...currentEvent, [name]: value.split('\n') });
        }
    };

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

                const currentMaxId = Math.max(0, ...events.map(e => e.id));
                let nextId = currentMaxId + 1;

                const newEvents: RecruitmentEvent[] = json.map((row: any): RecruitmentEvent | null => {
                    const title = row['Judul Event'] || row['title'];
                    if (!title) return null;
                    
                    return {
                        id: nextId++,
                        title: String(title),
                        organizer: String(row['Penyelenggara'] || 'N/A'),
                        date: String(row['Tanggal'] || 'Segera'),
                        time: String(row['Waktu'] || '09:00 - 17:00 WIB'),
                        location: String(row['Lokasi'] || 'Online'),
                        province: String(row['Provinsi'] || 'Online'),
                        city: String(row['Kota'] || 'Online'),
                        type: (row['Tipe'] || 'Job Fair') as RecruitmentEvent['type'],
                        isFeatured: false,
                        image: `https://picsum.photos/seed/event${nextId}/800/450`,
                        description: String(row['Deskripsi'] || ''),
                    };
                }).filter((event): event is RecruitmentEvent => event !== null);

                if (newEvents.length > 0) {
                    setEvents(prev => [...prev, ...newEvents]);
                    toast(`${newEvents.length} event berhasil diimpor.`);
                } else {
                    toast('Tidak ada event valid yang ditemukan di file.');
                }

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
            "Judul Event", "Penyelenggara", "Tanggal", "Waktu", 
            "Lokasi", "Provinsi", "Kota", "Tipe", "Deskripsi",
            "URL Gambar", "Posisi Dibuka", "URL Map Direction", 
            "URL Map Embed", "URL Video", "URL PDF"
        ];
        const exampleData = [
            "Job Fair Tech 2025",
            "Universitas Indonesia",
            "2025-12-15",
            "09:00 - 17:00 WIB",
            "Balai Kartini, Jakarta",
            "DKI Jakarta",
            "Jakarta Pusat",
            "Job Fair",
            "Job fair khusus untuk lulusan IT dan teknologi dengan berbagai perusahaan ternama. Acara gratis dan terbuka untuk umum.",
            "https://picsum.photos/seed/jobfair1/800/400",
            "Software Engineer|Data Analyst|UI/UX Designer|Project Manager",
            "https://maps.app.goo.gl/xxxxx",
            "https://www.google.com/maps/embed?pb=xxxxx",
            "https://www.youtube.com/embed/xxxxx",
            "https://drive.google.com/file/d/xxxxx/preview"
        ];
        downloadExcelTemplate(columns, 'Template_Import_Event', exampleData);
    };

    const filteredCompanies = useMemo(() => {
        if (!companySearch || !currentEvent) return [];
        
        const addedCompanyNames = new Set(currentEvent.participatingCompanies?.map(c => c.name));
        
        return allCompanies.filter(company =>
            company.name.toLowerCase().includes(companySearch.toLowerCase()) &&
            !addedCompanyNames.has(company.name)
        );
    }, [companySearch, allCompanies, currentEvent]);

    const handleAddCompany = (company: CompanyProfile) => {
        if (!currentEvent) return;
        
        const newParticipant = {
            name: company.name,
            logo: company.logo,
            slug: company.slug,
        };
        
        const updatedParticipants = [...(currentEvent.participatingCompanies || []), newParticipant];
        
        setCurrentEvent({ ...currentEvent, participatingCompanies: updatedParticipants });
        setCompanySearch('');
        companySearchInputRef.current?.focus();
    };
    
    const handleAddNewCompanyByName = () => {
        if (!currentEvent || !companySearch.trim()) return;

        const newCompanyName = companySearch.trim();

        const isAlreadyAdded = currentEvent.participatingCompanies?.some(
            c => c.name.toLowerCase() === newCompanyName.toLowerCase()
        );

        if (isAlreadyAdded) {
            toast(`Perusahaan "${newCompanyName}" sudah ditambahkan.`);
            return;
        }

        const existingCompany = allCompanies.find(c => c.name.toLowerCase() === newCompanyName.toLowerCase());

        if (existingCompany) {
            handleAddCompany(existingCompany);
        } else {
            const newParticipant = {
                name: newCompanyName,
                logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCompanyName)}&background=random&color=fff&size=128`,
                slug: undefined,
            };

            const updatedParticipants = [...(currentEvent.participatingCompanies || []), newParticipant];
            setCurrentEvent({ ...currentEvent, participatingCompanies: updatedParticipants });
            
            setCompanySearch('');
            companySearchInputRef.current?.focus();
        }
    };

    const handleRemoveCompany = (companyName: string) => {
        if (!currentEvent) return;
        
        const updatedParticipants = currentEvent.participatingCompanies?.filter(c => c.name !== companyName);
        
        setCurrentEvent({ ...currentEvent, participatingCompanies: updatedParticipants });
    };

    const filteredEvents = useMemo(() => {
        return events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const currentEventsList = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (dataLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center py-12">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <span className="ml-3 text-lg text-slate-600">Memuat data event...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-bold text-secondary">Manajemen Event Rekrutmen</h3>
                 <div className="flex items-center gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Cari event..."
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
                        <div className="absolute bottom-full right-0 mb-2 w-80 bg-slate-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            Impor dari file .xlsx. <br/>
                            <strong>Kolom Wajib:</strong> "Judul Event".
                            <br/><strong>Kolom Opsional:</strong> "Penyelenggara", "Tanggal", "Waktu", "Lokasi", "Provinsi", "Kota", "Tipe", "Deskripsi".
                            <div className="absolute top-full right-4 -ml-1 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                    </div>
                    <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                        <i className="fas fa-plus mr-2"></i>Tambah Event
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nama Event</th>
                            <th scope="col" className="px-6 py-3">Tanggal</th>
                            <th scope="col" className="px-6 py-3">Tipe</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEventsList.map(event => (
                            <tr key={event.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{event.title}</td>
                                <td className="px-6 py-4">{event.date}</td>
                                <td className="px-6 py-4">{event.type}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(event)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
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

            {isModalOpen && currentEvent && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentEvent.id ? 'Edit' : 'Tambah'} Event</h4>
                        <form onSubmit={handleSave} id="event-form" className="space-y-4 flex-1 overflow-y-auto pr-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Nama Event</label>
                                    <input type="text" name="title" value={currentEvent.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Penyelenggara</label>
                                    <input type="text" name="organizer" value={currentEvent.organizer} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700">URL Gambar Utama</label>
                                <input type="text" name="image" value={currentEvent.image || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://example.com/gambar.jpg" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Tanggal</label>
                                    <input type="date" name="date" value={convertToInputDate(currentEvent.date)} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Tipe</label>
                                    <input list="event-types" name="type" value={currentEvent.type} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                    <datalist id="event-types">
                                        <option value="Job Fair" />
                                        <option value="Walk-in Interview" />
                                        <option value="Campus Hiring" />
                                        <option value="Virtual Job Fair" />
                                    </datalist>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Tentang Event</label>
                                <AutoResizeTextarea
                                    name="description"
                                    value={currentEvent.description || ''}
                                    onChange={handleInputChange}
                                    minRows={5}
                                    maxRows={20}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"
                                    placeholder="Jelaskan tentang event ini..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Perusahaan Partisipan</label>
                                <div className="mt-1 p-3 border border-slate-300 rounded-md space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            ref={companySearchInputRef}
                                            type="text"
                                            placeholder="Ketik nama perusahaan..."
                                            value={companySearch}
                                            onChange={(e) => setCompanySearch(e.target.value)}
                                            className="flex-grow px-3 py-2 border border-slate-300 rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddNewCompanyByName}
                                            disabled={!companySearch.trim()}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shrink-0"
                                        >
                                            Tambah Baru
                                        </button>
                                    </div>
                                    {companySearch && (
                                        <div className="max-h-40 overflow-y-auto border rounded-md">
                                            {filteredCompanies.length > 0 ? (
                                                filteredCompanies.map(company => (
                                                    <div key={company.id} className="flex justify-between items-center p-2 hover:bg-slate-100">
                                                        <div className="flex items-center gap-2">
                                                            <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                                                            <span>{company.name}</span>
                                                        </div>
                                                        <button type="button" onClick={() => handleAddCompany(company)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                                            Tambah
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-3 text-sm text-slate-500 text-center">
                                                    <p>Perusahaan tidak ada di database.</p>
                                                    <p>Klik "Tambah Baru" untuk menambahkannya.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div>
                                        <h5 className="text-xs font-semibold text-slate-600 mb-2">Perusahaan Ditambahkan:</h5>
                                        {currentEvent.participatingCompanies && currentEvent.participatingCompanies.length > 0 ? (
                                            <div className="space-y-2">
                                                {currentEvent.participatingCompanies.map((pCompany, index) => (
                                                    <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                                         <div className="flex items-center gap-2">
                                                            <img src={pCompany.logo} alt={pCompany.name} className="w-8 h-8 object-contain" />
                                                            <span>{pCompany.name}</span>
                                                        </div>
                                                        <button type="button" onClick={() => handleRemoveCompany(pCompany.name)} className="text-red-500 hover:text-red-700 text-sm">
                                                            <i className="fas fa-trash"></i> Hapus
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : <p className="text-sm text-slate-500">Belum ada perusahaan yang ditambahkan.</p>}
                                    </div>
                                </div>
                            </div>


                             <div>
                                <label className="block text-sm font-medium text-slate-700">Posisi Dibuka</label>
                                <AutoResizeTextarea 
                                    name="availablePositions" 
                                    value={Array.isArray(currentEvent.availablePositions) ? currentEvent.availablePositions.join('\n') : ''} 
                                    onChange={handleArrayTextareaChange} 
                                    minRows={4}
                                    maxRows={15}
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" 
                                    placeholder="Satu posisi per baris" 
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Lokasi Google Maps (untuk Arah)</label>
                                    <input type="text" name="mapDirectionUrl" value={currentEvent.mapDirectionUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://maps.app.goo.gl/..." />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed Google Maps</label>
                                    <input type="text" name="mapEmbedUrl" value={currentEvent.mapEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://www.google.com/maps/embed?..." />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed Video (YouTube)</label>
                                    <input type="text" name="videoEmbedUrl" value={currentEvent.videoEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://www.youtube.com/embed/..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">URL Embed PDF (Google Drive)</label>
                                    <input type="text" name="pdfEmbedUrl" value={currentEvent.pdfEmbedUrl || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://drive.google.com/.../preview" />
                                </div>
                            </div>
                         </form>
                         <div className="flex justify-end space-x-3 pt-4 border-t mt-6 shrink-0">
                            <button type="button" onClick={handleCloseModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300" disabled={loading}>Batal</button>
                             <button type="button" onClick={() => onShowPreview('event', currentEvent)} className="bg-slate-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600" disabled={loading}>
                                <i className="fas fa-eye mr-2"></i>Preview
                            </button>
                            <button type="submit" form="event-form" onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...</> : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;