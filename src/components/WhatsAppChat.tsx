import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppChatProps, Message } from '../types';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { ServiceDetail } from './ServiceDetail';
import { TestimoniosModal } from './TestimoniosModal';
import { ScrollBar } from './ScrollBar';

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ 
  messages: initialMessages, 
  contact 
}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showTestimonios, setShowTestimonios] = useState(false);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (content: string) => {
    setIsSending(true);
    setSendError(null);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content,
      timestamp: new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      sent: true,
      delivered: false,
      read: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Scroll automático al nuevo mensaje
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
    
    try {
      // Enviar mensaje vía API de WhatsApp
      await sendWhatsAppMessage(content);
      
      // Marcar como entregado
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, delivered: true }
              : msg
          )
        );
      }, 1000);
      
      // Marcar como leído
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, read: true }
              : msg
          )
        );
      }, 2000);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setSendError('Error al enviar el mensaje. Inténtalo de nuevo.');
      
      // Limpiar el error después de 5 segundos
      setTimeout(() => {
        setSendError(null);
      }, 5000);
    } finally {
      setIsSending(false);
    }
  };

  // Función para enviar mensaje vía API de WhatsApp
  const sendWhatsAppMessage = async (message: string) => {
    const phoneNumber = '+18392988226';
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp con el mensaje predefinido
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
    
    // Nota: Para una integración real con API de WhatsApp Business,
    // aquí harías una llamada HTTP a tu backend que maneje la API
    /*
    const response = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        message: message
      })
    });
    
    if (!response.ok) {
      throw new Error('Error enviando mensaje');
    }
    */
  };

  const handleBack = () => {
    console.log('Navegando hacia atrás');
    // Aquí podrías implementar navegación real
  };

  const handleCall = () => {
    const params = new URLSearchParams({
      number: '+13213009113',
      service: 'llamada-directa'
    });
    navigate(`/conversion/call?${params.toString()}`);
  };

  const handleVideoCall = () => {
    const params = new URLSearchParams({
      number: '+13213009113',
      service: 'videollamada'
    });
    navigate(`/conversion/call?${params.toString()}`);
  };

  const handleAttach = () => {
    console.log('Adjuntar archivo');
    // Aquí podrías implementar funcionalidad de adjuntar
  };

  const handleCamera = () => {
    console.log('Abrir cámara');
    // Aquí podrías implementar funcionalidad de cámara
  };

  const handleVoice = () => {
    console.log('Grabar mensaje de voz');
    // Aquí podrías implementar funcionalidad de voz
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  const handleServiceBack = () => {
    setSelectedService(null);
  };

  const handleTestimoniosOpen = () => {
    setShowTestimonios(true);
  };

  const handleTestimoniosClose = () => {
    setShowTestimonios(false);
  };

  const handleServiceCall = () => {
    const params = new URLSearchParams({
      number: '+13213009113',
      service: selectedService || 'consulta-general'
    });
    navigate(`/conversion/call?${params.toString()}`);
  };

  const handleServiceChat = () => {
    const message = 'Hola Maestro Gabriel, me interesa el servicio que ofreces. ¿Podrías ayudarme?';
    const params = new URLSearchParams({
      number: '+18392988226',
      message: message,
      service: selectedService || 'consulta-general'
    });
    navigate(`/conversion/whatsapp?${params.toString()}`);
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detectar scroll para mostrar la barra lateral
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowScrollBar(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Si hay un servicio seleccionado, mostrar la página de detalle
  if (selectedService) {
    return (
      <ServiceDetail 
        service={selectedService}
        onBack={handleServiceBack}
        onCall={handleServiceCall}
        onChat={handleServiceChat}
      />
    );
  }

  return (
    <>
      <div ref={topRef} className="h-screen w-full bg-white flex flex-col font-system">
        {/* Header del chat */}
        <ChatHeader 
          contact={contact}
          onBack={handleBack}
          onCall={handleCall}
          onVideoCall={handleVideoCall}
        />
        
        {/* Lista de mensajes con botones de servicios integrados */}
        <MessageList 
          messages={messages} 
          onServiceSelect={handleServiceSelect}
          servicesRef={servicesRef}
          onTestimoniosSelect={handleTestimoniosOpen}
        />
        
        {/* Input del chat */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          onAttach={handleAttach}
          onCamera={handleCamera}
          onVoice={handleVoice}
          isSending={isSending}
          sendError={sendError}
        />
      </div>
      
      {/* Barra de scroll lateral */}
      <ScrollBar 
        isVisible={showScrollBar}
        onScrollToTop={scrollToTop}
        onScrollToServices={scrollToServices}
      />
      
      {/* Modal de Testimonios */}
      <TestimoniosModal 
        isOpen={showTestimonios}
        onClose={handleTestimoniosClose}
      />
    </>
  );
};

export default WhatsAppChat;