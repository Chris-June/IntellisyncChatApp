import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const SpanishLanguageAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="spanish" />
    </div>
  );
};

export default SpanishLanguageAssistant;
