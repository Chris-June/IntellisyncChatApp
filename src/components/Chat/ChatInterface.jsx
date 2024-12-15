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
  HelpCircle
} from "lucide-react";
import ChatMessage from './ChatMessage';
import NameInputModal from './NameInputModal';
import AudioInput from './AudioInput';
import AudioOutput from './AudioOutput';
import ImageGeneration from './ImageGeneration';
import VisionInput from './VisionInput';

const ChatInterface = ({ aiPersona }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState('');
  const [isAudioInputActive, setIsAudioInputActive] = useState(false);
  const [isAudioOutputEnabled, setIsAudioOutputEnabled] = useState(false);
  const [showImageGen, setShowImageGen] = useState(false);
  const [showVisionInput, setShowVisionInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      content: inputMessage,
      sender: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        content: `This is a simulated response from ${aiPersona}`,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <NameInputModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(name) => {
          setUserName(name);
          setShowModal(false);
        }}
      />
      
      {/* Messages Section - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-3xl mx-auto py-6 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              sender={message.sender}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Feature Components */}
      <div className="px-4">
        {isAudioInputActive && (
          <AudioInput 
            onTranscript={(text) => setInputMessage(text)}
            onClose={() => setIsAudioInputActive(false)}
          />
        )}
        {showImageGen && (
          <ImageGeneration
            onImageGenerated={(image) => {
              // Handle generated image
              setShowImageGen(false);
            }}
          />
        )}
        {showVisionInput && (
          <VisionInput
            onImageSelect={(image) => {
              // Handle selected image
              setShowVisionInput(false);
            }}
          />
        )}
      </div>

      {/* Input Section - Fixed */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-4">
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
                <TooltipContent>Text-to-Speech</TooltipContent>
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
                <TooltipContent>Generate Images</TooltipContent>
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
                <TooltipContent>Upload Image</TooltipContent>
              </Tooltip>
            </div>

            {/* Main Input */}
            <div className="flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full"
              />
            </div>

            {/* Send Button */}
            <Button type="submit">
              <Send className="h-4 w-4" />
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
