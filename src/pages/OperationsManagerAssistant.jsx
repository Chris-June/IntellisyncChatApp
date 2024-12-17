import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const OperationsManagerAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="operations" />
    </div>
  );
};

export default OperationsManagerAssistant;