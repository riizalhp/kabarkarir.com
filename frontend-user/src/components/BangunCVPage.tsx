
import React from 'react';

const testimonials = [
    {
        quote: "Template CV-nya sangat profesional dan mudah diedit. Berkat CV dari sini, saya berhasil dapat panggilan interview di BUMN impian saya!",
        name: "Andi Pratama",
        title: "Lolos di PT Pertamina",
        image: "https://picsum.photos/seed/user1/100/100"
    },
    {
        quote: "Layanan review CV sangat membantu. Feedback yang diberikan detail dan aplikatif. HRD jadi lebih tertarik membaca CV saya.",
        name: "Siti Rahayu",
        title: "Software Engineer",
        image: "https://picsum.photos/seed/user2/100/100"
    }
];

const templates = [
    { name: "Modern", image: "https://picsum.photos/seed/cv1/400/565" },
    { name: "Kreatif", image: "https://picsum.photos/seed/cv2/400/565" },
    { name: "Profesional", image: "https://picsum.photos/seed/cv3/400/565" },
    { name: "Minimalis", image: "https://picsum.photos/seed/cv4/400/565" },
];

const BangunCVPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto text-center">
          <i className="fas fa-file-signature fa-3x text-primary mb-4"></i>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">Buat CV Profesional dalam Hitungan Menit</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">Tinggalkan kesan pertama yang tak terlupakan. Gunakan template ATS-friendly yang dirancang oleh ahli atau dapatkan review mendalam dari praktisi HR.</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a href="#builder" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">Buat CV Sekarang</a>
            <a href="#review" className="bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold py-3 px-8 rounded-lg transition duration-300">Minta Review CV</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot fa-2x"></i>
              </div>
              <h3 className="font-semibold text-xl text-secondary">ATS-Friendly</h3>
              <p className="text-gray-600 mt-2">Pastikan CV-mu lolos sistem pelacakan pelamar (ATS) yang digunakan oleh 80% perusahaan besar.</p>
            </div>
            <div>
               <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-palette fa-2x"></i>
              </div>
              <h3 className="font-semibold text-xl text-secondary">Template Profesional</h3>
              <p className="text-gray-600 mt-2">Pilih dari puluhan desain yang telah terbukti menarik perhatian rekruter.</p>
            </div>
             <div>
               <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-check fa-2x"></i>
              </div>
              <h3 className="font-semibold text-xl text-secondary">Direview Ahli HR</h3>
              <p className="text-gray-600 mt-2">Dapatkan masukan berharga dari para ahli untuk menyempurnakan CV-mu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CV Builder Section */}
      <section id="builder" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">CV Builder Cerdas & Mudah</h2>
            <p className="text-gray-600 mt-2">Ikuti 3 langkah mudah untuk CV yang memukau.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <div className="p-6">
                <i className="fas fa-drafting-compass fa-3x text-accent mb-4"></i>
                <h3 className="font-semibold text-xl text-secondary">1. Pilih Template</h3>
                <p className="text-gray-600 mt-2">Pilih desain yang paling mewakili kepribadian dan industrimu.</p>
             </div>
             <div className="p-6">
                <i className="fas fa-keyboard fa-3x text-accent mb-4"></i>
                <h3 className="font-semibold text-xl text-secondary">2. Isi Datamu</h3>
                <p className="text-gray-600 mt-2">Isi informasi pengalaman, pendidikan, dan keahlianmu dengan panduan.</p>
             </div>
             <div className="p-6">
                <i className="fas fa-download fa-3x text-accent mb-4"></i>
                <h3 className="font-semibold text-xl text-secondary">3. Unduh & Lamar</h3>
                <p className="text-gray-600 mt-2">Unduh CV dalam format PDF dan mulailah melamar pekerjaan impianmu.</p>
             </div>
          </div>
          <div className="mt-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {templates.map(template => (
                      <div key={template.name} className="group relative">
                          <img src={template.image} alt={template.name} className="w-full h-auto rounded-lg shadow-md" />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                              <span className="text-white text-lg font-bold">{template.name}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          <div className="text-center mt-12">
              <button className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                  Mulai Buat CV Gratis
              </button>
          </div>
        </div>
      </section>

      {/* CV Review Section */}
      <section id="review" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1770&auto=format&fit=crop" alt="CV Review" className="rounded-lg shadow-xl" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-secondary">Sudah Punya CV? Biarkan Ahli Kami Meninjaunya.</h2>
              <p className="text-gray-600 mt-4">Terkadang, perbaikan kecil bisa memberikan dampak besar. Dapatkan analisis komprehensif dari praktisi HR kami untuk memaksimalkan peluangmu.</p>
              <ul className="mt-6 space-y-3">
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-3 mt-1"></i><span>Analisis tata bahasa dan penulisan.</span></li>
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-3 mt-1"></i><span>Saran perbaikan konten dan struktur.</span></li>
                  <li className="flex items-start"><i className="fas fa-check text-green-500 mr-3 mt-1"></i><span>Pengecekan kesesuaian dengan standar ATS.</span></li>
              </ul>
              <div className="mt-8">
                 <p className="text-2xl font-bold text-primary">Mulai dari Rp 75.000</p>
                 <button className="mt-2 bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                    Upload CV untuk Direview
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-secondary">Kisah Sukses Pengguna Kami</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 p-8 rounded-lg">
                          <i className="fas fa-quote-left text-primary text-2xl mb-4"></i>
                          <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                          <div className="flex items-center">
                              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                              <div>
                                  <p className="font-bold text-secondary">{testimonial.name}</p>
                                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default BangunCVPage;
