import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const ScienceAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="science" />
    </div>
  );
};

export default ScienceAssistant;
