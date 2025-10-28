import React, { useState, useMemo, useEffect } from 'react';
import { PelatihanInfo, Company, RecruitmentEvent, BlogPost } from '../types';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import { toast } from '../utils/toast';
import { isPelatihanFavorite, addFavoritePelatihan, removeFavoritePelatihan } from '../utils/favorites';


interface PelatihanPageProps {
  pelatihanList: PelatihanInfo[];
  onSelectPelatihan: (pelatihanId: number) => void;
  onNavigateToBlog: () => void;
  onNavigateToEventRecruitment: () => void;
  onSelectEvent: (eventId: number) => void;
  trendingCompanies: Company[];
  latestArticles: BlogPost[];
  allEvents: RecruitmentEvent[];
}

const ITEMS_PER_PAGE = 5;

const PelatihanCard: React.FC<{ pelatihan: PelatihanInfo; onSelectPelatihan: (id: number) => void; }> = ({ pelatihan, onSelectPelatihan }) => {
    const [isFavorite, setIsFavorite] = useState(isPelatihanFavorite(pelatihan.id));

    useEffect(() => {
        setIsFavorite(isPelatihanFavorite(pelatihan.id));
    }, [pelatihan.id]);

    const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite) {
            removeFavoritePelatihan(pelatihan.id);
            setIsFavorite(false);
            toast(`${pelatihan.title} telah dihapus dari favorit`);
        } else {
            addFavoritePelatihan(pelatihan.id);
            setIsFavorite(true);
            toast(`${pelatihan.title} telah ditambahkan ke favorit`);
        }
    };

    return (
        <div 
            onClick={() => onSelectPelatihan(pelatihan.id)}
            className="bg-white rounded-lg shadow p-6 flex flex-col transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full relative"
        >
            <button onClick={toggleFavorite} className={`absolute top-4 right-4 text-gray-400 hover:text-accent focus:outline-none text-xl transition-colors duration-200 z-10 ${isFavorite ? 'text-accent' : ''}`}>
                <i className={`${isFavorite ? 'fas' : 'far'} fa-bookmark`}></i>
            </button>
            
            <span className="text-xs font-medium text-primary mb-2">{pelatihan.category}</span>
            <h3 className="font-bold text-secondary text-lg mb-2 pr-8">{pelatihan.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{pelatihan.description}</p>
            
            <div className="mt-auto pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                    <i className="fas fa-building w-5 mr-2 text-gray-400" title="Penyelenggara"></i>
                    <span className="truncate">{pelatihan.organizer}</span>
                </div>
                <div className="flex items-center">
                    <i className="far fa-calendar-alt w-5 mr-2 text-gray-400" title="Jadwal"></i>
                    <span className="truncate">{pelatihan.date}</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-map-marker-alt w-5 mr-2 text-gray-400" title="Lokasi"></i>
                    <span className="truncate">{pelatihan.location}</span>
                </div>
            </div>
        </div>
    );
};


const PelatihanPage: React.FC<PelatihanPageProps> = ({ pelatihanList, onSelectPelatihan, onNavigateToBlog, onNavigateToEventRecruitment, onSelectEvent, trendingCompanies, latestArticles, allEvents }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    
    const uniqueCategories = useMemo(() => {
        const categories = new Set(pelatihanList.map(p => p.category));
        return ['Semua', ...Array.from(categories)];
    }, [pelatihanList]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const filteredPelatihan = useMemo(() => {
        return pelatihanList.filter(p => {
            const categoryMatch = selectedCategory === 'Semua' || p.category === selectedCategory;
            const searchMatch = searchTerm === '' ||
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [pelatihanList, searchTerm, selectedCategory]);
    
    const totalPages = Math.ceil(filteredPelatihan.length / ITEMS_PER_PAGE);
    const currentPelatihan = filteredPelatihan.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50">
            <section className="bg-white py-20 px-4 text-center">
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary">Info Pelatihan & Sertifikasi</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
                        Tingkatkan kompetensi dan daya saing Anda dengan mengikuti berbagai pelatihan dan program sertifikasi yang relevan dengan kebutuhan industri saat ini.
                    </p>
                </div>
            </section>
            
            <section className="py-10 px-4">
                <div className="container mx-auto">
                    {/* Filter Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-24 z-30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                            <label htmlFor="search-pelatihan" className="sr-only">Cari Pelatihan</label>
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                type="text"
                                id="search-pelatihan"
                                placeholder="Cari judul, penyelenggara, atau kata kunci..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full py-2 px-3 pl-10 focus:outline-none rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                            </div>
                            <div>
                            <label htmlFor="category-select" className="sr-only">Filter Kategori</label>
                            <select
                                id="category-select"
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3">
                            <section id="featured-courses" className="py-6">
                                {currentPelatihan.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-6">
                                            {currentPelatihan.map(pelatihan => (
                                                <PelatihanCard key={pelatihan.id} pelatihan={pelatihan} onSelectPelatihan={onSelectPelatihan} />
                                            ))}
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </>
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-lg shadow">
                                        <i className="fas fa-search fa-3x text-gray-400 mb-4"></i>
                                        <h3 className="text-xl font-semibold text-secondary">Pelatihan Tidak Ditemukan</h3>
                                        <p className="text-gray-500 mt-2">
                                            Saat ini belum ada informasi pelatihan yang sesuai dengan kriteria pencarian Anda.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </div>
                        <Sidebar 
                            onNavigateToBlog={onNavigateToBlog} 
                            onNavigateToEventRecruitment={onNavigateToEventRecruitment} 
                            onSelectEvent={onSelectEvent} 
                            trendingCompanies={trendingCompanies}
                            latestArticles={latestArticles}
                            allEvents={allEvents}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PelatihanPage;