import React, { useState } from 'react';
import { ChatInputProps } from '../types';
import SVGIcon from './SVGIcon';

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onAttach: __onAttach,
  onCamera,
  onVoice,
  isSending = false,
  sendError = null
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    onVoice();
  };

  return (
    <div className="bg-gray-100 px-2 py-3">
      {/* Notificación de error */}
      {sendError && (
        <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm animate-pulse">
          {sendError}
        </div>
      )}
      
      <div className="flex items-end space-x-3">
      {/* Campo de entrada de texto */}
      <div className="flex-1 relative">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="
                w-full px-3 py-2 pr-12 rounded-3xl border border-gray-300 
                resize-none font-system text-sm leading-relaxed
                focus:outline-none focus:border-whatsapp-primary focus:ring-1 focus:ring-whatsapp-primary
                max-h-32 min-h-[44px]
              "
              rows={1}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#ccc transparent'
              }}
            />
            
            {/* Botón de cámara dentro del input */}
            <button 
              type="button"
              onClick={onCamera}
              className="absolute right-3 bottom-3 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Tomar foto"
            >
              <SVGIcon name="camera" size={20} />
            </button>
          </div>
          
          {/* Botón de enviar o micrófono */}
          {message.trim() ? (
            <button 
              type="submit"
              disabled={isSending}
              className={`
                p-3 text-white rounded-full transition-colors flex-shrink-0
                focus:outline-none focus:ring-2 focus:ring-whatsapp-primary focus:ring-offset-2
                ${isSending 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-whatsapp-primary hover:bg-whatsapp-primary/90'
                }
              `}
              aria-label={isSending ? "Enviando mensaje..." : "Enviar mensaje"}
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <SVGIcon name="send" size={20} color="white" />
              )}
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleVoiceToggle}
              className={`
                p-3 rounded-full transition-colors flex-shrink-0
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isRecording 
                  ? 'bg-red-500 text-white focus:ring-red-500' 
                  : 'bg-whatsapp-primary text-white hover:bg-whatsapp-primary/90 focus:ring-whatsapp-primary'
                }
              `}
              aria-label={isRecording ? 'Detener grabación' : 'Grabar mensaje de voz'}
            >
              <SVGIcon 
                name="microphone" 
                size={20} 
                color="white" 
                className={isRecording ? 'animate-pulse' : ''} 
              />
            </button>
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default ChatInput;