// Import the Axios module
import axios from 'axios';

// Set the base URL for Axios
const BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// Function to send the user prompt to the backend
export const sendPromptToBackend = async (prompt) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/openai`, { prompt });
    return response.data;
  } catch (error) {
    console.error('Error sending prompt to backend:', error);
    return null;
  }
};

// Function to start a new session
export const startNewSession = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/new-session`);
    return response.data;
  } catch (error) {
    console.error('Error starting new session:', error);
    return null;
  }
};

// Function to get the predefined prompts from the backend
export const getPredefinedPrompts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/predefined-prompts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching predefined prompts:', error);
    return null;
  }
};
