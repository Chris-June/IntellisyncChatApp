import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const SalesManagerAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="sales" />
    </div>
  );
};

export default SalesManagerAssistant;