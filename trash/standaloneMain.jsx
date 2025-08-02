
import React from 'react';
import { createRoot } from 'react-dom/client';
import StandaloneApp from './StandaloneApp.jsx';
import './index.css';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StandaloneApp />
  </React.StrictMode>
);
