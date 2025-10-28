import * as React from 'react';
import { BlogPost, Activity } from '../../types';
import RichTextEditor from '../RichTextEditor';
import Pagination from '../Pagination';
import { adminBlogService, activityLogsService } from '../../services/adminApi';
import { toast } from '../../utils/toast';

interface AdminArticlesProps {
  articles: BlogPost[];
  setArticles: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  onShowPreview: (type: 'article', data: any) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const ITEMS_PER_PAGE = 10;

const AdminArticles: React.FC<AdminArticlesProps> = ({ articles, setArticles, onShowPreview, addActivity }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [currentArticle, setCurrentArticle] = React.useState<Partial<BlogPost> | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [dataLoading, setDataLoading] = React.useState(true);

    React.useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setDataLoading(true);
            const data = await adminBlogService.getAll();
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles:', error);
            toast('Gagal memuat data artikel');
        } finally {
            setDataLoading(false);
        }
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (article: Partial<BlogPost> | null = null) => {
        setCurrentArticle(article ? { ...article } : { title: '', category: 'Tips Karir', description: '', content: '', image: '', categoryColor: 'blue' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentArticle(null);
    };

    const handleDelete = async (articleId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            try {
                setLoading(true);
                const articleToDelete = articles.find(a => a.id === articleId);
                
                await adminBlogService.delete(articleId);
                setArticles(prevArticles => prevArticles.filter(a => a.id !== articleId));
                
                if (articleToDelete) {
                    await activityLogsService.create({
                        type: 'DELETE',
                        category: 'Artikel',
                        text: `Artikel "${articleToDelete.title}" dihapus.`,
                    });
                    
                    addActivity({
                        type: 'DELETE',
                        category: 'Artikel',
                        text: `Artikel "${articleToDelete.title}" dihapus.`
                    });
                }
                
                toast('Artikel berhasil dihapus');
            } catch (error) {
                console.error('Error deleting article:', error);
                toast('Gagal menghapus artikel');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentArticle) return;

        try {
            setLoading(true);
            
            // Generate description from content if description is empty
            const description = currentArticle.description || (currentArticle.content || '').replace(/<[^>]+>/g, '').substring(0, 150) + '...';
            const finalArticle = { ...currentArticle, description };

            if (finalArticle.id) {
                // Update
                const updated = await adminBlogService.update(finalArticle.id, finalArticle);
                setArticles(prevArticles => prevArticles.map(a => a.id === finalArticle.id ? updated : a));
                
                await activityLogsService.create({
                    type: 'UPDATE',
                    category: 'Artikel',
                    text: `Artikel "${finalArticle.title}" diperbarui.`,
                });
                
                addActivity({
                    type: 'UPDATE',
                    category: 'Artikel',
                    text: `Artikel "${finalArticle.title}" diperbarui.`
                });
                
                toast('Artikel berhasil diperbarui');
            } else {
                // Create
                const newArticle = await adminBlogService.create({
                    ...finalArticle,
                    posted: new Date().toISOString(),
                    image: finalArticle.image || 'https://picsum.photos/seed/newblog/400/300',
                    categoryColor: 'blue',
                } as Omit<BlogPost, 'id'>);
                
                setArticles(prevArticles => [newArticle, ...prevArticles]);
                
                await activityLogsService.create({
                    type: 'CREATE',
                    category: 'Artikel',
                    text: `Artikel baru ditambahkan: "${newArticle.title}".`,
                });
                
                addActivity({
                    type: 'CREATE',
                    category: 'Artikel',
                    text: `Artikel baru ditambahkan: "${newArticle.title}".`
                });
                
                toast('Artikel berhasil ditambahkan');
            }
            
            handleCloseModal();
        } catch (error) {
            console.error('Error saving article:', error);
            toast('Gagal menyimpan artikel');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (currentArticle) {
            setCurrentArticle({ ...currentArticle, [e.target.name]: e.target.value });
        }
    };

    const handleContentChange = React.useCallback((newContent: string) => {
        setCurrentArticle(prev => {
            if (!prev) return null;
            return { ...prev, content: newContent };
        });
    }, []);

    const filteredArticles = React.useMemo(() => {
        return articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [articles, searchTerm]);

    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const currentArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    if (dataLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center py-12">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <span className="ml-3 text-lg text-slate-600">Memuat data artikel...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-bold text-secondary">Manajemen Artikel & Blog</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                        <i className="fas fa-plus mr-2"></i>Tambah Artikel
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Judul Artikel</th>
                            <th scope="col" className="px-6 py-3">Kategori</th>
                            <th scope="col" className="px-6 py-3">Diposting</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArticles.map(article => (
                            <tr key={article.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{article.title}</td>
                                <td className="px-6 py-4">{article.category}</td>
                                <td className="px-6 py-4">{article.posted}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(article)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
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

            {isModalOpen && currentArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentArticle.id ? 'Edit' : 'Tambah'} Artikel</h4>
                        <form onSubmit={handleSave} id="article-form" className="space-y-4 overflow-y-auto flex-1 pr-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Judul Artikel</label>
                                <input type="text" name="title" value={currentArticle.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">URL Gambar Utama</label>
                                <input type="text" name="image" value={currentArticle.image} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" placeholder="https://picsum.photos/seed/blog1/400/300" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Kategori</label>
                                <select name="category" value={currentArticle.category} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md">
                                    <option>Tips Karir</option>
                                    <option>Wawancara</option>
                                    <option>BUMN</option>
                                    <option>Fresh Graduate</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Konten Lengkap</label>
                                <RichTextEditor
                                    initialContent={currentArticle.content || ''}
                                    onChange={handleContentChange}
                                />
                            </div>
                         </form>
                         <div className="flex justify-end space-x-3 pt-4 border-t mt-6 shrink-0">
                            <button type="button" onClick={handleCloseModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300" disabled={loading}>Batal</button>
                            <button type="button" onClick={() => onShowPreview('article', currentArticle)} className="bg-slate-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600" disabled={loading}>
                                <i className="fas fa-eye mr-2"></i>Preview
                            </button>
                            <button type="submit" form="article-form" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Menyimpan...</> : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminArticles;