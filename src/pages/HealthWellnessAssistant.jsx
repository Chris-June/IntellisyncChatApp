import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const HealthWellnessAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="health-wellness" />
    </div>
  );
};

export default HealthWellnessAssistant;