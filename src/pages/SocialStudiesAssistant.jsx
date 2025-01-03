import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const SocialStudiesAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="social-studies" />
    </div>
  );
};

export default SocialStudiesAssistant;
