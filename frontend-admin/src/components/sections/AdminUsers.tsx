import React, { useState } from 'react';
import { AdminUser } from '../../types';
import Pagination from '../Pagination';

interface AdminUsersProps {
    users: AdminUser[];
    setUsers: React.Dispatch<React.SetStateAction<AdminUser[]>>;
}

const ITEMS_PER_PAGE = 10;

const AdminUsers: React.FC<AdminUsersProps> = ({ users, setUsers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<Partial<AdminUser> & { password?: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleOpenModal = (user: Partial<AdminUser> | null = null) => {
        setCurrentUser(user ? { ...user } : { name: '', email: '', role: 'Content Manager', password: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleDelete = (userId: number) => {
        if (users.length <= 1) {
            alert('Tidak dapat menghapus admin terakhir.');
            return;
        }
        if (window.confirm('Apakah Anda yakin ingin menghapus admin ini?')) {
            setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;

        if (currentUser.id) {
            // Update
            const updatedUser = {
                id: currentUser.id,
                name: currentUser.name || '',
                email: currentUser.email || '',
                role: currentUser.role || 'Content Manager',
            }
            setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
        } else {
            // Create
            if (!currentUser.password) {
                alert('Password wajib diisi untuk admin baru.');
                return;
            }
            const newUser: AdminUser = {
                id: Math.max(...users.map(u => u.id), 0) + 1,
                name: currentUser.name || '',
                email: currentUser.email || '',
                role: currentUser.role || 'Content Manager',
            };
            setUsers(prevUsers => [newUser, ...prevUsers]);
        }
        handleCloseModal();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (currentUser) {
            setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
        }
    };

    const roleColor: { [key in AdminUser['role']]: string } = {
        'Super Admin': 'bg-red-200 text-red-800',
        'Content Manager': 'bg-blue-200 text-blue-800',
    };

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const currentUsersList = users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-secondary">Daftar Pengguna Admin</h3>
                <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    <i className="fas fa-plus mr-2"></i>Tambah Admin
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nama</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsersList.map(user => (
                            <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColor[user.role]}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-800" title="Edit"><i className="fas fa-edit"></i></button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800" title="Hapus"><i className="fas fa-trash"></i></button>
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

            {isModalOpen && currentUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{currentUser.id ? 'Edit' : 'Tambah'} Admin</h4>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                                <input type="text" name="name" value={currentUser.name || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Email</label>
                                <input type="email" name="email" value={currentUser.email || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Role</label>
                                <select name="role" value={currentUser.role} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-white">
                                    <option>Content Manager</option>
                                    <option>Super Admin</option>
                                </select>
                            </div>
                            {!currentUser.id && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Password</label>
                                    <input type="password" name="password" value={currentUser.password || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" required />
                                </div>
                            )}
                             <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={handleCloseModal} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-medium hover:bg-slate-300">Batal</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;