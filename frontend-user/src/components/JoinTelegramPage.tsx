import React from 'react';

interface JoinTelegramPageProps {
}

const JoinTelegramPage: React.FC<JoinTelegramPageProps> = () => {
  const telegramLink = 'https://t.me/kabarkarir';

  const communityBenefits = [
    {
      icon: 'fas fa-bolt',
      title: 'Info Loker Tercepat',
      description: 'Dapatkan notifikasi lowongan kerja BUMN & Swasta lebih dulu dari yang lain.',
    },
    {
      icon: 'fas fa-users',
      title: 'Diskusi & Networking',
      description: 'Terhubung dengan sesama pencari kerja, berbagi pengalaman, dan bangun jaringan profesionalmu.',
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Tips Karir Eksklusif',
      description: 'Dapatkan tips seputar CV, wawancara, dan pengembangan karir langsung dari tim kami.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
          <i className="fab fa-telegram-plane fa-4x text-blue-500 mb-6"></i>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">
            Bergabung dengan Komunitas Kami!
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Klik tombol di bawah untuk bergabung dengan grup Telegram resmi KabarKarir.com.
          </p>
          <div className="mt-8">
             <a 
              href={telegramLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-600 transition text-lg"
            >
              Gabung Sekarang
            </a>
          </div>
        </div>

        {/* New Section: Why Join? */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">Apa yang Akan Kamu Dapatkan?</h2>
            <p className="text-gray-600 mt-2">Jadilah bagian dari komunitas yang suportif dan informatif.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center transition hover:shadow-md hover:-translate-y-1">
                <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} fa-2x`}></i>
                </div>
                <h3 className="font-semibold text-secondary text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTelegramPage;
