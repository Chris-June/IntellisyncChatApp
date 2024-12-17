import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const LinearAlgebraAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="linear-algebra" />
    </div>
  );
};

export default LinearAlgebraAssistant;
