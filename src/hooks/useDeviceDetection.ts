import { useState, useEffect, CSSProperties } from 'react';

interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isTablet: boolean;
  userAgent: string;
  platform: string;
}

/**
 * Hook personalizado para detectar el tipo de dispositivo y sistema operativo
 * Proporciona detección robusta para iOS, Android y otros dispositivos móviles
 */
export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isIOS: false,
    isAndroid: false,
    isMobile: false,
    isTablet: false,
    userAgent: '',
    platform: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const platform = navigator.platform?.toLowerCase() || '';
      
      // Detectar iOS (iPhone, iPad, iPod, Chrome iOS, Firefox iOS)
      const isIOS = (
        /ipad|iphone|ipod/.test(userAgent) ||
        (platform.includes('mac') && navigator.maxTouchPoints > 1) ||
        /crios|fxios/.test(userAgent) ||
        /safari/.test(userAgent) && /mobile/.test(userAgent)
      );
      
      // Detectar Android
      const isAndroid = /android/.test(userAgent);
      
      // Detectar dispositivos móviles en general
      const isMobile = (
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
        navigator.maxTouchPoints > 1
      );
      
      // Detectar tablets
      const isTablet = (
        /ipad/.test(userAgent) ||
        (/android/.test(userAgent) && !/mobile/.test(userAgent)) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth >= 768)
      );
      
      setDeviceInfo({
        isIOS,
        isAndroid,
        isMobile,
        isTablet,
        userAgent,
        platform
      });
    };

    detectDevice();
    
    // Re-detectar en cambios de orientación o redimensionamiento
    const handleResize = () => {
      setTimeout(detectDevice, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
};

/**
 * Función utilitaria para obtener la imagen de avatar correcta según el dispositivo
 * @param deviceInfo - Información del dispositivo obtenida del hook
 * @returns Ruta de la imagen de avatar apropiada
 */
export const getAvatarImage = (deviceInfo: DeviceInfo): string => {
  return deviceInfo.isIOS ? '/gabriel-maestro.jpg' : '/altar-brujo.png';
};

/**
 * Función utilitaria para obtener estilos CSS específicos del dispositivo
 * @param deviceInfo - Información del dispositivo obtenida del hook
 * @returns Objeto con estilos CSS optimizados para el dispositivo
 */
export const getDeviceSpecificStyles = (deviceInfo: DeviceInfo): CSSProperties => {
  const baseStyles: CSSProperties = {
    objectFit: 'contain',
    objectPosition: 'center',
    backgroundColor: '#f3f4f6',
    transform: 'none',
    WebkitTransform: 'none'
  };

  if (deviceInfo.isIOS) {
    return {
      ...baseStyles,
      WebkitBackfaceVisibility: 'hidden' as any,
      backfaceVisibility: 'hidden' as any,
      WebkitPerspective: '1000px' as any,
      perspective: '1000px',
      imageRendering: 'auto'
    };
  }

  return baseStyles;
}