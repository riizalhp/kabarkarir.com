import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const KomunitasComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Komunitas"
      description="Forum diskusi dan networking untuk mahasiswa, fresh graduate, dan profesional muda"
      features={[
        'Discussion Forum',
        'Career Tips & Sharing',
        'Q&A dengan Professionals',
        'Study Group Online',
        'Networking Events',
        'Mentorship Program',
        'Job Referral System',
        'Success Stories'
      ]}
      estimatedLaunch="Q2 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default KomunitasComingSoon;
