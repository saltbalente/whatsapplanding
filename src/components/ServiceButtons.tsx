import React from 'react';
import { SVGIcon } from './SVGIcon';
import { useAnimation } from '../contexts/AnimationContext';

interface ServiceButtonsProps {
  onServiceSelect: (service: string) => void;
  onTestimoniosSelect?: () => void;
}

const services = [
  {
    id: 'amor',
    title: 'Ayuda en el amor',
    icon: 'heart',
    color: 'from-pink-500 to-red-500',
    borderColor: 'border-pink-400',
    hoverColor: 'hover:from-pink-600 hover:to-red-600'
  },
  {
    id: 'dinero',
    title: 'Atraer dinero y trabajo',
    icon: 'coins',
    color: 'from-yellow-500 to-green-500',
    borderColor: 'border-yellow-400',
    hoverColor: 'hover:from-yellow-600 hover:to-green-600'
  },
  {
    id: 'limpias',
    title: 'Limpias de Males',
    icon: 'shield',
    color: 'from-purple-500 to-blue-500',
    borderColor: 'border-purple-400',
    hoverColor: 'hover:from-purple-600 hover:to-blue-600'
  },
  {
    id: 'salud',
    title: 'Mejorar mi salud',
    icon: 'health',
    color: 'from-green-500 to-blue-400',
    borderColor: 'border-green-400',
    hoverColor: 'hover:from-green-600 hover:to-blue-500'
  }
];

export const ServiceButtons: React.FC<ServiceButtonsProps> = ({ onServiceSelect, onTestimoniosSelect }) => {
  const { hasInitialAnimationPlayed } = useAnimation();
  
  return (
    <div className="px-3 py-2 space-y-2">
      {services.map((service, index) => (
        <button
          key={service.id}
          onClick={() => onServiceSelect(service.id)}
          className={`
            w-full p-2.5 sm:p-3 rounded-xl border-2 ${service.borderColor}
            bg-gradient-to-r ${service.color} ${service.hoverColor}
            text-white font-semibold text-sm sm:text-base shadow-lg
            transform transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-xl
            active:scale-95
            ${hasInitialAnimationPlayed ? '' : 'animate-fadeInUp'}
            touch-manipulation
            min-h-[50px] sm:min-h-[60px]
          `}
          style={hasInitialAnimationPlayed ? { opacity: 1 } : {
            animationDelay: `${(index + 4) * 0.5}s`,
            animationFillMode: 'both'
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-full flex-shrink-0">
              <SVGIcon 
                name={service.icon} 
                size={16} 
                color="white" 
              />
            </div>
            <span className="text-center flex-1 leading-tight text-xs sm:text-sm">{service.title}</span>
          </div>
        </button>
      ))}
      
      {/* Separador */}
      <div className="flex items-center justify-center py-2">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-xs font-medium">LO QUE DICEN DE MI</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      
      {/* Botón de Testimonios */}
      {onTestimoniosSelect && (
        <button
          onClick={onTestimoniosSelect}
          className={`
            w-full p-2.5 sm:p-3 rounded-xl border-2 border-orange-400
            bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600
            text-white font-semibold text-sm sm:text-base shadow-lg
            transform transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-xl
            active:scale-95
            ${hasInitialAnimationPlayed ? '' : 'animate-fadeInUp'}
            touch-manipulation
            min-h-[50px] sm:min-h-[60px]
          `}
          style={hasInitialAnimationPlayed ? { opacity: 1 } : {
            animationDelay: `${(services.length + 4) * 0.5}s`,
            animationFillMode: 'both'
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-white/20 p-1 sm:p-1.5 rounded-full flex-shrink-0">
              <SVGIcon 
                name="star" 
                size={16} 
                color="white" 
              />
            </div>
            <span className="text-center flex-1 leading-tight text-xs sm:text-sm">Testimonios</span>
          </div>
        </button>
      )}
    </div>
  );
};