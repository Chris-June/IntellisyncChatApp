import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const ComputerScienceAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="computer-science" />
    </div>
  );
};

export default ComputerScienceAssistant;
