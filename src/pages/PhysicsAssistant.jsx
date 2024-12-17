import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const PhysicsAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="physics" />
    </div>
  );
};

export default PhysicsAssistant;
