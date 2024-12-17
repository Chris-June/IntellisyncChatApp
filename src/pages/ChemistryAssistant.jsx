import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const ChemistryAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="chemistry" />
    </div>
  );
};

export default ChemistryAssistant;
