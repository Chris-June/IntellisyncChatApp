import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import { createTravelGuide } from '../config/ai-personality';

const TravelGuide = () => {
  const systemMessage = createTravelGuide();
  return <ChatInterface systemMessage={systemMessage} />;
};

export default TravelGuide;
