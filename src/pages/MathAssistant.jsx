import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const MathAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="math" />
    </div>
  );
};

export default MathAssistant;
