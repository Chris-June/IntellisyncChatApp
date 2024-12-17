import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const CreativeWritingAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="creative-writing" />
    </div>
  );
};

export default CreativeWritingAssistant;
