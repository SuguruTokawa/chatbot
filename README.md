# My Chatbot Project

This project is an interactive chatbot application that integrates the OpenAI API, allowing users to send and receive messages through a web interface. The application features a user-friendly interface where users can enter multi-line prompts, receive responses from OpenAI's GPT-4 model, choose from predefined prompt templates, and start new chat sessions.

## Features

- User input of multi-line prompts.
- Display of responses from OpenAI GPT-4.
- Selection of predefined prompts from a dropdown menu.
- Starting a new session to clear conversation history.

## Technologies

- Frontend: React (with TypeScript), Axios
- Backend: Node.js, Express, OpenAI API, CORS, CSV Parser, and CSV Writer

## Prerequisites

- Node.js and npm
- An OpenAI API key

## Installation

1. Clone this repository.
   ```sh
   git clone [Repository-URL]

2. Navigate to the cloned repository's directory.
   ```sh
   cd [Repository-Name]

## Setting Up the Backend:
1. Navigate to the backend directory.
   ```sh
   cd ../backend
   
3. Install the required packages.
   ```sh
   npm init -y
   npm install express
   npm install openai
   npm install dotenv
   npm install cors
   npm install csv-parser
   npm install csv-writer
   
4. A template of the .env file is provided. Replace YOUR-API-KEY with your own OpenAI API key.
   ```sh
   OPENAI_API_KEY=Your-API-Key
   
5. Start the backend server.
   ```sh
   node server.js

## Setting Up the Frontend:
1. Navigate to the frontend directory.
   ```sh
   cd ../frontend
   
2. Install the required packages.
   ```sh
   npm create vite@latest vitefrontend -- --template react-ts
   npm install axios
   npm install dotenv

4. Start the frontend application.
   ```sh
   npm run dev

## Usage:
Once both the backend and frontend are running, open your browser and navigate to http://localhost:3000 to use the chatbot.

## Contributions:
Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.
