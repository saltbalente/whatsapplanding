// Tipos principales para la aplicación WhatsApp Landing Page

export interface Message {
  id: string;
  type: 'text' | 'image' | 'sticker';
  content: string;
  timestamp: string;
  sent: boolean;
  delivered: boolean;
  read: boolean;
}

export interface Contact {
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: string;
}

// Props de componentes
export interface ChatHeaderProps {
  contact: Contact;
  onBack: () => void;
  onCall: () => void;
  onVideoCall: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
}

export interface MessageListProps {
  messages: Message[];
  onServiceSelect?: (service: string) => void;
  onTestimoniosSelect?: () => void;
  servicesRef?: React.RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onAttach: () => void;
  onCamera: () => void;
  onVoice: () => void;
  isSending?: boolean;
  sendError?: string | null;
}

export interface SVGIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export interface WhatsAppChatProps {
  messages: Message[];
  contact: Contact;
}