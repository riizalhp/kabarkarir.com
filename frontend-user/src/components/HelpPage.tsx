import React, { useState } from 'react';

const faqs = {
    'Pencari Kerja': [
        {
            q: 'Bagaimana cara melamar pekerjaan?',
            a: 'Anda dapat melamar pekerjaan dengan mengklik tombol "Lamar Sekarang" pada halaman detail lowongan. Anda akan diarahkan untuk mengikuti instruksi selanjutnya dari perusahaan, yang bisa berupa pengisian formulir di situs kami atau pengalihan ke situs web rekrutmen perusahaan tersebut.'
        },
        {
            q: 'Apakah saya perlu membuat akun untuk melamar?',
            a: 'Meskipun beberapa lowongan mungkin dapat dilamar tanpa akun, kami sangat menyarankan Anda untuk membuat akun. Dengan akun, Anda dapat menyimpan lowongan favorit, melacak riwayat lamaran, dan mendapatkan rekomendasi pekerjaan yang lebih personal.'
        },
        {
            q: 'Bagaimana cara menyimpan lowongan yang saya minati?',
            a: 'Pada setiap kartu lowongan atau di halaman detail, terdapat ikon bookmark (tanda buku). Cukup klik ikon tersebut untuk menyimpan lowongan. Anda dapat melihat semua lowongan yang tersimpan di halaman "Favorit".'
        },
        {
            q: 'Apakah semua lowongan di KabarKarir.com terverifikasi?',
            a: 'Tim kami berusaha semaksimal mungkin untuk memverifikasi setiap lowongan yang dipasang. Namun, kami tetap menyarankan Anda untuk berhati-hati dan melakukan riset sendiri terhadap perusahaan yang Anda lamar. Jangan pernah memberikan informasi pribadi yang sensitif atau mentransfer uang kepada perekrut.'
        }
    ],
    'Perusahaan': [
        {
            q: 'Bagaimana cara memasang iklan lowongan kerja?',
            a: 'Untuk memasang iklan, silakan kunjungi halaman "Pasang Iklan" dan pilih paket yang sesuai dengan kebutuhan Anda. Anda dapat menghubungi tim sales kami melalui formulir kontak untuk informasi lebih lanjut dan paket enterprise.'
        },
        {
            q: 'Berapa lama iklan lowongan saya akan tayang?',
            a: 'Durasi tayang standar untuk setiap iklan lowongan adalah 30 hari. Anda dapat memilih untuk memperpanjang durasi atau membeli paket iklan dengan slot lebih banyak untuk kebutuhan rekrutmen jangka panjang.'
        },
        {
            q: 'Bagaimana saya bisa melihat pelamar yang mendaftar?',
            a: 'Anda akan mendapatkan akses ke dasbor perusahaan setelah memasang iklan. Di dasbor tersebut, Anda dapat mengelola lowongan yang aktif dan melihat daftar kandidat yang telah melamar, lengkap dengan CV dan informasi kontak mereka.'
        }
    ]
};

const FaqItem: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left text-lg font-medium text-secondary hover:text-primary transition-colors"
            >
                <span>{q}</span>
                <i className={`fas fa-chevron-down transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}></i>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600">{a}</p>
            </div>
        </div>
    );
};

const HelpPage: React.FC = () => {
    return (
        <section className="py-12 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <i className="fas fa-question-circle fa-3x text-primary mb-4"></i>
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary">Pusat Bantuan</h1>
                    <p className="mt-2 text-gray-600">Temukan jawaban atas pertanyaan yang sering diajukan di sini.</p>
                </div>

                <div className="space-y-10">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary border-l-4 border-primary pl-4 mb-6">Untuk Pencari Kerja</h2>
                        <div className="space-y-2">
                            {faqs['Pencari Kerja'].map((faq, index) => <FaqItem key={index} {...faq} />)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-secondary border-l-4 border-primary pl-4 mb-6">Untuk Perusahaan</h2>
                        <div className="space-y-2">
                            {faqs['Perusahaan'].map((faq, index) => <FaqItem key={index} {...faq} />)}
                        </div>
                    </div>
                </div>

                 <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-secondary">Tidak menemukan jawaban yang Anda cari?</h3>
                    <p className="text-gray-600 mt-2">Tim kami siap membantu. Hubungi kami melalui email untuk pertanyaan lebih lanjut.</p>
                    <a href="mailto:kabarkarir@outlook.com" className="mt-4 inline-block bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        <i className="fas fa-envelope mr-2"></i> Hubungi Kami
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HelpPage;
