import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const MisiCuanComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Misi Cuan"
      description="Platform side hustle dan earning opportunities untuk mahasiswa dan fresh graduate"
      features={[
        'Micro Tasks & Freelance Gigs',
        'Paid Survey & Research',
        'Content Creation Jobs',
        'Social Media Management',
        'Data Entry & Admin Tasks',
        'Tutoring & Teaching Online',
        'Withdrawal ke Rekening Bank',
        'Track Earnings & History'
      ]}
      estimatedLaunch="Q1 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default MisiCuanComingSoon;
