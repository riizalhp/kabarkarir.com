import React from 'react';
import { TELEGRAM_LINK, INSTAGRAM_LINK } from '../constants';

const pricingPackages = [
  {
    name: 'Basic',
    price: 'Rp 150.000',
    duration: '/ 30 Hari',
    features: ['1 Slot Iklan Magang/Lomba', 'Tampil di Halaman Pencarian', 'Dasar Analitik'],
    isPopular: false,
  },
  {
    name: 'Standard',
    price: 'Rp 400.000',
    duration: '/ 30 Hari',
    features: ['3 Slot Iklan', 'Tampil di Halaman Utama', 'Logo Ditampilkan', 'Dasbor Analitik Lengkap'],
    isPopular: true,
  },
  {
    name: 'Premium',
    price: 'Rp 750.000',
    duration: '/ 30 Hari',
    features: ['5 Slot Iklan', 'Promosi di Media Sosial', 'Featured Listing', 'Dukungan Prioritas'],
    isPopular: false,
  }
];

const partnerLogos = [
  'https://picsum.photos/150/60?random=40',
  'https://picsum.photos/150/60?random=41',
  'https://picsum.photos/150/60?random=42',
  'https://picsum.photos/150/60?random=43',
  'https://picsum.photos/150/60?random=44',
  'https://picsum.photos/150/60?random=45',
];

const PasangIklanPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terima kasih! Tim kami akan segera menghubungi Anda.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Jangkau Ribuan Mahasiswa di Indonesia</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Publikasikan program magang, beasiswa, lomba, atau webinar Anda di platform mahasiswa terbesar di Indonesia.</p>
          <a href="#pricing" className="mt-8 inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition duration-300">
            Lihat Paket Harga
          </a>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Mengapa Memasang Iklan di Sini?</h2>
            <p className="text-gray-600 mt-2">Platform terpercaya untuk menghubungkan organisasi dengan mahasiswa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <i className="fas fa-users fa-3x text-blue-600 mb-4"></i>
              <h3 className="font-semibold text-xl text-gray-900">Jangkauan Luas</h3>
              <p className="text-gray-600 mt-2">Akses ke ribuan mahasiswa aktif dari berbagai universitas di seluruh Indonesia.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <i className="fas fa-bullseye fa-3x text-blue-600 mb-4"></i>
              <h3 className="font-semibold text-xl text-gray-900">Target Tepat Sasaran</h3>
              <p className="text-gray-600 mt-2">Iklan Anda dilihat oleh mahasiswa dengan minat dan kualifikasi yang relevan.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
              <i className="fas fa-chart-line fa-3x text-blue-600 mb-4"></i>
              <h3 className="font-semibold text-xl text-gray-900">Proses Cepat & Mudah</h3>
              <p className="text-gray-600 mt-2">Pasang iklan hanya dalam beberapa menit melalui dasbor yang mudah digunakan.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted by */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-8">Telah Dipercaya oleh Organisasi Terkemuka</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnerLogos.map((logo, index) => (
              <img key={index} src={logo} alt={`Partner logo ${index + 1}`} className="max-h-10 grayscale opacity-70" />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Paket Pemasangan Iklan</h2>
            <p className="text-gray-600 mt-2">Pilih paket yang paling sesuai dengan kebutuhan Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPackages.map(pkg => (
              <div key={pkg.name} className={`bg-white rounded-lg shadow-lg p-8 flex flex-col text-center relative border ${pkg.isPopular ? 'border-2 border-orange-500 transform md:scale-105' : 'border-gray-200'}`}>
                {pkg.isPopular && <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 right-5">PALING POPULER</span>}
                <h3 className="font-bold text-2xl text-gray-900">{pkg.name}</h3>
                <p className="mt-4 text-4xl font-bold text-blue-600">{pkg.price}</p>
                <p className="text-gray-500 text-sm">{pkg.duration}</p>
                <ul className="space-y-4 text-gray-600 my-8 flex-grow">
                  {pkg.features.map(feature => (
                    <li key={feature}><i className="fas fa-check text-green-500 mr-2"></i>{feature}</li>
                  ))}
                </ul>
                <button className={`w-full font-bold py-3 px-6 rounded-lg transition ${pkg.isPopular ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Ads */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Jenis Iklan yang Bisa Dipasang</h2>
            <p className="text-gray-600 mt-2">Berbagai pilihan untuk mempromosikan program Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Program Magang', icon: 'fa-briefcase', color: 'text-blue-600', bg: 'bg-blue-50' },
              { name: 'Beasiswa', icon: 'fa-graduation-cap', color: 'text-green-600', bg: 'bg-green-50' },
              { name: 'Lomba & Kompetisi', icon: 'fa-trophy', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { name: 'Webinar & Event', icon: 'fa-video', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map(item => (
              <div key={item.name} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <i className={`fas ${item.icon} text-2xl ${item.color}`}></i>
                </div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Butuh Solusi Khusus?</h2>
            <p className="text-gray-600 mt-2">Hubungi tim kami untuk paket khusus atau kebutuhan promosi skala besar.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600" />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Nama Organisasi</label>
                  <input type="text" id="organization" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                  <input type="tel" id="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600" />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                <textarea id="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"></textarea>
              </div>
              <div className="mt-6 text-center">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition duration-300">
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Atau hubungi kami langsung melalui:</p>
            <div className="flex justify-center gap-6">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                <i className="fab fa-telegram text-2xl mr-2"></i>
                Telegram
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center text-pink-600 hover:text-pink-700 font-semibold">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </a>
              <a href="mailto:kabarkarir@outlook.com" className="flex items-center text-gray-600 hover:text-gray-700 font-semibold">
                <i className="fas fa-envelope text-2xl mr-2"></i>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasangIklanPage;
