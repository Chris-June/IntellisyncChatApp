import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const AstronomyAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="astronomy" />
    </div>
  );
};

export default AstronomyAssistant;
