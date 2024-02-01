import React, { useState, useEffect, useRef } from 'react'; // Importing necessary hooks and components from React
import { sendPromptToBackend, startNewSession, getPredefinedPrompts } from './api'; // Importing API functions
import './App.css'; // Importing CSS for the App

// Defining the type for a conversation entry
type ConversationEntry = {
  role: 'user' | 'assistant' | 'system'; // Role can be 'user', 'assistant', or 'system'
  prompt?: string; // The prompt from the user
  response?: string; // The response from the assistant
  content?: string; // The content from the system
};

function App() {
  // State variables for the App
  const [prompt, setPrompt] = useState(''); // The current prompt
  const [selectedPredefinedPrompt, setSelectedPredefinedPrompt] = useState(''); // The selected predefined prompt
  const [conversation, setConversation] = useState<ConversationEntry[]>([ // The conversation history
    { role: 'system', content: 'Willkommen zu meinem Chatbot.' }
  ]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [predefinedPrompts, setPredefinedPrompts] = useState<string[]>([]); // Predefined prompts
  const chatContainerRef = useRef<HTMLDivElement>(null); // Reference to the chat container

  // Fetch predefined prompts when the component mounts
  useEffect(() => {
    getPredefinedPrompts().then(setPredefinedPrompts);
  }, []);

  // Scroll to the bottom of the chat container whenever the conversation changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Function to handle sending a prompt
  const handleSendPrompt = async () => {
    const userEntry: ConversationEntry = { role: 'user', prompt };
    setConversation([...conversation, userEntry]);

    setIsLoading(true);

    const result = await sendPromptToBackend(prompt);
    if (result && result.choices) {
      const botEntry: ConversationEntry = { role: 'assistant', response: result.choices[0].message.content };
      setConversation([...conversation, userEntry, botEntry]);
    } else {
      const errorEntry: ConversationEntry = { role: 'assistant', response: "Fehler beim Laden der Antwort." };
      setConversation([...conversation, userEntry, errorEntry]);
    }

    setIsLoading(false);
    setPrompt('');
    setSelectedPredefinedPrompt('');
  };

  // Function to handle starting a new session
  const handleNewSession = async () => {
    await startNewSession();
    setConversation([{ role: 'system', content: 'Neue Session gestartet.' }]);
  };

  // Function to handle selecting a predefined prompt
  const handleSelectPredefinedPrompt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPrompt = e.target.value;
    setSelectedPredefinedPrompt(selectedPrompt);
    setPrompt(selectedPrompt);
  };

  // The JSX for the App
  return (
    <div className="main-container">
      <header>
        <h1>Chatbot</h1>
      </header>

      <div className="chat-output" ref={chatContainerRef}>
        {conversation.map((entry, index) => (
          <div key={index} className={`chat-message ${entry.role}`}>
            {entry.role === 'user' && <span className="user-logo">👤</span>}
            {entry.role === 'assistant' && <span className="bot-logo">🤖</span>}
            {entry.role === 'system' && <span className="system-logo">🌐</span>}
            <strong>{entry.role === 'user' ? 'Ich:' : entry.role === 'assistant' ? 'Bot:' : 'System:'}</strong>
            <div className="message-content">{entry.prompt || entry.response || entry.content}</div>
          </div>
        ))}
        {isLoading && <div className="chat-message loading">Bot antwortet...</div>}
      </div>

      <div className="dropdown-menu">
        <select value={selectedPredefinedPrompt} onChange={handleSelectPredefinedPrompt}>
          <option value="">Wählen Sie eine vorgefertige Nachricht aus dieser Liste</option>
          {predefinedPrompts.map((prompt, index) => (
            <option key={index} value={prompt}>{prompt}</option>
          ))}
        </select>
      </div>

      <div className="chat-input">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Nachricht an Chatbot ..."
        />
        <div className="chat-input-buttons">
          <button className="send-button" onClick={handleSendPrompt}>Send</button>
          <button className="new-session-button" onClick={handleNewSession}>New Session</button>
        </div>
      </div>
    </div>
  );
}

export default App; // Exporting the App component