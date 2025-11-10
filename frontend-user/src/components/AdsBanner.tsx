import React, { useEffect } from 'react';

interface AdsBannerProps {
  position?: 'left' | 'right';
  size?: 'vertical' | 'horizontal' | 'square';
  className?: string;
  slot?: string; // AdSense slot ID
}

const AdsBanner: React.FC<AdsBannerProps> = ({ 
  position = 'left', 
  size = 'vertical',
  className = '',
  slot
}) => {
  const sizeConfig = {
    vertical: {
      width: 160,
      height: 600,
      dimensions: '160 x 600',
      label: 'Banner Vertikal',
      style: 'width: 160px; height: 600px;'
    },
    horizontal: {
      width: 728,
      height: 90,
      dimensions: '728 x 90',
      label: 'Banner Horizontal',
      style: 'width: 728px; height: 90px;'
    },
    square: {
      width: 250,
      height: 250,
      dimensions: '250 x 250',
      label: 'Banner Square',
      style: 'width: 250px; height: 250px;'
    }
  };

  const config = sizeConfig[size];

  useEffect(() => {
    if (slot) {
      try {
        // Push ads to Google AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [slot]);

  // If no slot provided, show placeholder
  if (!slot) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100 shadow-sm ${className}`}>
        <p className="text-[9px] text-gray-500 text-center mb-2">Advertisement</p>
        <div 
          className="bg-white rounded border border-dashed border-gray-300 flex items-center justify-center"
          style={{ width: `${config.width}px`, height: `${config.height}px` }}
        >
          <div className="text-center p-3">
            <i className="fas fa-ad text-2xl text-gray-300 mb-2"></i>
            <p className="text-[9px] text-gray-400">{config.label}</p>
            <p className="text-[8px] text-gray-300 mt-1">{config.dimensions}</p>
          </div>
        </div>
      </div>
    );
  }

  // Google AdSense Ad
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'inline-block', ...config }}
        data-ad-client="ca-pub-8229145853468159"
        data-ad-slot={slot}
      ></ins>
    </div>
  );
};

export default AdsBanner;
