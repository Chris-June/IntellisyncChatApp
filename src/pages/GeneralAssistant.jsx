import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const GeneralAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="general" />
    </div>
  );
};

export default GeneralAssistant;
