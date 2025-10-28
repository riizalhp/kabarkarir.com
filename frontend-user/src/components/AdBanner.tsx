import React, { useEffect, useRef } from 'react';

// Beri tahu TypeScript bahwa 'Swiper' ada di lingkup global dari skrip CDN
declare const Swiper: any;

const adImages = [
  'https://via.placeholder.com/1170x162.png/000000/FFFFFF?text=Ad+Banner+1', // Placeholder dengan rasio aspek yang benar
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1770&auto=format&fit=crop', // Gambar generik teknologi/tim
  'https://images.unsplash.com/photo-1556761175-b413da4b248a?q=80&w=1848&auto=format&fit=crop'  // Gambar generik bisnis/rapat
];

const AdBanner: React.FC = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Pastikan Swiper telah dimuat dari CDN
    if (typeof Swiper !== 'undefined' && swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        // Opsi Swiper
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });

      // Bersihkan saat komponen dilepas
      return () => {
        swiper.destroy();
      };
    }
  }, []);

  return (
    <div className="my-4 sm:my-6 px-4">
      <div className="container mx-auto">
        <div className="relative rounded-lg overflow-hidden shadow-md">
            <div className="aspect-ad-banner">
                <div className="swiper" ref={swiperRef}>
                    <div className="swiper-wrapper">
                        {/* Loop melalui gambar untuk membuat slide */}
                        {adImages.map((src, index) => (
                        <div className="swiper-slide" key={index}>
                            <img
                            src={src}
                            alt={`Iklan ${index + 1}`}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        ))}
                    </div>
                    {/* Tambahkan paginasi */}
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;