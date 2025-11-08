import React from 'react';
import ComingSoonPage from './ComingSoonPage';

const PsikotestComingSoon: React.FC = () => {
  return (
    <ComingSoonPage
      title="Psikotes Online"
      description="Platform latihan psikotes lengkap untuk persiapan rekrutmen BUMN dan perusahaan swasta"
      features={[
        'Tes Kemampuan Verbal',
        'Tes Kemampuan Numerik',
        'Tes Kemampuan Logika',
        'Tes Kepribadian',
        'Tes Kraepelin & Pauli',
        'Pembahasan Detail Soal',
        'Simulasi Tes Real-Time',
        'Skor & Analisis Hasil'
      ]}
      estimatedLaunch="Q1 2025"
      backLink="/"
      backText="Kembali ke Beranda"
    />
  );
};

export default PsikotestComingSoon;
