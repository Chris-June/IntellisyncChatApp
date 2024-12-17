import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const StatisticsAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="statistics" />
    </div>
  );
};

export default StatisticsAssistant;
