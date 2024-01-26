// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');

// Initialize express app
const app = express();

// Use cors and json middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Store conversation history
let conversationHistory = [];

// Load predefined prompts
let predefinedPrompts = [];
fs.createReadStream('predefined_prompts.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Add each prompt to the predefinedPrompts array
    predefinedPrompts.push(row.prompt);
  })
  .on('end', () => {
    // Log when all prompts are loaded
    console.log('Predefined prompts loaded successfully from CSV file.');
  });

// Handle POST requests to /api/openai
app.post('/api/openai', async (req, res) => {
  try {
    // Return error if no prompt is provided
    if (!req.body.prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    // Add user's prompt to conversation history
    const userPrompt = req.body.prompt;
    conversationHistory.push({ role: "user", content: userPrompt });

    // Generate a completion using OpenAI
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-4",
    });

    // Throw error if response from OpenAI is invalid
    if (!completion || !completion.choices || completion.choices.length === 0) {
      throw new Error('Invalid response from OpenAI API');
    }

    // Add assistant's response to conversation history
    conversationHistory.push({ role: "assistant", content: completion.choices[0].message.content });

    // Write conversation history to CSV file
    const csvWriter = createCsvWriter({
      path: 'conversation.csv',
      header: [
        { id: 'role', title: 'ROLE' },
        { id: 'content', title: 'CONTENT' }
      ]
    });

    await csvWriter.writeRecords(conversationHistory);
    console.log('Conversation history added to conversation.csv.');

    // Send completion back to client
    res.json(completion);
  } catch (error) {
    // Log any errors and send error message back to client
    console.error('Error processing request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle POST requests to /api/new-session
app.post('/api/new-session', async (req, res) => {
  // Clear conversation history
  conversationHistory = [];
  try {
    // Delete conversation history file
    await fs.promises.unlink('conversation.csv');
    console.log('New session started, conversation history cleared.');
  } catch (err) {
    // Log any errors
    console.error('Error clearing conversation history:', err);
  }
  // Send success message back to client
  res.status(200).send('New session started, conversation history cleared.');
});

// Set port from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle GET requests to /api/predefined-prompts
app.get('/api/predefined-prompts', (req, res) => {
  // Send predefined prompts back to client
  res.json(predefinedPrompts);
});