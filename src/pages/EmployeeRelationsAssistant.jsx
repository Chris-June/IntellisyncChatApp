import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const EmployeeRelationsAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ChatInterface aiPersona="employee-relations" />
    </div>
  );
};

export default EmployeeRelationsAssistant;
