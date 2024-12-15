import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createCodeExpert } from '../config/ai-personality';

const CodeExpert = () => {
  const systemMessage = createCodeExpert();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default CodeExpert;
