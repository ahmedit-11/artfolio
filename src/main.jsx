// main.jsx
// Entry point for the React application. Sets up the root and renders the App component.

import React from 'react';
// Import createRoot for React 18+ rendering
import { createRoot } from 'react-dom/client';
// Import the main App component
import App from './App.jsx';
// Import global styles
import './index.css';
import axios from 'axios';
 import Cookies from 'js-cookie';
// Import react-toastify CSS
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = false;
 // Attach Authorization header from cookie token on each request
 axios.interceptors.request.use(
   (config) => {
     const token = Cookies.get('token');
     if (token) {
       config.headers = config.headers || {};
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   },
   (error) => Promise.reject(error)
 );
// Create the root element and render the App inside React.StrictMode for highlighting potential problems
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>
);
