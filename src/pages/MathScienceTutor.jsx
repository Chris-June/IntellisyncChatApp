import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createMathScienceTutor } from '../config/ai-personality';

const MathScienceTutor = () => {
  const systemMessage = createMathScienceTutor();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default MathScienceTutor;
