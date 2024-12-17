import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const EnvironmentalScienceAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="environmental-science" />
    </div>
  );
};

export default EnvironmentalScienceAssistant;
