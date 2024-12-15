import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createBusinessConsultant } from '../config/ai-personality';

const BusinessConsultant = () => {
  const systemMessage = createBusinessConsultant();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default BusinessConsultant;
