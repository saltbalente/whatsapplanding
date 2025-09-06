import React, { useState, useEffect } from 'react';

interface ScrollBarProps {
  isVisible: boolean;
  onScrollToTop: () => void;
  onScrollToServices: () => void;
}

export const ScrollBar: React.FC<ScrollBarProps> = ({ 
  isVisible, 
  onScrollToTop, 
  onScrollToServices 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 animate-fadeInUp">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-lg border border-gray-200">
        {/* Progress indicator */}
        <div className="relative w-1 h-24 sm:h-32 bg-gray-200 rounded-full overflow-hidden mb-2 sm:mb-4">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-400 to-blue-500 rounded-full transition-all duration-300"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Navigation buttons */}
        <div className="space-y-1 sm:space-y-2">
          <button
            onClick={onScrollToTop}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-whatsapp-dark hover:bg-whatsapp-primary text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md"
            title="Ir al inicio"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </button>
          
          <button
            onClick={onScrollToServices}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md"
            title="Ir a servicios"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};