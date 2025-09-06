import React, { useEffect, useRef, useState } from 'react';
import { MessageListProps } from '../types';
import MessageBubble from './MessageBubble';
import { ServiceButtons } from './ServiceButtons';
import { useAnimation } from '../contexts/AnimationContext';
import whatsappBg from '../assets/patterns/whatsapp-background.svg';

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