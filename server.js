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
    "img-src 'self' data: blob: https: https://oaidalleapiprodscus.blob.core.windows.net; " +
    "font-src 'self'; " +
    "connect-src 'self' http://localhost:* https://api.openai.com ws: wss:;"
  );

  // X-Frame-Options
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Other security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5173', 
      'http://localhost:5174', 
      'http://127.0.0.1:5173', 
      'http://127.0.0.1:5174'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// List of supported models
const SUPPORTED_MODELS = {
  'gpt-4': 'GPT-4',
  'gpt-4-1106-preview': 'GPT-4 Turbo',
  'gpt-3.5-turbo': 'GPT-3.5 Turbo',
  'gpt-3.5-turbo-1106': 'GPT-3.5 Turbo Latest',
  'gpt-4o-mini': 'GPT-4o Mini'
};

// Verify API key is configured
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is not configured in .env file');
  process.exit(1);
}

// Verify model configuration
const configuredModel = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
console.log('Configured OpenAI Model:', configuredModel);
console.log('Supported Models:', Object.keys(SUPPORTED_MODELS));

if (!SUPPORTED_MODELS[configuredModel]) {
  console.warn(`Warning: Configured model "${configuredModel}" is not in supported model list. Falling back to gpt-3.5-turbo`);
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, persona = 'english', userInfo } = req.body;
    
    console.log('Received request with persona:', persona); // Debug log
    
    // Get the appropriate system message based on persona
    const systemMessage = generateSystemMessage(persona);
    
    // Add user context to system message
    const userContextMessage = {
      role: 'system',
      content: `The user's name is ${userInfo.name}. They are ${userInfo.age} years old and in ${userInfo.grade}. Please adjust your teaching style and explanations to be appropriate for their grade level, ensuring the content is engaging and understandable for their age group. Refer to them by name occasionally to maintain a personal connection.`
    };

    // Filter out any previous system messages and clean message format
    const userMessages = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    // Set response headers for streaming
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    const stream = await openai.chat.completions.create({
      model: SUPPORTED_MODELS[configuredModel] ? configuredModel : 'gpt-3.5-turbo',
      messages: [
        systemMessage,
        {
          role: 'system',
          content: persona === 'french-language' ? 
            `You are a French language tutor. Always respond in a way that helps students learn French. If the student writes in English, respond with both French and English translations to help them learn. If they write in French, gently correct any mistakes and provide the correct form.` :
            persona === 'english' ?
            `You are an English language and literature tutor. Focus on grammar, vocabulary, writing skills, and literary analysis. Help students improve their writing by providing constructive feedback. When analyzing literature, guide them through themes, characters, and literary devices. Correct grammar mistakes gently and explain the rules.` :
            persona === 'math' ?
            `You are a Mathematics tutor. Break down complex problems into simple steps. Always show your work and explain each step clearly. Use real-world examples to illustrate concepts. If a student makes a mistake, help them understand why it's wrong and guide them to the correct solution. Encourage different problem-solving approaches.` :
            persona === 'science' ?
            `You are a Science tutor. Explain scientific concepts using clear, age-appropriate language. Connect theories to real-world applications. When discussing experiments, emphasize scientific method and safety. Use analogies to explain complex concepts. Encourage critical thinking and hypothesis formation.` :
            persona === 'history' ?
            `You are a History tutor. Present historical events in an engaging narrative style. Help students understand cause and effect relationships in history. Connect historical events to present-day situations when relevant. Encourage critical analysis of historical sources and different perspectives.` :
            persona === 'geography' ?
            `You are a Geography tutor. Help students understand both physical and human geography. Use maps and real-world examples to explain geographical concepts. Connect geographical features to human activities and climate patterns. Discuss environmental issues and their geographical impact.` :
            persona === 'social-studies' ?
            `You are a Social Studies tutor. Help students understand civics, economics, and social systems. Use current events as teaching opportunities. Encourage critical thinking about social issues. Help students understand different cultures and perspectives.` :
            persona === 'guidance-counselor' ?
            `You are a Guidance Counselor. Provide supportive, empathetic guidance for academic and personal development. Help students with study skills, time management, and educational planning. Offer stress management techniques and positive coping strategies. Always maintain an encouraging and supportive tone.` :
            persona === 'health-wellness' ?
            `You are a Health & Wellness educator. Focus on physical and mental health topics. Promote healthy lifestyle choices through age-appropriate explanations. Discuss nutrition, exercise, mental health, and personal well-being. Always maintain a supportive and non-judgmental tone.` :
            `You are an Educational Assistant. Provide clear, engaging, and age-appropriate guidance in your subject area.`
        },
        userContextMessage,
        ...userMessages
      ],
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
      stream: true,
    });

    let accumulatedContent = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      accumulatedContent += content;
      
      // Format the accumulated content
      const formattedContent = formatAIResponse(accumulatedContent);
      
      // Send the formatted content
      res.write(`data: ${JSON.stringify({
        content: formattedContent,
        done: false
      })}\n\n`);
    }

    // Send the final message
    res.write(`data: ${JSON.stringify({
      content: formatAIResponse(accumulatedContent),
      done: true
    })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = {
      error: error.message || 'An error occurred during the chat.',
      code: error.code,
      type: error.type,
      param: error.param,
      statusCode: error.status || 500
    };

    // Only send error response if headers haven't been sent
    if (!res.headersSent) {
      res.status(errorMessage.statusCode).json(errorMessage);
    } else {
      // If headers were already sent, send error in stream format
      res.write(`data: ${JSON.stringify({ ...errorMessage, done: true })}\n\n`);
      res.end();
    }
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

    if (!response.data || !response.data[0] || !response.data[0].url) {
      throw new Error('Invalid response from OpenAI API');
    }

    console.log('Image generated successfully. URL:', response.data[0].url);
    res.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error.message);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    res.status(500).json({ 
      error: error.message || 'Failed to generate image',
      details: error.response?.data || {}
    });
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

// Test OpenAI connection endpoint
app.get('/api/test-openai', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Hello, this is a test message. Please respond with 'OpenAI connection successful!'" }],
      model: SUPPORTED_MODELS[configuredModel] ? configuredModel : 'gpt-3.5-turbo',
      max_tokens: 50
    });

    res.json({
      status: 'success',
      message: 'OpenAI connection test successful',
      response: completion.choices[0].message.content,
      model: completion.model,
      usage: completion.usage
    });
  } catch (error) {
    console.error('OpenAI test error:', error);
    res.status(500).json({
      status: 'error',
      message: 'OpenAI connection test failed',
      error: {
        message: error.message,
        type: error.type,
        code: error.code
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
