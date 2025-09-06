import React, { useState } from 'react';
import SVGIcon from './SVGIcon';

interface TestimoniosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const testimoniosImages = [
  {
    id: 1,
    src: '/2025-09-06 02.22.12.jpg',
    alt: 'Testimonio 1'
  },
  {
    id: 2,
    src: '/2025-09-06 02.22.03.jpg',
    alt: 'Testimonio 2'
  },
  {
    id: 3,
    src: '/2025-09-06 02.38.40.jpg',
    alt: 'Testimonio 3'
  },
  {
    id: 4,
    src: '/2025-09-06 02.38.52.jpg',
    alt: 'Testimonio 4'
  }
];

export const TestimoniosModal: React.FC<TestimoniosModalProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (selectedImage) {
        handleCloseImage();
      } else {
        onClose();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-fadeInUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <SVGIcon name="close" size={20} color="white" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <SVGIcon name="star" size={24} color="white" />
            </div>
            <h2 className="text-xl font-bold">Testimonios 🌟</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {selectedImage ? (
            /* Vista ampliada de imagen */
            <div className="relative">
              <button
                onClick={handleCloseImage}
                className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
              >
                <SVGIcon name="close" size={16} color="white" />
              </button>
              <img 
                src={selectedImage} 
                alt="Testimonio ampliado"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="mt-4 text-center">
                <button
                  onClick={handleCloseImage}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Volver a la galería
                </button>
              </div>
            </div>
          ) : (
            /* Vista de galería */
            <>
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Testimonios Reales de Nuestros Clientes
                </h3>
                <p className="text-gray-600 text-sm">
                  Toca cualquier imagen para verla en detalle
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {testimoniosImages.map((image) => (
                  <div 
                    key={image.id}
                    className="relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => handleImageClick(image.src)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <SVGIcon name="expand" size={24} color="white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 italic">
                  "Estos son solo algunos de los testimonios reales de personas que han confiado en el Maestro Gabriel"
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};