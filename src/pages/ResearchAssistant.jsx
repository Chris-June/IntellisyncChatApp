import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createResearchAssistant } from '../config/ai-personality';

const ResearchAssistant = () => {
  const systemMessage = createResearchAssistant();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default ResearchAssistant;
