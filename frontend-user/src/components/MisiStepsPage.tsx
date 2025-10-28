import React from 'react';
import { MisiCuanOffer } from '../types';

interface MisiStepsPageProps {
  offer: MisiCuanOffer;
  onComplete: (offerId: number) => void;
}

const MisiStepsPage: React.FC<MisiStepsPageProps> = ({ offer, onComplete }) => {
  return (
    <div className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 flex items-center justify-center bg-gray-100 rounded-lg p-2 mb-4">
              <img src={offer.logo} alt={`${offer.company} logo`} className="max-h-full max-w-full object-contain" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">Tahapan Misi: {offer.title}</h1>
            <p className="text-gray-600 mt-2">Ikuti langkah-langkah di bawah ini untuk menyelesaikan misi.</p>
          </div>

          <div className="border-t pt-6">
            <ol className="space-y-4">
              {offer.steps && offer.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 mt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-center text-gray-500 mb-4">Pastikan semua langkah telah kamu selesaikan sebelum melanjutkan ke tahap pengumpulan bukti.</p>
            <button 
              onClick={() => onComplete(offer.id)} 
              className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
            >
              Saya Sudah Selesaikan, Lanjutkan <i className="fas fa-check-circle ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisiStepsPage;
