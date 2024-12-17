import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import AudioOutput from './AudioOutput';
import DOMPurify from 'dompurify';

const ChatMessage = ({ message, isAudioEnabled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {isUser ? message.name : message.name}
          </span>
          {!isUser && isAudioEnabled && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:bg-muted rounded-full"
            >
              {isPlaying ? (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
        <div className="text-sm prose prose-sm dark:prose-invert max-w-none"
             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}>
        </div>
        {!isUser && isAudioEnabled && isPlaying && (
          <AudioOutput
            text={message.content}
            onComplete={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
