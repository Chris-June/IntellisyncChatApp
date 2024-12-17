import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const GermanLanguageAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="german" />
    </div>
  );
};

export default GermanLanguageAssistant;
