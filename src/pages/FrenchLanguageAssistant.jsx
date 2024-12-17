import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const FrenchLanguageAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="french-language" />
    </div>
  );
};

export default FrenchLanguageAssistant;
