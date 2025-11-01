import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminUsers from './sections/AdminUsers';
import { AdminUser } from '../types';
import { INITIAL_ADMIN_USERS } from '../constants';

interface UsersPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
}

const UsersPage: React.FC<UsersPageProps> = ({ onNavigateHome, onLogout }) => {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  return (
    <AdminLayout currentSection="users" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminUsers users={users} setUsers={setUsers} />
    </AdminLayout>
  );
};

export default UsersPage;
