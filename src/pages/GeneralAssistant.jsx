import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createGeneralAssistant } from '../config/ai-personality';

const GeneralAssistant = () => {
  const systemMessage = createGeneralAssistant();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default GeneralAssistant;