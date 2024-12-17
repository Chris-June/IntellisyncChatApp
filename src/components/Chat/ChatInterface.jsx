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
  createEnglishAssistant,
  createFrenchAssistant,
  createGeographyAssistant,
  createGuidanceCounselorAssistant,
  createHealthWellnessAssistant,
  createHistoryAssistant,
  createMathAssistant,
  createScienceAssistant,
  createSocialStudiesAssistant,
  generateSystemMessage
} from '../../config/ai-personality';

const API_URL = import.meta.env.VITE_API_URL;

const ChatInterface = ({ aiPersona }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: '', age: null, grade: '' });
  const [isAudioInputActive, setIsAudioInputActive] = useState(false);
  const [isAudioOutputEnabled, setIsAudioOutputEnabled] = useState(false);
  const [showImageGen, setShowImageGen] = useState(false);
  const [showVisionInput, setShowVisionInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('Current aiPersona:', aiPersona);
  }, [aiPersona]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserInfo = (info) => {
    setUserInfo(info);
    setShowModal(false);
    
    console.log('Handling user info with aiPersona:', aiPersona);
    const systemMessage = generateSystemMessage(aiPersona);
    console.log('Generated system message:', systemMessage);
    
    // Extract assistant name from the system message
    const nameMatch = systemMessage.content.match(/Your name is "([^"]+)"/);
    const assistantName = nameMatch ? nameMatch[1] : "Educational Assistant";
    console.log('Selected assistant name:', assistantName);

    const welcomeMessage = {
      role: 'assistant',
      content: `Hello ${info.name}! I'll be your ${assistantName}. I'll adjust my teaching style and explanations to be appropriate for a ${info.grade} student. How can I help you today?`
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = async (messageContent) => {
    if (!messageContent.trim()) return;

    setIsLoading(true);
    const newMessage = { role: 'user', content: messageContent };
    console.log('Sending message with persona:', aiPersona);
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          persona: aiPersona,
          userInfo: userInfo
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      // Add an empty assistant message that we'll update as we receive chunks
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
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
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'assistant') {
                  lastMessage.content = data.content;
                }
                return newMessages;
              });
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const handleSendClick = () => {
    sendMessage(inputMessage);
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
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      <NameInputModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSubmit={handleUserInfo}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            isAudioEnabled={isAudioOutputEnabled}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isAudioInputActive && (
        <AudioInput 
          onTranscription={(text) => setInputMessage(text)}
          onClose={toggleAudioInput}
        />
      )}

      {showImageGen && (
        <ImageGeneration
          onClose={toggleImageGen}
          onImageGenerated={(url) => {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: `Here's the generated image: ![Generated Image](${url})`,
            }]);
          }}
        />
      )}

      {showVisionInput && (
        <VisionInput
          onClose={toggleVisionInput}
          onVisionResponse={(response) => {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: response,
            }]);
          }}
        />
      )}

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleAudioInput}
                disabled={isLoading}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voice input</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleAudioOutput}
                disabled={isLoading}
              >
                <VolumeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle text-to-speech</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleImageGen}
                disabled={isLoading}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate image</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleVisionInput}
                disabled={isLoading}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Vision input</p>
            </TooltipContent>
          </Tooltip>

          <Button 
            onClick={handleSendClick}
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;