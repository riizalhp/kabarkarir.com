import React, { useEffect, useRef } from 'react';

// Beri tahu TypeScript bahwa 'Swiper' ada di lingkup global dari skrip CDN
declare const Swiper: any;

const heroSlides = [
    {
        image: 'https://picsum.photos/seed/career1/1200/500',
        title: 'Persiapkan Seleksi CPNS',
        subtitle: 'Panduan lengkap dan tips sukses menghadapi seleksi CPNS.',
        buttonText: 'Baca Panduan'
    },
    {
        image: 'https://picsum.photos/seed/career2/1200/500',
        title: 'Temukan Karir Impianmu di Perusahaan BUMN',
        subtitle: 'Jelajahi ribuan lowongan kerja dari perusahaan-perusahaan BUMN terkemuka di seluruh Indonesia.',
        buttonText: 'Lihat Lowongan BUMN'
    },
    {
        image: 'https://picsum.photos/seed/career3/1200/500',
        title: 'Kembangkan Keahlianmu Melalui Program Magang',
        subtitle: 'Dapatkan pengalaman kerja nyata dan bangun jaringan profesionalmu melalui program magang terverifikasi.',
        buttonText: 'Cari Program Magang'
    }
];

const HeroBanner: React.FC = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (typeof Swiper !== 'undefined') {
            const swiper = new Swiper(swiperRef.current, {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });
            return () => {
                swiper.destroy();
            };
        }
    }, []);

    return (
        <section className="py-10 px-4 hero-swiper">
            <div className="container mx-auto">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <div className="aspect-banner">
                        <div className="swiper" ref={swiperRef}>
                            <div className="swiper-wrapper">
                                {heroSlides.map((slide, index) => (
                                    <div key={index} className="swiper-slide">
                                        <div 
                                            className="h-full w-full bg-cover bg-center flex items-center"
                                            style={{ backgroundImage: `url(${slide.image})` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-black/30"></div>
                                            <div className="relative text-left p-8 md:p-16 max-w-xl text-white">
                                                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
                                                <p className="text-md md:text-lg mb-8 drop-shadow-md">{slide.subtitle}</p>
                                                <a 
                                                    href="#" 
                                                    className="bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                                                >
                                                    {slide.buttonText}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;