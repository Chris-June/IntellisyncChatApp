import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const JapaneseLanguageAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="japanese" />
    </div>
  );
};

export default JapaneseLanguageAssistant;
