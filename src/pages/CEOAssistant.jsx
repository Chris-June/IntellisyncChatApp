import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const CEOAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="ceo" />
    </div>
  );
};

export default CEOAssistant;
