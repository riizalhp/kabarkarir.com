import React from 'react';

const ChartBar: React.FC<{ label: string; value: number; maxValue: number; color: string }> = ({ label, value, maxValue, color }) => (
    <div className="flex items-center">
        <div className="w-1/3 text-sm text-slate-600 text-right pr-4">{label}</div>
        <div className="w-2/3 bg-slate-200 rounded-full h-6">
            <div
                className={`h-6 rounded-full ${color} flex items-center justify-start pl-2`}
                style={{ width: `${(value / maxValue) * 100}%` }}
            >
                <span className="text-white font-bold text-xs">{value.toLocaleString()}</span>
            </div>
        </div>
    </div>
);

const AdminAnalytics: React.FC = () => {
    const articleViews = [
        { label: 'Panduan Lolos BUMN', value: 12450 },
        { label: 'Kesalahan CV', value: 9870 },
        { label: 'Menjawab Kelemahan', value: 8123 },
    ];
    const jobApplicants = [
        { label: 'MT Pertamina', value: 2150 },
        { label: 'Staff Admin Dahana', value: 1890 },
        { label: 'CS Telkom (Remote)', value: 1532 },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-secondary mb-4">Artikel Paling Banyak Dilihat</h3>
                <div className="space-y-3">
                    {articleViews.map(item => (
                        <ChartBar key={item.label} label={item.label} value={item.value} maxValue={15000} color="bg-blue-500" />
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-secondary mb-4">Lowongan Paling Banyak Pelamar</h3>
                 <div className="space-y-3">
                    {jobApplicants.map(item => (
                        <ChartBar key={item.label} label={item.label} value={item.value} maxValue={2500} color="bg-green-500" />
                    ))}
                </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-secondary mb-4">Penyelesaian Misi Cuan</h3>
                <div className="space-y-3">
                    <ChartBar label="Install Shopee" value={820} maxValue={1000} color="bg-orange-500" />
                    <ChartBar label="Isi Survei" value={450} maxValue={1000} color="bg-orange-500" />
                    <ChartBar label="Tonton TikTok" value={150} maxValue={1000} color="bg-orange-500" />
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
