import React from 'react';
import { cn } from '../../lib/utils';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message, isLast }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-muted/50" : "bg-background border"
      )}
    >
      <div className="w-6 h-6">
        {isUser ? (
          <User className="w-6 h-6 text-muted-foreground" />
        ) : (
          <Bot className="w-6 h-6 text-primary" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        {message.content && (
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        )}
        {message.image && (
          <div className="mt-2">
            <img 
              src={message.image} 
              alt="Generated" 
              className="rounded-lg max-w-full h-auto"
              onError={(e) => {
                console.error('Image failed to load:', message.image);
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
