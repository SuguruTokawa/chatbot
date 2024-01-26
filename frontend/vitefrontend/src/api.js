// Importiere das Axios-Modul
import axios from 'axios';

// Setze die Basis-URL für Axios
const BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// Funktion, um das Benutzer-Prompt an das Backend zu senden
export const sendPromptToBackend = async (prompt) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/openai`, { prompt });
    return response.data;
  } catch (error) {
    console.error('Error sending prompt to backend:', error);
    return null;
  }
};

// Funktion zum Starten einer neuen Session
export const startNewSession = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/new-session`);
    return response.data;
  } catch (error) {
    console.error('Error starting new session:', error);
    return null;
  }
};

// Funktion, um die vordefinierten Prompts vom Backend zu erhalten
export const getPredefinedPrompts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/predefined-prompts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching predefined prompts:', error);
    return null;
  }
};