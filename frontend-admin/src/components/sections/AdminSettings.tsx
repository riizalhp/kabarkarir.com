import React from 'react';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, MisiSubmission, PelatihanInfo, Major, Tag, AdminUser } from '../../types';
import { toast } from '../../utils/toast';

// Beri tahu TypeScript tentang objek XLSX global dari CDN
declare const XLSX: any;

interface AdminSettingsProps {
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
    users: AdminUser[];
    setUsers: React.Dispatch<React.SetStateAction<AdminUser[]>>;
}


const AdminSettings: React.FC<AdminSettingsProps> = (props) => {
    
    const handleBackup = () => {
        try {
            if (typeof XLSX === 'undefined') {
              toast("Gagal membuat file Excel. Library XLSX tidak ditemukan.");
              return;
            }

            const wb = XLSX.utils.book_new();

            const dataToBackup = {
                lowongan: props.jobs.map(j => ({
                    ...j,
                    qualifications: j.qualifications?.join('|') || '',
                    benefits: j.benefits?.join('|') || '',
                    tags: j.tags?.join(',') || '',
                    majors: j.majors?.join(',') || '',
                })),
                perusahaan: props.companies,
                artikel: props.blogPosts,
                event: props.events.map(e => ({
                    ...e,
                    participatingCompanies: JSON.stringify(e.participatingCompanies || []),
                    availablePositions: e.availablePositions?.join('|') || '',
                    whatToBring: e.whatToBring?.join('|') || '',
                })),
                misi: props.misiOffers.map(m => ({
                    ...m,
                    steps: m.steps?.join('|') || '',
                    submissionFields: JSON.stringify(m.submissionFields || []),
                })),
                submission_misi: props.misiSubmissions.map(s => ({
                    ...s,
                    data: JSON.stringify(s.data || []),
                })),
                pelatihan: props.courses,
                jurusan: props.majors,
                tags: props.tags,
                admin_users: props.users,
            };

            for (const [sheetName, data] of Object.entries(dataToBackup)) {
                if (Array.isArray(data) && data.length > 0) {
                    const ws = XLSX.utils.json_to_sheet(data);
                    XLSX.utils.book_append_sheet(wb, ws, sheetName);
                }
            }

            const today = new Date().toISOString().split('T')[0];
            XLSX.writeFile(wb, `KabarKarir_Backup_${today}.xlsx`);
            toast('Backup data berhasil diunduh.');

        } catch (error) {
            console.error("Backup failed:", error);
            toast('Gagal membuat file backup.');
        }
    };

    const handleRestore = () => {
        if (typeof XLSX === 'undefined') {
          toast("Gagal memulihkan data. Library XLSX tidak ditemukan.");
          return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = ".xlsx, .xls";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            if (!window.confirm('Anda yakin ingin memulihkan data dari file ini? Semua data saat ini akan ditimpa. Tindakan ini tidak dapat dibatalkan.')) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = new Uint8Array(event.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    let restoredCount = 0;

                    workbook.SheetNames.forEach((sheetName: string) => {
                        const ws = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(ws);
                        if (!jsonData || jsonData.length === 0) return;

                        const parseStringArray = (value: any, separator = ','): string[] => {
                            if (typeof value !== 'string' || !value) return [];
                            return value.split(separator).map(item => item.trim()).filter(Boolean);
                        };
                        const parseJsonField = (value: any, defaultValue: any[] = []) => {
                            if (typeof value !== 'string' || !value) return defaultValue;
                            try { return JSON.parse(value); } catch { return defaultValue; }
                        };

                        switch (sheetName) {
                            case 'lowongan': props.setJobs(jsonData.map((j: any) => ({ ...j, qualifications: parseStringArray(j.qualifications, '|'), benefits: parseStringArray(j.benefits, '|'), tags: parseStringArray(j.tags), majors: parseStringArray(j.majors) } as Job))); restoredCount++; break;
                            case 'perusahaan': props.setCompanies(jsonData as CompanyProfile[]); restoredCount++; break;
                            case 'artikel': props.setBlogPosts(jsonData as BlogPost[]); restoredCount++; break;
                            case 'event': props.setEvents(jsonData.map((e: any) => ({ ...e, participatingCompanies: parseJsonField(e.participatingCompanies), availablePositions: parseStringArray(e.availablePositions, '|'), whatToBring: parseStringArray(e.whatToBring, '|') } as RecruitmentEvent))); restoredCount++; break;
                            case 'misi': props.setMisiOffers(jsonData.map((m: any) => ({ ...m, steps: parseStringArray(m.steps, '|'), submissionFields: parseJsonField(m.submissionFields) } as MisiCuanOffer))); restoredCount++; break;
                            case 'submission_misi': props.setMisiSubmissions(jsonData.map((s: any) => ({ ...s, data: parseJsonField(s.data) } as MisiSubmission))); restoredCount++; break;
                            case 'pelatihan': props.setCourses(jsonData as PelatihanInfo[]); restoredCount++; break;
                            case 'jurusan': props.setMajors(jsonData as Major[]); restoredCount++; break;
                            case 'tags': props.setTags(jsonData as Tag[]); restoredCount++; break;
                            case 'admin_users': props.setUsers(jsonData as AdminUser[]); restoredCount++; break;
                        }
                    });

                    if (restoredCount > 0) toast('Data berhasil dipulihkan dari file backup.');
                    else toast('Tidak ada data yang dipulihkan. Format file mungkin tidak sesuai.');

                } catch (error) {
                    console.error("Restore failed:", error);
                    toast('Gagal memulihkan data. File mungkin rusak atau formatnya salah.');
                }
            };
            reader.readAsArrayBuffer(file);
        };
        input.click();
    };
    
    return (
        <div className="space-y-8">
            {/* Email Notification */}
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-secondary border-b pb-3 mb-4">Konfigurasi Email Notifikasi</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email Pengirim</label>
                        <input type="email" defaultValue="no-reply@kabarkarir.com" className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Nama Pengirim</label>
                        <input type="text" defaultValue="KabarKarir.com" className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <input id="notif_new_job" type="checkbox" defaultChecked className="h-4 w-4 text-primary border-slate-300 rounded" />
                        <label htmlFor="notif_new_job" className="ml-2 block text-sm text-slate-900">Kirim notifikasi saat ada lowongan baru.</label>
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Simpan Pengaturan Email</button>
                </form>
            </div>

            {/* API Keys */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-secondary border-b pb-3 mb-4">API Keys & Integrasi</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Google Play URL</label>
                        <input type="text" defaultValue="https://play.google.com/store/apps/details?id=com.kabarkarir" className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Simpan Integrasi</button>
                </form>
            </div>
             {/* Backup */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-secondary border-b pb-3 mb-4">Backup & Restore</h3>
                <div className="flex space-x-4">
                     <button onClick={handleBackup} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                        <i className="fas fa-download mr-2"></i>Backup Data
                    </button>
                     <button onClick={handleRestore} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
                        <i className="fas fa-upload mr-2"></i>Restore Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;