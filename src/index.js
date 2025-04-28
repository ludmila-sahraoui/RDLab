import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // ⬅️ Add this
import { ChatProvider } from './contexts/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter> {/* ⬅️ Wrap the App */}
    <ChatProvider>
      <App />
    </ChatProvider>
    </BrowserRouter>

);

reportWebVitals();
