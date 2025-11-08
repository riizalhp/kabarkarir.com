import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const BangunCVComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Bangun CV"
      description="Tools untuk membuat CV profesional dan ATS-friendly dengan mudah"
      features={[
        'Template CV Modern & Profesional',
        'ATS-Friendly Format',
        'Customizable Design',
        'Export ke PDF',
        'AI-Powered Content Suggestions',
        'Multiple Language Support',
        'Real-time Preview',
        'Download Unlimited'
      ]}
      estimatedLaunch="Q1 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default BangunCVComingSoon;
