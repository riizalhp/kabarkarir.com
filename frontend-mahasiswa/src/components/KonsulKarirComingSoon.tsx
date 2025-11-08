import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const KonsulKarirComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Konsul Karir"
      description="Konsultasi karir one-on-one dengan career expert dan profesional berpengalaman"
      features={[
        'Konsultasi dengan Career Coach',
        'Review CV & Portfolio',
        'Mock Interview Session',
        'Career Path Planning',
        'Job Search Strategy',
        'Salary Negotiation Tips',
        'Personal Branding Guidance',
        'Video Call & Chat Support'
      ]}
      estimatedLaunch="Q2 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default KonsulKarirComingSoon;
