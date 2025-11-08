import React, { useEffect, useRef } from 'react';

interface InlineAdCardProps {
  index: number;
}

const InlineAdCard: React.FC<InlineAdCardProps> = ({ index }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current || !adContainerRef.current) return;

    const timer = setTimeout(() => {
      if (adContainerRef.current && !scriptLoadedRef.current) {
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//femalesfellowship.com/e0947d3f0f72682e9a0cdc8e564524d8/invoke.js';
        
        adContainerRef.current.appendChild(script);
        scriptLoadedRef.current = true;
      }
    }, 100 * (index + 1)); // Delay based on position

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center min-h-[200px]">
      <div ref={adContainerRef}>
        <div id="container-e0947d3f0f72682e9a0cdc8e564524d8"></div>
      </div>
    </div>
  );
};

export default InlineAdCard;
