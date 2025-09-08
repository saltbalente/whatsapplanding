import React from 'react';
import { ChatHeaderProps } from '../types';
import SVGIcon from './SVGIcon';
import { useDeviceDetection, getAvatarImage, getDeviceSpecificStyles } from '../hooks/useDeviceDetection';

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  contact, 
  onBack: __onBack, 
  onCall, 
  onVideoCall 
}) => {
  const deviceInfo = useDeviceDetection();
  const avatarImage = getAvatarImage(deviceInfo);
  const imageStyles = getDeviceSpecificStyles(deviceInfo);

  return (
    <div className="bg-whatsapp-dark flex items-center px-3 sm:px-4 py-2 sm:py-3 text-white sticky top-0 z-50">
      {/* Botón de retroceso oculto en el home */}
      
      {/* Avatar */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 avatar-container mr-2 sm:mr-3 flex-shrink-0">
        <img 
          src={avatarImage} 
          alt={contact.name}
          className="w-full h-full object-cover object-center maestro-avatar"
          style={imageStyles}
          loading="eager"
          onError={(e) => {
            // Fallback en caso de error
            const target = e.target as HTMLImageElement;
            target.src = '/altar-brujo.png';
          }}
        />
      </div>
      
      {/* Información del contacto */}
      <div className="flex-1 min-w-0">
        <h2 className="font-system text-base sm:text-lg font-medium text-white truncate">
          {contact.name}
        </h2>
        <p className="font-system text-xs sm:text-sm text-gray-300 truncate">
          {contact.status === 'online' ? 'en línea' : contact.lastSeen || 'desconectado'}
        </p>
      </div>
      
      {/* Botones de acción */}
      <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-3">
        {/* Botón de llamada */}
        <button 
          onClick={onCall}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors conversionmarcada"
          aria-label="Llamar"
        >
          <SVGIcon name="phone" size={18} color="white" className="sm:w-5 sm:h-5" />
        </button>
        
        {/* Botón de videollamada */}
        <button 
          onClick={onVideoCall}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors conversionmarcada"
          aria-label="Videollamada"
        >
          <SVGIcon name="video-call" size={18} color="white" className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;