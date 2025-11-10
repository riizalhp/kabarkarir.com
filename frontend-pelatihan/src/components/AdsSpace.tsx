import React from 'react';

interface AdsSpaceProps {
  size?: 'banner' | 'square' | 'vertical' | 'horizontal' | 'tall-vertical' | 'wide-horizontal';
  className?: string;
}

const AdsSpace: React.FC<AdsSpaceProps> = ({ size = 'banner', className = '' }) => {
  const sizeClasses = {
    banner: 'w-full h-24 md:h-32', // Horizontal banner
    square: 'w-full aspect-square max-w-sm', // Square ad
    vertical: 'w-full h-96', // Vertical banner
    horizontal: 'w-full h-20', // Small horizontal
    'tall-vertical': 'w-full aspect-[1/4]', // Very tall vertical 1:4 ratio
    'wide-horizontal': 'w-full aspect-[4/1]' // Very wide horizontal 4:1 ratio
  };

  return (
    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 ${sizeClasses[size]} ${className}`}>
      <i className="fas fa-ad text-3xl text-gray-400 mb-2"></i>
      <p className="text-gray-500 text-sm font-medium">Advertisement Space</p>
      <p className="text-gray-400 text-xs mt-1">Your Ad Here</p>
    </div>
  );
};

export default AdsSpace;
