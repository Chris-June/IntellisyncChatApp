import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createHealthCoach } from '../config/ai-personality';

const HealthCoach = () => {
  const systemMessage = createHealthCoach();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default HealthCoach;
