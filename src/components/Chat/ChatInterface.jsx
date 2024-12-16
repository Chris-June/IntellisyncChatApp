import React, { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tooltip } from "../ui/tooltip";
import { TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "../ui/tooltip";
import { Send, Image as ImageIcon, Mic, Camera, VolumeIcon, Loader2 } from "lucide-react";
import ChatMessage from './ChatMessage';
import NameInputModal from './NameInputModal';
import AudioInput from './AudioInput';
import AudioOutput from './AudioOutput';
import ImageGeneration from './ImageGeneration';
import VisionInput from './VisionInput';

// Import updated assistant creators
import {
  createGeneralAssistant,
  createCEOAssistant,
  createCFOAssistant,
  createHRAssistant,
  createEmployeeRelationsAssistant,
  createSalesManagerAssistant,
  createCMOAssistant,
  createLegalAdvisorAssistant,
  createOperationsManagerAssistant
} from '../../config/ai-personality';

const API_URL = import.meta.env.VITE_API_URL;

const ChatInterface = ({ aiPersona }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState('');
  const [isAudioInputActive, setIsAudioInputActive] = useState(false);
  const [isAudioOutputEnabled, setIsAudioOutputEnabled] = useState(false);
  const [showImageGen, setShowImageGen] = useState(false);
  const [showVisionInput, setShowVisionInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const getPersonaConfig = (persona) => {
    const creators = {
      'general': createGeneralAssistant,
      'ceo': createCEOAssistant,
      'cfo': createCFOAssistant,
      'hr': createHRAssistant,
      'employee-relations': createEmployeeRelationsAssistant,
      'sales': createSalesManagerAssistant,
      'cmo': createCMOAssistant,
      'legal': createLegalAdvisorAssistant,
      'operations': createOperationsManagerAssistant
    };

    const creator = creators[persona] || createGeneralAssistant;
    const config = creator();
    // Extract name and role from the content string
    const nameMatch = config.content.match(/Your name is "([^"]+)"/);
    const roleMatch = config.content.match(/You are ([^\.]+)/);
    
    return {
      name: nameMatch ? nameMatch[1] : 'Assistant',
      role: roleMatch ? roleMatch[1].trim() : 'an AI assistant'
    };
  };

  const getInitialGreeting = (name, persona) => {
    const personaConfig = getPersonaConfig(persona);
    return `Hi ${name}! I'm ${personaConfig.name}, ${personaConfig.role}. How can I help you today?`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log('Current aiPersona:', aiPersona);
  }, [aiPersona]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    if (!showModal) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage),
          persona: aiPersona,
          userName: userName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const aiMessage = {
        role: 'assistant',
        content: ''
      };

      setMessages(prevMessages => [...prevMessages, aiMessage]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));

              setMessages(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages[newMessages.length - 1] = {
                  ...newMessages[newMessages.length - 1],
                  content: data.content
                };
                return newMessages;
              });

              if (data.done) {
                setIsLoading(false);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          name: 'System'
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
    setShowModal(false);
    setMessages([
      {
        role: 'assistant',
        content: getInitialGreeting(name, aiPersona),
        name: getPersonaConfig(aiPersona).name
      }
    ]);
  };

  const toggleAudioInput = () => {
    setIsAudioInputActive(!isAudioInputActive);
  };

  const toggleAudioOutput = () => {
    setIsAudioOutputEnabled(!isAudioOutputEnabled);
  };

  const toggleImageGen = () => {
    setShowImageGen(!showImageGen);
  };

  const toggleVisionInput = () => {
    setShowVisionInput(!showVisionInput);
  };

  return (
    <div className="flex flex-col h-screen pt-16">
      <NameInputModal 
        isOpen={showModal} 
        onSubmit={handleNameSubmit}
      />
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isAudioEnabled={isAudioOutputEnabled}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 fixed bottom-0 left-0 right-0 bg-background">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={showModal || isLoading}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={toggleVisionInput}
                  disabled={showModal || isLoading}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload Image</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={toggleImageGen}
                  disabled={showModal || isLoading}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate Image</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={toggleAudioInput}
                  disabled={showModal || isLoading}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice Input</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant={isAudioOutputEnabled ? "default" : "outline"}
                  onClick={toggleAudioOutput}
                  disabled={showModal || isLoading}
                >
                  <VolumeIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Voice Output</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="submit"
                  size="icon"
                  disabled={!inputMessage.trim() || showModal || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </form>

        {isAudioInputActive && (
          <AudioInput
            onTranscription={setInputMessage}
            onClose={toggleAudioInput}
          />
        )}

        {showImageGen && (
          <ImageGeneration
            onClose={toggleImageGen}
            onImageGenerated={(url) => {
              setInputMessage(prev => prev + ` ${url}`);
            }}
          />
        )}

        {showVisionInput && (
          <VisionInput
            onClose={toggleVisionInput}
            onImageUploaded={(url) => {
              setInputMessage(prev => prev + ` ${url}`);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;