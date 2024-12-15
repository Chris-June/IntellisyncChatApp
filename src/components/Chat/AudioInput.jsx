import React, { useState, useRef } from 'react';
import { Mic, Square, Upload } from 'lucide-react';
import { Button } from '../ui/button';

const AudioInput = ({ onAudioCapture }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result.split(',')[1];
          onAudioCapture({
            type: 'input_audio',
            input_audio: { data: base64Audio, format: 'wav' }
          });
        };
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      setError('Error accessing microphone');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result.split(',')[1];
        onAudioCapture({
          type: 'input_audio',
          input_audio: { data: base64Audio, format: 'wav' }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={isRecording ? 'destructive' : 'default'}
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <Square className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      <label className="cursor-pointer">
        <Button type="button" variant="outline" size="icon">
          <Upload className="h-4 w-4" />
        </Button>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default AudioInput;
