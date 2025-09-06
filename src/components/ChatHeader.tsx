import React from 'react';
import { ChatHeaderProps } from '../types';
import SVGIcon from './SVGIcon';

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  contact, 
  onBack: __onBack, 
  onCall, 
  onVideoCall 
}) => {

  return (
    <div className="bg-whatsapp-dark flex items-center px-4 py-3 text-white">
      {/* Botón de retroceso oculto en el home */}
      
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
        <img 
          src="/altar-brujo.png" 
          alt={contact.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Información del contacto */}
      <div className="flex-1 min-w-0">
        <h2 className="font-system text-lg font-medium text-white truncate">
          {contact.name}
        </h2>
        <p className="font-system text-sm text-gray-300 truncate">
          {contact.status === 'online' ? 'en línea' : contact.lastSeen || 'desconectado'}
        </p>
      </div>
      
      {/* Botones de acción */}
      <div className="flex items-center space-x-2 ml-3">
        {/* Botón de llamada */}
        <button 
          onClick={onCall}
          className="p-2 rounded-full hover:bg-white/10 transition-colors conversionmarcada"
          aria-label="Llamar"
        >
          <SVGIcon name="phone" size={22} color="white" />
        </button>
        
        {/* Botón de videollamada */}
        <button 
          onClick={onVideoCall}
          className="p-2 rounded-full hover:bg-white/10 transition-colors conversionmarcada"
          aria-label="Videollamada"
        >
          <SVGIcon name="video-call" size={22} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;