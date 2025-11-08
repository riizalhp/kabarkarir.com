import React, { useEffect, useRef } from 'react';

const GoogleAdBanner: React.FC = () => {
  const adContainer1Ref = useRef<HTMLDivElement>(null);
  const adContainer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay untuk memastikan kedua container siap
    const timer = setTimeout(() => {
      // First Ad
      if (adContainer1Ref.current) {
        const configScript1 = document.createElement('script');
        configScript1.type = 'text/javascript';
        configScript1.innerHTML = `
          atOptions = {
            'key' : '50dd5fb02b098916ace953332cdc5d74',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `;
        adContainer1Ref.current.appendChild(configScript1);

        const invokeScript1 = document.createElement('script');
        invokeScript1.type = 'text/javascript';
        invokeScript1.src = '//femalesfellowship.com/50dd5fb02b098916ace953332cdc5d74/invoke.js';
        invokeScript1.async = true;
        adContainer1Ref.current.appendChild(invokeScript1);
      }

      // Second Ad dengan delay tambahan
      setTimeout(() => {
        if (adContainer2Ref.current) {
          const configScript2 = document.createElement('script');
          configScript2.type = 'text/javascript';
          configScript2.innerHTML = `
            atOptions = {
              'key' : '50dd5fb02b098916ace953332cdc5d74',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
          `;
          adContainer2Ref.current.appendChild(configScript2);

          const invokeScript2 = document.createElement('script');
          invokeScript2.type = 'text/javascript';
          invokeScript2.src = '//femalesfellowship.com/50dd5fb02b098916ace953332cdc5d74/invoke.js';
          invokeScript2.async = true;
          adContainer2Ref.current.appendChild(invokeScript2);
        }
      }, 100);
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (adContainer1Ref.current) {
        adContainer1Ref.current.innerHTML = '';
      }
      if (adContainer2Ref.current) {
        adContainer2Ref.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className="py-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-center gap-4">
          <div ref={adContainer1Ref} className="flex-shrink-0">
            {/* First ad script will be injected here */}
          </div>
          <div ref={adContainer2Ref} className="flex-shrink-0">
            {/* Second ad script will be injected here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleAdBanner;
