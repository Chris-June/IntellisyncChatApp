import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createCreativeWriter } from '../config/ai-personality';

const CreativeWriter = () => {
  const systemMessage = createCreativeWriter();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default CreativeWriter;
