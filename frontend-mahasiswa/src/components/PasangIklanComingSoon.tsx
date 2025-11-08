import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const PasangIklanComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Pasang Iklan"
      description="Promosikan lowongan, event, atau produk Anda kepada ribuan mahasiswa dan fresh graduate"
      features={[
        'Iklan Lowongan Kerja',
        'Promosi Event Kampus',
        'Banner Advertisement',
        'Sponsored Content',
        'Targeting Mahasiswa Spesifik',
        'Real-time Analytics',
        'Flexible Pricing Plans',
        'Dedicated Account Manager'
      ]}
      estimatedLaunch="Q2 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default PasangIklanComingSoon;
