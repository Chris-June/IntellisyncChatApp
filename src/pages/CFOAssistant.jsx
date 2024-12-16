import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const CFOAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="cfo" />
    </div>
  );
};

export default CFOAssistant;
