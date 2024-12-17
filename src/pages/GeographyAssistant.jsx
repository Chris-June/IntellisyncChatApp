import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const GeographyAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="geography" />
    </div>
  );
};

export default GeographyAssistant;
