import React from 'react';
import { SVGIcon } from './SVGIcon';

interface ServiceDetailProps {
  service: string;
  onBack: () => void;
  onCall: () => void;
  onChat: () => void;
}

const serviceDetails = {
  amor: {
    title: 'Ayuda en el Amor 💕',
    icon: 'heart',
    color: 'from-pink-500 to-red-500',
    image: '/ayuda-amor.jpg',
    copy: {
      headline: '¿Problemas en el amor? ¡Tengo la solución!',
      description: 'Con más de 20 años de experiencia ayudando a personas como tú, he logrado reunir parejas, fortalecer relaciones y atraer el amor verdadero.',
      benefits: [
        '✨ Consulta GRATUITA de tu situación amorosa',
        '💖 Lectura completa de tu energía romántica',
        '🔮 Diagnóstico personalizado de tu caso',
        '💕 Ritual de amor específico para ti',
        '📞 Seguimiento hasta lograr resultados'
      ],
      testimonial: '"Gracias al Maestro Gabriel recuperé a mi esposo después de 6 meses separados. ¡Su trabajo es real!" - María C.',
      urgency: '⚡ Solo hoy: Consulta completamente GRATIS'
    }
  },
  dinero: {
    title: 'Atraer Dinero y Trabajo 💰',
    icon: 'coins',
    color: 'from-yellow-500 to-green-500',
    image: '/maestro-altar.jpg',
    copy: {
      headline: '¡Abre los caminos de la prosperidad!',
      description: 'Desbloquea tu abundancia financiera y atrae las mejores oportunidades laborales con rituales ancestrales de prosperidad.',
      benefits: [
        '💰 Análisis GRATUITO de tu situación financiera',
        '🍀 Lectura de tus bloqueos económicos',
        '✨ Ritual de apertura de caminos',
        '💼 Atracción de oportunidades laborales',
        '📈 Seguimiento hasta ver resultados'
      ],
      testimonial: '"En 2 semanas conseguí el trabajo que tanto buscaba. El Maestro Gabriel cambió mi suerte" - Carlos R.',
      urgency: '🔥 Oferta especial: Primera consulta SIN COSTO'
    }
  },
  limpias: {
    title: 'Limpias de Males 🛡️',
    icon: 'shield',
    color: 'from-purple-500 to-blue-500',
    image: '/limpia.jpg',
    copy: {
      headline: '¡Libérate de energías negativas!',
      description: 'Elimina maleficios, envidias y energías tóxicas que bloquean tu felicidad y éxito. Recupera tu paz interior.',
      benefits: [
        '🔮 Diagnóstico GRATUITO de energías negativas',
        '🛡️ Limpia espiritual completa',
        '✨ Protección permanente contra males',
        '🙏 Ritual de purificación ancestral',
        '💫 Renovación total de tu energía'
      ],
      testimonial: '"Después de la limpia del Maestro, mi vida cambió completamente. Se fueron todas las malas rachas" - Ana L.',
      urgency: '⚡ Urgente: No dejes que las malas energías te sigan afectando'
    }
  },
  salud: {
    title: 'Mejorar mi Salud 🌿',
    icon: 'health',
    color: 'from-green-500 to-blue-400',
    image: '/altar-brujo.png',
    copy: {
      headline: '¡Recupera tu bienestar integral!',
      description: 'Sana tu cuerpo, mente y espíritu con rituales de sanación que complementan tu tratamiento médico.',
      benefits: [
        '🌿 Consulta GRATUITA de tu estado energético',
        '💚 Lectura de bloqueos en tu salud',
        '✨ Ritual de sanación personalizado',
        '🙏 Limpia de enfermedades espirituales',
        '📞 Acompañamiento en tu proceso'
      ],
      testimonial: '"Los dolores que tenía hace años desaparecieron después del trabajo del Maestro" - Roberto M.',
      urgency: '🚨 Tu salud no puede esperar - Consulta HOY'
    }
  }
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ 
  service, 
  onBack, 
  onCall, 
  onChat 
}) => {
  const details = serviceDetails[service as keyof typeof serviceDetails];
  
  if (!details) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-fadeInUp w-full max-w-md mx-auto overflow-y-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${details.color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="mb-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <SVGIcon name="back-arrow" size={20} color="white" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <SVGIcon name={details.icon} size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold">{details.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-24">
        {/* Headline */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {details.copy.headline}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {details.copy.description}
          </p>
        </div>

        {/* Service Image */}
        {details.image && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
            <img 
              src={details.image} 
              alt={details.title}
              className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-md"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                transform: 'none',
                imageOrientation: 'from-image'
              }}
            />
          </div>
        )}

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Lo que incluye:</h3>
          <ul className="space-y-3">
            {details.copy.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-l-4 border-blue-400">
          <p className="text-gray-700 italic mb-2">{details.copy.testimonial}</p>
        </div>

        {/* Urgency */}
        <div className={`bg-gradient-to-r ${details.color} rounded-2xl p-4 sm:p-6 text-white text-center animate-pulse-gentle`}>
          <p className="text-lg font-semibold">{details.copy.urgency}</p>
        </div>

        {/* Action Buttons - Fixed at bottom for mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3 max-w-md mx-auto z-50 md:relative md:bottom-auto md:border-t-0 md:bg-transparent md:z-auto">
          <button
            onClick={onCall}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 sm:space-x-3 conversionmarcada"
          >
            <SVGIcon name="phone" size={20} color="white" />
            <span className="text-base sm:text-lg">Llamar Ahora - GRATIS</span>
          </button>
          
          <button
            onClick={onChat}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 sm:space-x-3 conversionmarcada"
          >
            <SVGIcon name="send" size={20} color="white" />
            <span className="text-base sm:text-lg">Enviar WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};