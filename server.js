import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { generateSystemMessage } from './src/config/ai-personality.js';
import { formatAIResponse } from './src/utils/responseFormatter.js';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

// Security headers middleware
app.use((req, res, next) => {
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self'; " +
    "frame-ancestors 'none'; " +
    "connect-src 'self' https://api.openai.com"
  );

  // X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY');

  // Other security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

app.use(cors({
  origin: 'http://localhost:5174',
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

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, persona = 'general', userName } = req.body;
    
    // Get the appropriate system message based on persona
    const systemMessage = generateSystemMessage(persona);
    
    // Add user context to system message
    const userContextMessage = {
      role: 'system',
      content: `The user's name is ${userName}. Please refer to them by name occasionally to maintain a personal connection.`
    };

    // Filter out any previous system messages
    const userMessages = messages.filter(msg => msg.role !== 'system');

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable proxy buffering
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' https://api.openai.com");
    res.setHeader('X-Frame-Options', 'DENY');
    res.flushHeaders(); // Immediately send headers

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        systemMessage,
        userContextMessage,
        ...userMessages
      ],
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
      stream: true,
    });

    let accumulatedContent = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      accumulatedContent += content;
      
      // Format the accumulated content
      const formattedContent = formatAIResponse(accumulatedContent);
      
      // Send the chunk to the client
      res.write(`data: ${JSON.stringify({
        role: 'assistant',
        content: formattedContent,
        name: systemMessage.name,
        done: false
      })}\n\n`);
    }

    // Send the final message
    res.write(`data: ${JSON.stringify({
      role: 'assistant',
      content: formatAIResponse(accumulatedContent),
      name: systemMessage.name,
      done: true
    })}\n\n`);

    res.end();
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.write(`data: ${JSON.stringify({ error: 'Failed to get chat response' })}\n\n`);
    res.end();
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
