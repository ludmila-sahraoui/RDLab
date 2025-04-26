import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatSidebar from './components/ChatHistory';
import Sidebar from './components/SideBar';
import LoginPage from './views/Login';
import SignupPage from './views/Signup';
import WelcomeAssistant from './views/WelcomeAssistant';
import ChatPage from './views/ChatPage';
import SplashScreen from './views/SplashScreen';
import LandingScreen from './views/LandingScreen';
import { useChatContext } from './contexts/ChatContext'; 


function App() {
  const {
    showChatHistory,
    setShowChatHistory,
    hasChatStarted,
    startChat,
    setHasChatStarted,
  } = useChatContext();


  return (
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/landing" element={<LandingScreen />} />

        {/* Signup and Login Page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Welcome Page with Sidebar Layout */}
        <Route
        path="/chat"
        element={
          <div className="flex w-full h-screen overflow-hidden">
            <Sidebar />
            {showChatHistory && (
              <div className="w-1/4 min-w-1/4 max-w-1/4 h-full overflow-y-auto bg-white shadow-md z-40">
                <ChatSidebar
                  isOpen={true}
                  onClose={() => setShowChatHistory(false)}
                />
              </div>
            )}
            <div className="flex-1 h-full overflow-hidden transition-all duration-300">
              {hasChatStarted ? (
                <ChatPage />
              ) : (
                <WelcomeAssistant />
              )}
            </div>
          </div>
        }
      />
        

      </Routes>
  );
}

export default App;
