// main.jsx
// Entry point for the React application. Sets up the root and renders the App component.

import React from 'react';
// Import createRoot for React 18+ rendering
import { createRoot } from 'react-dom/client';
// Import the main App component
import App from './App.jsx';
// Import global styles
import './index.css';
// Import react-toastify CSS
import 'react-toastify/dist/ReactToastify.css';

// Create the root element and render the App inside React.StrictMode for highlighting potential problems
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
