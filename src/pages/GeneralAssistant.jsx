import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const GeneralAssistant = () => {
  const systemMessage = {
    role: "system",
    content: "You are a helpful and friendly AI assistant. You excel at general tasks, providing clear explanations, and offering practical solutions to everyday problems. You communicate in a warm, approachable manner while maintaining professionalism."
  };

  return <ChatInterface systemMessage={systemMessage} />;
};

export default GeneralAssistant;
