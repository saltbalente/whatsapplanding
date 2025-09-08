import React, { useEffect, useRef, useState } from 'react';
import { MessageListProps } from '../types';
import MessageBubble from './MessageBubble';
import { ServiceButtons } from './ServiceButtons';
import { useAnimation } from '../contexts/AnimationContext';
import whatsappBg from '../assets/patterns/whatsapp-background.svg';

// Función para detectar iOS
const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Componente de indicador "escribiendo"
const TypingIndicator: React.FC = () => {
  // Seleccionar imagen según el dispositivo
  const avatarImage = isIOS() ? '/gabriel-maestro.jpg' : '/altar-brujo.png';
  return (
    <div className="flex items-center space-x-2 px-3 py-2 mb-2">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={avatarImage} 
          alt="Maestro Gabriel"
          className="w-full h-full object-cover object-center"
          style={{ objectFit: "contain", objectPosition: "center", imageOrientation: "from-image", backgroundColor: "#f3f4f6" }}
        />
      </div>
      <div className="bg-white rounded-2xl px-4 py-2 shadow-sm max-w-xs">
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <span>escribiendo</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageList: React.FC<MessageListProps> = ({ messages, onServiceSelect, onTestimoniosSelect, servicesRef }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const { hasInitialAnimationPlayed, setInitialAnimationPlayed } = useAnimation();

  // Auto-scroll al final cuando se añaden nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animación secuencial de mensajes
  useEffect(() => {
    if (hasInitialAnimationPlayed) {
      // Si ya se reprodujeron las animaciones, mostrar todos los mensajes inmediatamente
      setVisibleMessages(messages.length);
      return;
    }
    
    setVisibleMessages(0);
    
    const showMessagesSequentially = () => {
      messages.forEach((_, index) => {
        setTimeout(() => {
          setVisibleMessages(index + 1);
          // Marcar como reproducida cuando se muestre el último mensaje
          if (index === messages.length - 1) {
            setInitialAnimationPlayed(true);
          }
        }, index * 2000); // 2 segundos de delay entre mensajes
      });
    };

    if (messages.length > 0) {
      showMessagesSequentially();
    }
  }, [messages, hasInitialAnimationPlayed, setInitialAnimationPlayed]);

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto pt-2 pb-6 relative"
      style={{
        backgroundImage: `url(${whatsappBg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px',
        backgroundColor: '#e5ddd5',
        maxHeight: 'calc(100vh - 120px)' // Asegurar espacio para header y input
      }}
    >
      {/* Overlay sutil para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      
      {/* Contenedor de mensajes */}
      <div className="relative z-10 min-h-full flex flex-col justify-start">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400 font-system">
              <p className="text-lg mb-2">¡Bienvenido!</p>
              <p className="text-sm opacity-75">Los mensajes aparecerán aquí</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.slice(0, visibleMessages).map((message, index) => (
              <div
                key={message.id}
                className={hasInitialAnimationPlayed ? "" : "animate-fade-in-up"}
                style={hasInitialAnimationPlayed ? { opacity: 1 } : {
                  animationDelay: `${index * 0.3}s`,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.3}s forwards`
                }}
              >
                <MessageBubble 
                  message={message} 
                  showTimestamp={true}
                />
              </div>
            ))}
            
            {/* Indicador de "escribiendo" cuando hay más mensajes por mostrar */}
            {!hasInitialAnimationPlayed && visibleMessages < messages.length && (
              <TypingIndicator />
            )}
            
            {/* Mostrar botones de servicios después del último mensaje */}
            {visibleMessages === messages.length && onServiceSelect && (
              <div 
                ref={servicesRef}
                className={`mb-4 ${hasInitialAnimationPlayed ? "" : "animate-fade-in-up"}`}
                style={hasInitialAnimationPlayed ? { opacity: 1 } : {
                  animationDelay: `${messages.length * 0.3 + 0.5}s`,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${messages.length * 0.3 + 0.5}s forwards`
                }}
              >
                <ServiceButtons 
                  onServiceSelect={onServiceSelect} 
                  onTestimoniosSelect={onTestimoniosSelect}
                />
              </div>
            )}
          </div>
        )}
        
        {/* Elemento invisible para scroll automático con espacio adicional */}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default MessageList;