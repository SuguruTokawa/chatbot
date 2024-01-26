import React, { useState, useEffect, useRef } from 'react';
import { sendPromptToBackend, startNewSession, getPredefinedPrompts } from './api';
import './App.css';

type ConversationEntry = {
  role: 'user' | 'assistant' | 'system';
  prompt?: string;
  response?: string;
  content?: string;
};

function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedPredefinedPrompt, setSelectedPredefinedPrompt] = useState('');
  const [conversation, setConversation] = useState<ConversationEntry[]>([
    { role: 'system', content: 'Willkommen zu meinem Chatbot.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [predefinedPrompts, setPredefinedPrompts] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPredefinedPrompts().then(setPredefinedPrompts);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

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

  const handleNewSession = async () => {
    await startNewSession();
    setConversation([{ role: 'system', content: 'Neue Session gestartet.' }]);
  };

  const handleSelectPredefinedPrompt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPrompt = e.target.value;
    setSelectedPredefinedPrompt(selectedPrompt);
    setPrompt(selectedPrompt);
  };

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

export default App;