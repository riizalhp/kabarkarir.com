import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClockIcon, 
  RocketLaunchIcon, 
  BellAlertIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

interface ComingSoonPageProps {
  title: string;
  description: string;
  features?: string[];
  estimatedLaunch?: string;
  backLink?: string;
  backText?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title,
  description,
  features = [],
  estimatedLaunch,
  backLink = '/',
  backText = 'Kembali ke Beranda'
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to={backLink}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {backText}
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <RocketLaunchIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-12">
            {/* Status Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-yellow-100 text-yellow-800 rounded-full">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span className="font-semibold">Segera Hadir</span>
              </div>
            </div>

            {/* Features List */}
            {features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Fitur yang Akan Tersedia
                </h2>
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Launch */}
            {estimatedLaunch && (
              <div className="text-center mb-12">
                <p className="text-gray-600 mb-2">Estimasi Peluncuran</p>
                <p className="text-3xl font-bold text-blue-600">{estimatedLaunch}</p>
              </div>
            )}

            {/* Notification CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <BellAlertIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ingin Tahu Saat Fitur Ini Tersedia?
              </h3>
              <p className="text-gray-600 mb-6">
                Ikuti media sosial kami atau bergabung dengan Telegram untuk mendapat update terbaru!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/gabung-telegram"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.943.11.78.89z"/>
                  </svg>
                  Gabung Telegram
                </Link>
                <a
                  href="https://instagram.com/kabarkarir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow Instagram
                </a>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 text-center">
              <Link
                to={backLink}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                {backText}
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Punya saran atau feedback? Hubungi kami di{' '}
            <a href="mailto:info@kabarkarir.com" className="text-blue-600 hover:text-blue-800 font-semibold">
              info@kabarkarir.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
