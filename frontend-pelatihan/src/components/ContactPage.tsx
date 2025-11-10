import React from 'react';
import { Link } from 'react-router-dom';
import AdsSpace from './AdsSpace';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Top Banner Ads */}
        <div className="mb-8">
          <AdsSpace size="banner" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <i className="fas fa-envelope text-6xl text-primary mb-4"></i>
                <h1 className="text-4xl font-bold text-secondary mb-4">Hubungi Kami</h1>
                <p className="text-xl text-gray-600">
                  Ada pertanyaan? Kami siap membantu Anda
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <div className="flex items-start">
                  <i className="fas fa-tools text-yellow-600 text-2xl mr-4 mt-1"></i>
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Formulir Kontak Sedang Dikembangkan</h3>
                    <p className="text-yellow-700">
                      Untuk saat ini, Anda dapat menghubungi kami melalui email atau media sosial yang tersedia di sidebar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <i className="fas fa-question-circle text-3xl text-primary mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Pertanyaan Umum</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Punya pertanyaan seputar kursus, pembayaran, atau sertifikat?
                  </p>
                  <Link to="/help" className="text-primary text-sm font-semibold hover:underline">
                    Lihat FAQ →
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <i className="fas fa-headset text-3xl text-green-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Dukungan Teknis</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Mengalami masalah teknis saat mengakses kursus?
                  </p>
                  <a href="mailto:kabarkarir@outlook.com" className="text-green-600 text-sm font-semibold hover:underline">
                    Email Support →
                  </a>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                  <i className="fas fa-handshake text-3xl text-purple-600 mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Kerjasama</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Tertarik untuk berkolaborasi atau menjadi instruktur?
                  </p>
                  <a href="mailto:kabarkarir@outlook.com" className="text-purple-600 text-sm font-semibold hover:underline">
                    Hubungi Kami →
                  </a>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                  <i className="fas fa-bullhorn text-3xl text-accent mb-3"></i>
                  <h3 className="font-bold text-secondary mb-2">Media & Press</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Untuk inquiri media dan kemitraan bisnis
                  </p>
                  <a href="mailto:kabarkarir@outlook.com" className="text-accent text-sm font-semibold hover:underline">
                    Media Contact →
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-secondary mb-4 text-center">Jam Operasional</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Senin - Jumat:</span>
                    <span className="font-semibold text-secondary">09:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sabtu:</span>
                    <span className="font-semibold text-secondary">09:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between md:col-span-2">
                    <span className="text-gray-600">Minggu & Hari Libur:</span>
                    <span className="font-semibold text-red-600">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            {/* Sidebar Ads */}
            <div className="mb-6">
              <AdsSpace size="square" />
            </div>

            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h3 className="font-bold text-secondary mb-4">
                <i className="fas fa-info-circle text-primary mr-2"></i>
                Informasi Kontak
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <i className="fas fa-envelope text-primary mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-secondary mb-1">Email</div>
                    <a href="mailto:kabarkarir@outlook.com" className="text-primary hover:underline">
                      kabarkarir@outlook.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fab fa-telegram text-primary mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-secondary mb-1">Telegram</div>
                    <a href="#" className="text-primary hover:underline">
                      @kabarkarir
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fab fa-instagram text-primary mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-secondary mb-1">Instagram</div>
                    <a href="#" className="text-primary hover:underline">
                      @kabarkarir
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg shadow p-6">
              <h3 className="font-bold mb-3">
                <i className="fas fa-clock mr-2"></i>
                Response Time
              </h3>
              <p className="text-sm mb-4 opacity-90">
                Kami berusaha membalas semua pertanyaan dalam waktu 1x24 jam pada hari kerja.
              </p>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <i className="fas fa-stopwatch text-2xl mb-2"></i>
                <p className="text-xs">Max 24 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
