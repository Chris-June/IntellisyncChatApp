import React, { useState } from 'react';
import { Wand2, Loader2, X } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = import.meta.env.VITE_API_URL;

const ImageGeneration = ({ onImageGenerated, onAddToChat }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) throw new Error('Failed to generate image');

      const data = await response.json();
      
      // Add the prompt and generated image to chat
      onAddToChat([
        { role: 'user', content: `Generate an image: ${prompt.trim()}` },
        { role: 'assistant', content: '', image: data.imageUrl }
      ]);
      
      setGeneratedImage(data.imageUrl);
      onImageGenerated(data.imageUrl);
      setPrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearImage = () => {
    setGeneratedImage(null);
    onImageGenerated(null);
  };

  return (
    <div className="space-y-4 w-full">
      {generatedImage ? (
        <div className="relative">
          <img
            src={generatedImage}
            alt="Generated"
            className="w-full h-auto rounded-lg"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 rounded-md bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button 
            type="submit" 
            size="icon"
            className="shrink-0"
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
          </Button>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default ImageGeneration;
