import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SVGIcon from './SVGIcon';

interface ConversionPageProps {
  type: 'whatsapp' | 'call';
}

const ConversionPage: React.FC<ConversionPageProps> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  const number = searchParams.get('phone') || searchParams.get('number') || '';
  const message = searchParams.get('message') || '';
  const service = searchParams.get('service') || 'consulta';

  useEffect(() => {
    // Disparar evento GTM inmediatamente
    const eventName = type === 'whatsapp' ? 'conversion_whatsapp_click' : 'conversion_call_click';
    
    console.log(`🎯 Disparando evento GTM: ${eventName}`, {
      type,
      number,
      service,
      url: window.location.href
    });
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'conversion',
        event_label: service,
        phone_number: number,
        timestamp: new Date().toISOString(),
        conversion_type: type
      });
      console.log('✅ Evento gtag enviado');
    }

    // También enviar a dataLayer para GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        conversion_type: type,
        phone_number: number,
        service_type: service,
        timestamp: new Date().toISOString()
      });
      console.log('✅ Evento dataLayer enviado');
    } else {
      console.warn('⚠️ dataLayer no disponible');
    }

    // Countdown y redirección
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          redirectToDestination();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [type, number, message, service]);

  const redirectToDestination = () => {
    if (type === 'whatsapp') {
      const encodedMessage = encodeURIComponent(message || `Hola Maestro Gabriel, me interesa el servicio de ${service}. ¿Podrías ayudarme?`);
      window.location.href = `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    } else {
      window.location.href = `tel:${number}`;
    }
  };

  const handleManualRedirect = () => {
    redirectToDestination();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center border border-white/10">
        {/* Logo/Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <SVGIcon 
              name={type === 'whatsapp' ? 'send' : 'phone'} 
              size={32} 
              color="white" 
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Conectando con el Maestro Gabriel
          </h1>
          <p className="text-gray-300 text-sm">
            {type === 'whatsapp' 
              ? 'Preparando tu consulta por WhatsApp...' 
              : 'Iniciando llamada telefónica...'
            }
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-white font-semibold">
            Redirigiendo en {countdown} segundo{countdown !== 1 ? 's' : ''}...
          </p>
        </div>

        {/* Service Info */}
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-gray-300 text-sm mb-1">Servicio solicitado:</p>
          <p className="text-white font-semibold capitalize">{service}</p>
          {type === 'whatsapp' && (
            <>
              <p className="text-gray-300 text-sm mt-2 mb-1">Número de WhatsApp:</p>
              <p className="text-green-400 font-mono">{number}</p>
            </>
          )}
          {type === 'call' && (
            <>
              <p className="text-gray-300 text-sm mt-2 mb-1">Número de teléfono:</p>
              <p className="text-blue-400 font-mono">{number}</p>
            </>
          )}
        </div>

        {/* Manual Redirect Button */}
        <button
          onClick={handleManualRedirect}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg conversionmarcada"
        >
          {type === 'whatsapp' ? 'Abrir WhatsApp Ahora' : 'Llamar Ahora'}
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-gray-400 hover:text-white transition-colors text-sm underline"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ConversionPage;