import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const BiologyAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="biology" />
    </div>
  );
};

export default BiologyAssistant;
