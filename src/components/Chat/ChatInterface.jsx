import React, { useState, useRef, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tooltip } from "../ui/tooltip";
import { TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "../ui/tooltip";
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Camera, 
  VolumeIcon,
  Loader2
} from "lucide-react";
import ChatMessage from './ChatMessage';
import NameInputModal from './NameInputModal';
import AudioInput from './AudioInput';
import AudioOutput from './AudioOutput';
import ImageGeneration from './ImageGeneration';
import VisionInput from './VisionInput';
import { 
  createGeneralAssistant,
  createBusinessConsultant,
  createCreativeWriter,
  createCodeExpert,
  createHealthCoach,
  createLanguageTutor,
  createMathScienceTutor,
  createResearchAssistant,
  createTravelGuide
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
      'business': createBusinessConsultant,
      'creative': createCreativeWriter,
      'code': createCodeExpert,
      'health': createHealthCoach,
      'language': createLanguageTutor,
      'math-science': createMathScienceTutor,
      'research': createResearchAssistant,
      'travel': createTravelGuide
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
      content: inputMessage.trim(),
      name: userName
    };

    // Add user message immediately
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

      // Create a new message for the AI response
      const aiMessage = {
        role: 'assistant',
        content: '',
        name: getPersonaConfig(aiPersona).name
      };

      // Add the empty AI message to the state
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      // Set up SSE reader
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
              
              // Update the last message with the new content
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

  const handleFeatureToggle = (feature) => {
    switch (feature) {
      case 'audio-input':
        setIsAudioInputActive(!isAudioInputActive);
        setShowImageGen(false);
        setShowVisionInput(false);
        break;
      case 'audio-output':
        setIsAudioOutputEnabled(!isAudioOutputEnabled);
        break;
      case 'image-gen':
        setShowImageGen(!showImageGen);
        setIsAudioInputActive(false);
        setShowVisionInput(false);
        break;
      case 'vision-input':
        setShowVisionInput(!showVisionInput);
        setIsAudioInputActive(false);
        setShowImageGen(false);
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NameInputModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(name) => {
          const persona = getPersonaConfig(aiPersona);
          setUserName(name);
          setShowModal(false);
          setMessages([{
            role: 'assistant',
            content: `Hi ${name}! I'm ${persona.name}, ${persona.role}. How can I help you today?`
          }]);
        }}
      />
      
      {/* Messages Section - Scrollable */}
      <div className="flex-1 overflow-hidden pt-14">
        <div className="h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto py-6 px-4 space-y-4 pb-32">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isLast={index === messages.length - 1}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-4 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>
      </div>

      {/* Feature Components */}
      <div className="fixed bottom-[4.5rem] left-0 right-0 px-4 mb-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {isAudioInputActive && (
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border shadow-lg">
              <AudioInput 
                onTranscript={(text) => setInputMessage(text)}
                onClose={() => setIsAudioInputActive(false)}
              />
            </div>
          )}
          {showImageGen && (
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border shadow-lg">
              <ImageGeneration
                onImageGenerated={(image) => {
                  setShowImageGen(false);
                }}
                onAddToChat={(newMessages) => {
                  setMessages(prevMessages => [...prevMessages, ...newMessages]);
                }}
              />
            </div>
          )}
          {showVisionInput && (
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border shadow-lg">
              <VisionInput
                onImageSelect={(image) => {
                  setShowVisionInput(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Input Section - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-center">
            {/* Feature Toggle Buttons */}
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFeatureToggle('audio-input')}
                    className={isAudioInputActive ? 'text-primary' : ''}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voice Input</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFeatureToggle('audio-output')}
                    className={isAudioOutputEnabled ? 'text-primary' : ''}
                  >
                    <VolumeIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Text to Speech</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFeatureToggle('image-gen')}
                    className={showImageGen ? 'text-primary' : ''}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Generate Image</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleFeatureToggle('vision-input')}
                    className={showVisionInput ? 'text-primary' : ''}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Vision Input</TooltipContent>
              </Tooltip>
            </div>

            {/* Main Input */}
            <div className="flex-1">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full"
                disabled={isLoading || showModal}
              />
            </div>

            {/* Send Button */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Audio Output Component */}
      {isAudioOutputEnabled && (
        <AudioOutput
          text={messages[messages.length - 1]?.content}
          onComplete={() => {/* Handle completion */}}
        />
      )}
    </div>
  );
};

export default ChatInterface;
