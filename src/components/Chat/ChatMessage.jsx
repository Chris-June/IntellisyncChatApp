import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

const ChatMessage = ({ message, isLast }) => {
  const isUser = message.role === 'user';

  const handleDownload = async (imageUrl) => {
    try {
      // Get the API URL from environment variable
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      // Create the download URL with the image URL as a query parameter
      const downloadUrl = `${apiUrl}/api/download-image?url=${encodeURIComponent(imageUrl)}`;
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `generated-image-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'flex gap-3 p-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {message.content && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        )}
        {message.image && (
          <div className="mt-2 space-y-2">
            <div className="relative group">
              <img
                src={message.image}
                alt="Generated"
                className="rounded-md max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDownload(message.image)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
