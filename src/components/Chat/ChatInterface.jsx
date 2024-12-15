import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import ChatMessage from './ChatMessage';
import VisionInput from './VisionInput';
import ImageGeneration from './ImageGeneration';
import AudioInput from './AudioInput';

const API_URL = import.meta.env.VITE_API_URL;

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToChat = (newMessages) => {
    setMessages((prev) => [...prev, ...newMessages]);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat messages - scrollable area */}
      <div className="flex-1 overflow-y-auto mb-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isLast={index === messages.length - 1}
            />
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-4 text-muted-foreground"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>AI is thinking...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky input section */}
      <div className="sticky bottom-0 bg-background border-t">
        <div className="space-y-4 pt-4">
          {/* Image Generation section */}
          <div className="px-4">
            <ImageGeneration 
              onImageGenerated={setSelectedImage}
              onAddToChat={handleAddToChat}
            />
          </div>

          {/* Vision Input section */}
          <div className="px-4">
            <VisionInput onImageSelect={handleImageSelect} />
          </div>

          {/* Text Input section */}
          <div className="px-4 pb-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
