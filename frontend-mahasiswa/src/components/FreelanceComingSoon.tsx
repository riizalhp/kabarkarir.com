import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const FreelanceComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Freelance Jobs"
      description="Marketplace untuk project-based work dan freelance opportunities"
      features={[
        'Web & App Development Projects',
        'Design & Creative Works',
        'Content Writing & Translation',
        'Digital Marketing Services',
        'Video & Audio Production',
        'Secure Payment System',
        'Review & Rating System',
        'Dispute Resolution'
      ]}
      estimatedLaunch="Q2 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default FreelanceComingSoon;
