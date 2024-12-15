import React, { useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';

const AudioOutput = ({ audioData }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioData) {
      const blob = new Blob(
        [Buffer.from(audioData, 'base64')],
        { type: 'audio/wav' }
      );
      audioRef.current.src = URL.createObjectURL(blob);
    }
  }, [audioData]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={togglePlay}
        disabled={!audioData}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
};

export default AudioOutput;
