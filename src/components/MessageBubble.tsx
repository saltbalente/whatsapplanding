import React from 'react';
import { MessageBubbleProps } from '../types';
import SVGIcon from './SVGIcon';

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  showTimestamp = true 
}) => {
  const isReceived = !message.sent;
  
  const bubbleClasses = `
    max-w-[80%] rounded-2xl px-3 py-2 mb-1 relative
    ${isReceived 
      ? 'bg-whatsapp-gray text-black self-start rounded-bl-md' 
      : 'bg-whatsapp-light text-black self-end rounded-br-md ml-auto'
    }
    shadow-sm
  `;

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="font-system text-base leading-relaxed">
            {message.content}
          </div>
        );
      
      case 'image':
        return (
          <div className="relative rounded-lg overflow-hidden max-w-48">
            <img 
              src="/maestro-altar.jpg"
              alt="Imagen religiosa"
              className="w-full h-auto rounded-lg max-h-40 object-cover"
              loading="lazy"
            />
            {/* Overlay para timestamp en imágenes */}
            <div className="absolute bottom-2 right-2 bg-black/50 rounded px-2 py-1">
              <span className="text-white text-xs font-system">
                {message.timestamp}
              </span>
              {!isReceived && (
                <span className="ml-1">
                  <SVGIcon 
                    name={message.read ? 'double-check' : 'single-check'} 
                    size={12} 
                    color={message.read ? '#4FC3F7' : '#ffffff'} 
                  />
                </span>
              )}
            </div>
          </div>
        );
      
      case 'sticker':
        return (
          <div className="relative">
            <img 
              src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=praying%20hands%20with%20divine%20light%20rays%2C%20spiritual%20sticker%20style%2C%20white%20background%2C%20clean%20minimalist%20design&image_size=square"
              alt="Sticker de manos en oración"
              className="w-32 h-32 object-contain"
              loading="lazy"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderTimestamp = () => {
    if (!showTimestamp || message.type === 'image') return null;
    
    return (
      <div className={`flex items-center justify-end mt-1 space-x-1`}>
        <span className="text-xs text-gray-500 font-system">
          {message.timestamp}
        </span>
        {!isReceived && (
          <SVGIcon 
            name={message.read ? 'double-check' : 'single-check'} 
            size={12} 
            color={message.read ? '#4FC3F7' : '#999999'} 
          />
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${isReceived ? 'justify-start' : 'justify-end'} mb-2 px-4`}>
      <div className={bubbleClasses}>
        {renderMessageContent()}
        {renderTimestamp()}
      </div>
    </div>
  );
};

export default MessageBubble;