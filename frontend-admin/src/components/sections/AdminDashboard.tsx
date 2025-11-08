import React, { useState } from 'react';
import { Activity } from '../../types';
import Pagination from '../Pagination';

interface StatCardProps {
    icon: string;
    title: string;
    value: string;
    change: number;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color }) => {
    const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
    const changeIcon = change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
    const changeText = change >= 0 ? `+${change}` : `${change}`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}>
                <i className={icon}></i>
            </div>
            <div>
                <p className="text-slate-500 font-medium">{title}</p>
                 <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-secondary">{value}</p>
                    <span className={`font-semibold text-sm ${changeColor}`}>
                        <i className={changeIcon}></i> {changeText}
                    </span>
                </div>
            </div>
        </div>
    );
};

interface AdminDashboardProps {
    recentActivities: Activity[];
    jobCount: number;
    jobChange: number;
    companyCount: number;
    companyChange: number;
    misiCount: number;
    misiChange: number;
    submissionCount: number;
    submissionChange: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const timeSince = (date: Date | string | undefined): string => {
    if (!date) return "Baru saja";
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        
        // Check if date is valid
        if (isNaN(dateObj.getTime())) return "Baru saja";
        
        const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
        
        // If date is in the future, return "Baru saja"
        if (seconds < 0) return "Baru saja";
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " tahun lalu";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " bulan lalu";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " hari lalu";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " jam lalu";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " menit lalu";
        return "Baru saja";
    } catch (error) {
        console.error('Error parsing date:', error);
        return "Baru saja";
    }
};

const ITEMS_PER_PAGE = 12;

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    recentActivities, 
    jobCount, 
    jobChange, 
    companyCount, 
    companyChange, 
    misiCount, 
    misiChange, 
    submissionCount, 
    submissionChange,
    currentPage,
    totalPages,
    onPageChange
}) => {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon="fas fa-briefcase" title="Lowongan Aktif" value={jobCount.toLocaleString('id-ID')} change={jobChange} color="bg-orange-500" />
                <StatCard icon="fas fa-building" title="Perusahaan Partner" value={companyCount.toLocaleString('id-ID')} change={companyChange} color="bg-purple-500" />
                <StatCard icon="fas fa-coins" title="Misi Cuan Aktif" value={misiCount.toLocaleString('id-ID')} change={misiChange} color="bg-green-500" />
                <StatCard icon="fas fa-tasks" title="Total Pengumpulan Misi" value={submissionCount.toLocaleString('id-ID')} change={submissionChange} color="bg-blue-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 className="font-bold text-lg text-secondary mb-4">Aktivitas Terbaru</h3>
                    <ul className="space-y-4 flex-grow">
                        {recentActivities.length > 0 ? (
                            recentActivities.map(activity => {
                                const iconInfo = {
                                    CREATE: { icon: 'fas fa-plus', color: 'bg-green-100 text-green-600' },
                                    UPDATE: { icon: 'fas fa-edit', color: 'bg-blue-100 text-blue-600' },
                                    DELETE: { icon: 'fas fa-trash', color: 'bg-red-100 text-red-600' },
                                }[activity.type];

                                return (
                                    <li key={activity.id} className="flex items-center space-x-3">
                                        <div className={`rounded-full w-8 h-8 flex items-center justify-center shrink-0 ${iconInfo.color}`}>
                                            <i className={iconInfo.icon}></i>
                                        </div>
                                        <p className="text-sm flex-1">{activity.text}</p>
                                        <span className="text-xs text-slate-400 ml-auto whitespace-nowrap">{timeSince(activity.timestamp)}</span>
                                    </li>
                                );
                            })
                        ) : (
                             <li className="text-center text-sm text-slate-500 py-4">Belum ada aktivitas terbaru.</li>
                        )}
                    </ul>
                     {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    )}
                </div>

                {/* Top Performing */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg text-secondary mb-4">Kinerja Terbaik</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm font-medium">Lowongan Paling Banyak Dilihat</p>
                            <p className="text-secondary"><strong>Management Trainee</strong> - PT Pertamina</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium">Artikel Paling Populer</p>
                            <p className="text-secondary"><strong>Panduan Lengkap Lolos Tes TKD dan Core Values BUMN</strong></p>
                        </div>
                         <div>
                            <p className="text-sm font-medium">Event Paling Diminati</p>
                            <p className="text-secondary"><strong>BUMN Career Fair 2024</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;