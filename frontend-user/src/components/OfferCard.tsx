import React from 'react';
import { MisiCuanOffer } from '../types';
import { formatRewardString, formatDisplayDate } from '../utils/formatting';

interface OfferCardProps {
  offer: MisiCuanOffer;
  onSelectMisi: (offerId: number) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onSelectMisi }) => {

  const getAvailability = () => {
    if (offer.quota <= 0) {
      return { text: 'Kuota habis!', color: 'bg-red-500', textColor: 'text-red-600' };
    }
    
    const remainingPercentage = ((offer.quota - offer.submissions) / offer.quota) * 100;
    
    if (remainingPercentage > 40) {
      return {
        text: 'Slot masih banyak!',
        color: 'bg-green-500',
        textColor: 'text-green-600',
      };
    }
    if (remainingPercentage > 10) {
      return {
        text: 'Slot terbatas!',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600',
      };
    }
    return {
      text: 'Slot hampir habis!',
      color: 'bg-red-500',
      textColor: 'text-red-600',
    };
  };

  const availability = getAvailability();
  const filledPercentage = offer.quota > 0 ? (offer.submissions / offer.quota) * 100 : 100;

  return (
    <div 
      onClick={() => onSelectMisi(offer.id)}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-md flex items-center justify-center p-1 mr-4 shrink-0">
                    <img src={offer.logo} alt={`${offer.company} logo`} className="w-full h-full object-contain" />
                </div>
                <div>
                    <h3 className="font-bold text-secondary text-lg">{offer.company}</h3>
                    <p className="text-sm text-gray-500">{offer.title}</p>
                </div>
            </div>
            <div className="text-right">
                 <div className="text-xs text-gray-500 flex items-center"><i className="far fa-clock mr-1.5"></i>{offer.time}</div>
                 <div className="text-xs text-gray-500 mt-1 flex items-center"><i className="far fa-calendar-alt mr-1.5"></i>Berlaku s/d {formatDisplayDate(offer.expiryDate)}</div>
            </div>
        </div>

        <p className="text-gray-700 mt-4">{offer.description}</p>
      </div>
      <div className="mt-auto bg-gray-50 p-4 flex items-center justify-between">
        <div>
            <span className="block text-green-600 font-bold text-xl">
                {formatRewardString(offer.reward)}
            </span>
            <div className="w-32 mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`${availability.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${filledPercentage}%` }}
                    aria-valuenow={filledPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                    aria-label="Kuota terisi"
                ></div>
              </div>
              <span className={`text-xs font-medium ${availability.textColor} mt-1 block`}>
                  {availability.text}
              </span>
            </div>
        </div>
        <button onClick={() => onSelectMisi(offer.id)} className="bg-accent hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default OfferCard;