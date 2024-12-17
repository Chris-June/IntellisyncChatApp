import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const CalculusAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="calculus" />
    </div>
  );
};

export default CalculusAssistant;
