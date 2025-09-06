import React from 'react';
import WhatsAppChat from './components/WhatsAppChat';
import { chatData } from './data/chatData';
import { AnimationProvider } from './contexts/AnimationContext';

function App() {
  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gray-100">
        <WhatsAppChat 
          messages={chatData.messages}
          contact={chatData.contact}
        />
      </div>
    </AnimationProvider>
  );
}

export default App;
