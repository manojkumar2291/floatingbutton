import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function mountFloatingButton() {
  let mountPoint = document.getElementById('floating-button-root');
  if (!mountPoint) {
    mountPoint = document.createElement('div');
    mountPoint.id = 'floating-button-root';
    document.body.appendChild(mountPoint);
  }

  ReactDOM.createRoot(mountPoint).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Automatically mount when script is loaded
mountFloatingButton();

// Optional: expose for manual control
window.FloatingButton = { mount: mountFloatingButton };
