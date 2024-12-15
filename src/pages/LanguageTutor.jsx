import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createLanguageTutor } from '../config/ai-personality';

const LanguageTutor = () => {
  const systemMessage = createLanguageTutor();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default LanguageTutor;
