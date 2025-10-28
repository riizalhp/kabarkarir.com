import React from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: 'https://picsum.photos/seed/team1/200/200',
    bio: 'Penggerak utama di balik visi KabarKarir.com untuk menjembatani talenta dengan peluang karir terbaik.'
  },
  {
    name: 'Jane Smith',
    role: 'Head of Product',
    image: 'https://picsum.photos/seed/team2/200/200',
    bio: 'Berfokus pada pengembangan produk yang intuitif dan bermanfaat bagi para pencari kerja dan perusahaan.'
  },
  {
    name: 'Budi Santoso',
    role: 'Lead Engineer',
    image: 'https://picsum.photos/seed/team3/200/200',
    bio: 'Memimpin tim teknis untuk memastikan platform berjalan lancar, aman, dan inovatif.'
  }
];

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 px-4 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold">Tentang KabarKarir.com</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Menghubungkan Talenta Terbaik Indonesia dengan Peluang Karir Impian.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          
          {/* Our Story */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary">Sejarah Kami</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              KabarKarir.com lahir dari sebuah gagasan sederhana: mempermudah proses pencarian kerja di Indonesia. Didirikan pada tahun 2023, kami memulai perjalanan dengan misi untuk menciptakan platform yang transparan, mudah diakses, dan efisien bagi para pencari kerja maupun perusahaan. Kami melihat adanya kesenjangan antara talenta berkualitas dengan informasi lowongan yang tersebar dan seringkali tidak terverifikasi. Dari situlah, kami berkomitmen untuk membangun jembatan yang solid, memastikan setiap peluang karir dapat ditemukan oleh kandidat yang tepat.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1771" alt="Visi dan Misi" className="rounded-lg shadow-lg"/>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-3">Visi & Misi</h3>
              <h4 className="font-semibold text-primary text-lg">Visi</h4>
              <p className="text-gray-600 mb-4">Menjadi portal karir terdepan dan terpercaya di Indonesia yang memberdayakan setiap individu untuk mencapai potensi karir maksimal.</p>
              <h4 className="font-semibold text-primary text-lg">Misi</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Menyediakan platform yang user-friendly dan inovatif.</li>
                <li>Menyajikan informasi lowongan kerja yang akurat dan terverifikasi.</li>
                <li>Membangun komunitas karir yang suportif dan informatif.</li>
                <li>Menjadi mitra strategis bagi perusahaan dalam proses rekrutmen.</li>
              </ul>
            </div>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-3xl font-bold text-secondary text-center mb-8">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-50 p-6 rounded-lg">
                <i className="fas fa-handshake fa-2x text-accent mb-3"></i>
                <h4 className="font-semibold text-secondary">Integritas</h4>
                <p className="text-sm text-gray-600 mt-1">Kejujuran dan transparansi adalah fondasi dari semua yang kami lakukan.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <i className="fas fa-users fa-2x text-accent mb-3"></i>
                <h4 className="font-semibold text-secondary">Fokus pada Pengguna</h4>
                <p className="text-sm text-gray-600 mt-1">Kebutuhan pencari kerja dan perusahaan adalah prioritas utama kami.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <i className="fas fa-lightbulb fa-2x text-accent mb-3"></i>
                <h4 className="font-semibold text-secondary">Inovasi</h4>
                <p className="text-sm text-gray-600 mt-1">Kami terus beradaptasi dan mengembangkan teknologi untuk layanan terbaik.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <i className="fas fa-hands-helping fa-2x text-accent mb-3"></i>
                <h4 className="font-semibold text-secondary">Kolaborasi</h4>
                <p className="text-sm text-gray-600 mt-1">Kami percaya kesuksesan dicapai melalui kerja sama tim yang solid.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
