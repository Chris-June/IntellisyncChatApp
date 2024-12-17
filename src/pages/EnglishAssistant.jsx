import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const EnglishAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="english" />
    </div>
  );
};

export default EnglishAssistant;
