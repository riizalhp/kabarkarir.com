
import React, { useState } from 'react';

const consultants = [
  {
    name: 'Rina S.Psi',
    title: 'Spesialis Rekrutmen BUMN',
    image: 'https://picsum.photos/seed/hr1/200/200',
    bio: 'Berpengalaman 8 tahun sebagai HRD di beberapa perusahaan BUMN ternama. Siap membantumu lolos seleksi administrasi hingga wawancara akhir.'
  },
  {
    name: 'Budi Hartono, M.M.',
    title: 'Pakar Karir Industri Teknologi',
    image: 'https://picsum.photos/seed/hr2/200/200',
    bio: 'Memiliki latar belakang sebagai tech recruiter di startup unicorn. Ahli dalam review portofolio, CV, dan persiapan technical interview.'
  },
  {
    name: 'Citra Dewi',
    title: 'Pembimbing Fresh Graduate',
    image: 'https://picsum.photos/seed/hr3/200/200',
    bio: 'Berfokus membantu mahasiswa dan lulusan baru untuk menemukan jalur karir yang tepat dan mempersiapkan diri masuk dunia kerja pertama kali.'
  }
];

const packages = [
  {
    name: 'Sesi Cepat',
    price: 'Rp 150.000',
    duration: '30 Menit',
    features: ['Review CV Cepat', 'Tanya Jawab Singkat', 'Sesi Online via Zoom/GMeet'],
    isPopular: false,
  },
  {
    name: 'Sesi Mendalam',
    price: 'Rp 250.000',
    duration: '60 Menit',
    features: ['Analisis Karir Mendalam', 'Simulasi Wawancara', 'Rencana Pengembangan Diri', 'Sesi Online via Zoom/GMeet'],
    isPopular: true,
  },
  {
    name: 'Paket Komplit',
    price: 'Rp 400.000',
    duration: '2x 60 Menit',
    features: ['Semua di Sesi Mendalam', 'Review CV & LinkedIn', 'Follow-up Session', 'Dukungan via Chat 1 Minggu'],
    isPopular: false,
  },
];

const faqs = [
  {
    question: 'Bagaimana proses konsultasi berlangsung?',
    answer: 'Setelah Anda memilih konsultan dan paket, Anda akan diminta untuk memilih jadwal yang tersedia. Sesi akan dilakukan secara online melalui platform seperti Google Meet atau Zoom.'
  },
  {
    question: 'Apa saja yang perlu saya siapkan sebelum sesi?',
    answer: 'Sangat disarankan untuk menyiapkan CV terbaru Anda, daftar pertanyaan yang ingin Anda diskusikan, dan deskripsi pekerjaan dari posisi yang Anda incar (jika ada).'
  },
  {
    question: 'Apakah ada jaminan saya akan dapat pekerjaan?',
    answer: 'Kami tidak bisa menjamin Anda akan langsung mendapatkan pekerjaan, karena itu tergantung pada banyak faktor. Namun, kami menjamin Anda akan lebih siap, percaya diri, dan memiliki strategi yang lebih baik dalam proses pencarian kerja Anda.'
  }
];

const FaqItem: React.FC<{ faq: { question: string, answer: string } }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left">
                <span className="font-medium text-secondary">{faq.question}</span>
                <i className={`fas fa-chevron-down transform transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isOpen && <div className="pb-4 text-gray-600">{faq.answer}</div>}
        </div>
    );
};

const KonsulKarirPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Dapatkan Bimbingan Karir Profesional</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">Diskusi langsung dengan para ahli HR untuk meroketkan karirmu. Atasi kebingungan, siapkan wawancara, dan negosiasi gaji dengan percaya diri.</p>
          <a href="#packages" className="mt-8 inline-block bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300">Lihat Paket Konsultasi</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-secondary">Mengapa Perlu Konsultasi Karir?</h2>
             <p className="text-gray-600 mt-2">Investasi kecil untuk lompatan karir yang besar.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div className="bg-white p-6 rounded-lg shadow">
               <i className="fas fa-bullseye fa-3x text-primary mb-4"></i>
               <h3 className="font-semibold text-xl text-secondary">Arah Karir Jelas</h3>
               <p className="text-gray-600 mt-2">Dapatkan kejelasan tentang jalur karir yang paling sesuai dengan potensi dan minatmu.</p>
             </div>
             <div className="bg-white p-6 rounded-lg shadow">
               <i className="fas fa-user-tie fa-3x text-primary mb-4"></i>
               <h3 className="font-semibold text-xl text-secondary">Siap Wawancara</h3>
               <p className="text-gray-600 mt-2">Berlatih menjawab pertanyaan sulit dan tampil memukau di hadapan rekruter.</p>
             </div>
             <div className="bg-white p-6 rounded-lg shadow">
               <i className="fas fa-hand-holding-usd fa-3x text-primary mb-4"></i>
               <h3 className="font-semibold text-xl text-secondary">Negosiasi Gaji</h3>
               <p className="text-gray-600 mt-2">Pelajari strategi untuk mendapatkan kompensasi yang layak sesuai dengan nilaimu.</p>
             </div>
           </div>
        </div>
      </section>
      
      {/* Consultants Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">Temui Konsultan Ahli Kami</h2>
            <p className="text-gray-600 mt-2">Dipilih berdasarkan pengalaman dan rekam jejak yang terbukti.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultants.map(consultant => (
              <div key={consultant.name} className="bg-gray-50 rounded-lg shadow p-6 text-center flex flex-col">
                <img src={consultant.image} alt={consultant.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary" />
                <h3 className="font-bold text-xl text-secondary">{consultant.name}</h3>
                <p className="text-primary font-medium">{consultant.title}</p>
                <p className="text-gray-600 mt-4 flex-grow">{consultant.bio}</p>
                <button className="mt-6 bg-secondary hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition w-full">Pilih Konsultan</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section id="packages" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">Pilih Paket yang Sesuai Untukmu</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map(pkg => (
              <div key={pkg.name} className={`bg-white rounded-lg shadow-lg p-8 flex flex-col relative ${pkg.isPopular ? 'border-2 border-accent' : ''}`}>
                {pkg.isPopular && <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 right-5">PALING POPULER</span>}
                <h3 className="font-bold text-2xl text-secondary">{pkg.name}</h3>
                <p className="text-gray-500">{pkg.duration}</p>
                <p className="text-4xl font-bold text-primary my-6">{pkg.price}</p>
                <ul className="space-y-3 text-gray-600 flex-grow">
                  {pkg.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full font-bold py-3 px-6 rounded-lg transition ${pkg.isPopular ? 'bg-accent text-white hover:bg-opacity-90' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                  Pesan Sesi
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-secondary">Pertanyaan yang Sering Diajukan</h2>
              </div>
              <div className="space-y-2">
                  {faqs.map((faq, index) => <FaqItem key={index} faq={faq} />)}
              </div>
          </div>
      </section>

    </div>
  );
};

export default KonsulKarirPage;
