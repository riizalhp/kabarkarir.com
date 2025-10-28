
import React from 'react';

const pricingPackages = [
    {
        name: 'Basic',
        price: 'Rp 250.000',
        duration: '/ 30 Hari',
        features: ['1 Slot Iklan Lowongan', 'Tampil di Halaman Pencarian', 'Dasbor Perusahaan Dasar'],
        isPopular: false,
    },
    {
        name: 'Standard',
        price: 'Rp 600.000',
        duration: '/ 30 Hari',
        features: ['3 Slot Iklan Lowongan', 'Tampil di Halaman Utama', 'Logo Perusahaan Ditampilkan', 'Dasbor Analitik'],
        isPopular: true,
    },
    {
        name: 'Premium',
        price: 'Rp 1.000.000',
        duration: '/ 30 Hari',
        features: ['5 Slot Iklan Lowongan', 'Promosi di Media Sosial', 'Akses ke Bank CV', 'Dukungan Prioritas'],
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
            <section className="bg-secondary text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Jangkau Ribuan Talenta Terbaik di Indonesia</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">Publikasikan lowongan kerja Anda di KabarKarir.com dan temukan kandidat yang tepat dengan lebih cepat dan efisien.</p>
                    <a href="#pricing" className="mt-8 inline-block bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                        Lihat Paket Harga
                    </a>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Mengapa Memasang Iklan di Sini?</h2>
                        <p className="text-gray-600 mt-2">Platform terpercaya untuk menghubungkan perusahaan dengan para profesional.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <i className="fas fa-users fa-3x text-primary mb-4"></i>
                            <h3 className="font-semibold text-xl text-secondary">Jangkauan Luas</h3>
                            <p className="text-gray-600 mt-2">Akses ke ribuan pencari kerja aktif dari berbagai industri, mulai dari fresh graduate hingga profesional berpengalaman.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <i className="fas fa-bullseye-pointer fa-3x text-primary mb-4"></i>
                            <h3 className="font-semibold text-xl text-secondary">Kandidat Tepat Sasaran</h3>
                            <p className="text-gray-600 mt-2">Filter canggih kami membantu lowongan Anda dilihat oleh kandidat dengan kualifikasi yang paling relevan.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <i className="fas fa-tachometer-alt fa-3x text-primary mb-4"></i>
                            <h3 className="font-semibold text-xl text-secondary">Proses Cepat & Mudah</h3>
                            <p className="text-gray-600 mt-2">Pasang iklan lowongan hanya dalam beberapa menit melalui dasbor perusahaan yang intuitif dan mudah digunakan.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Trusted by */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-600 mb-8">Telah Dipercaya oleh Perusahaan Terkemuka</h2>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {partnerLogos.map((logo, index) => (
                            <img key={index} src={logo} alt={`Partner logo ${index + 1}`} className="max-h-10 grayscale opacity-70" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Paket Pemasangan Iklan</h2>
                        <p className="text-gray-600 mt-2">Pilih paket yang paling sesuai dengan kebutuhan rekrutmen Anda.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPackages.map(pkg => (
                            <div key={pkg.name} className={`bg-white rounded-lg shadow-lg p-8 flex flex-col text-center relative ${pkg.isPopular ? 'border-2 border-accent transform md:scale-105' : ''}`}>
                                {pkg.isPopular && <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 right-5">PALING POPULER</span>}
                                <h3 className="font-bold text-2xl text-secondary">{pkg.name}</h3>
                                <p className="mt-4 text-4xl font-bold text-primary">{pkg.price}</p>
                                <p className="text-gray-500 text-sm">{pkg.duration}</p>
                                <ul className="space-y-4 text-gray-600 my-8 flex-grow">
                                    {pkg.features.map(feature => (
                                        <li key={feature}><i className="fas fa-check text-green-500 mr-2"></i>{feature}</li>
                                    ))}
                                </ul>
                                <button className={`w-full font-bold py-3 px-6 rounded-lg transition ${pkg.isPopular ? 'bg-accent text-white hover:bg-opacity-90' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                                    Pilih Paket
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary">Butuh Solusi Khusus?</h2>
                        <p className="text-gray-600 mt-2">Hubungi tim kami untuk paket enterprise atau kebutuhan rekrutmen skala besar.</p>
                    </div>
                    <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
                                    <input type="text" id="company" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                                    <input type="tel" id="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                                <textarea id="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                            </div>
                            <div className="mt-6 text-center">
                                <button type="submit" className="bg-secondary hover:bg-gray-800 text-white font-bold py-3 px-10 rounded-lg transition duration-300">
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PasangIklanPage;
