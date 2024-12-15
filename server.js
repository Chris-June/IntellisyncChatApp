import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { generateSystemMessage } from './src/config/ai-personality.js';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5174', // Allow requests from Vite dev server
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Verify API key is configured
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is not configured in .env file');
  process.exit(1);
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    console.log('Received chat request with messages:', JSON.stringify(messages, null, 2));
    
    // Use the system message from the client request
    const systemMessage = messages.find(msg => msg.role === 'system') || {
      role: 'system',
      content: 'You are a helpful assistant.'
    };
    console.log('Using system message:', JSON.stringify(systemMessage, null, 2));

    // Filter out the system message from messages to avoid duplication
    const userMessages = messages.filter(msg => msg.role !== 'system');

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        systemMessage,
        ...userMessages
      ],
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,
      stream: true,
    });

    console.log('Received response from OpenAI');

    if (!completion.choices || !completion.choices[0] || !completion.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    const response = {
      role: completion.choices[0].message.role,
      content: completion.choices[0].message.content,
    };

    console.log('Sending response:', JSON.stringify(response, null, 2));
    res.json(response);
  } catch (error) {
    console.error('Error in chat completion:', error);
    const errorMessage = error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image with prompt:', prompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log('Image generated successfully');
    res.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/download-image', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    console.log('Downloading image from:', url);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');

    // Get the content type from the original response
    const contentType = response.headers.get('content-type');
    
    // Forward the image with appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', 'attachment; filename=generated-image.png');
    
    // Pipe the response directly to the client
    response.body.pipe(res);
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Failed to download image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
