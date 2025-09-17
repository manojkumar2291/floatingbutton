import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Dynamically create a mount point
const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);

// Render your widget into it
ReactDOM.createRoot(mountPoint).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
