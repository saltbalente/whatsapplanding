import { Contact, Message } from '../types';

// Función para obtener la hora actual en formato HH:MM
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

export const chatData = {
  contact: {
    name: "Maestro Gabriel",
    avatar: "/assets/images/maestro-gabriel-avatar.jpg",
    status: "online" as const,
    lastSeen: "en línea"
  } as Contact,
  
  messages: [
    {
      id: "1",
      type: "text" as const,
      content: "Hola bendiciones, como puedo ayudarte?",
      timestamp: getCurrentTime(),
      sent: false,
      delivered: true,
      read: true
    },
    {
      id: "2",
      type: "image" as const,
      content: "/assets/images/religious-altar.jpg",
      timestamp: getCurrentTime(),
      sent: false,
      delivered: true,
      read: true
    },
    {
      id: "3",
      type: "sticker" as const,
      content: "/assets/images/prayer-hands-sticker.png",
      timestamp: getCurrentTime(),
      sent: false,
      delivered: true,
      read: true
    },
    {
      id: "4",
      type: "text" as const,
      content: "Selecciona que ayuda necesitas:",
      timestamp: getCurrentTime(),
      sent: false,
      delivered: true,
      read: true
    }
  ] as Message[]
};