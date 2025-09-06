import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhatsAppChat from './components/WhatsAppChat';
import ConversionPage from './components/ConversionPage';
import { chatData } from './data/chatData';
import { AnimationProvider } from './contexts/AnimationContext';

function App() {
  return (
    <AnimationProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={
              <WhatsAppChat 
                messages={chatData.messages}
                contact={chatData.contact}
              />
            } />
            <Route path="/conversion/whatsapp" element={
              <ConversionPage type="whatsapp" />
            } />
            <Route path="/conversion/call" element={
              <ConversionPage type="call" />
            } />
          </Routes>
        </div>
      </Router>
    </AnimationProvider>
  );
}

export default App;
