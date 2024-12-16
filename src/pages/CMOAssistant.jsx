import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const CMOAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="cmo" />
    </div>
  );
};

export default CMOAssistant;
