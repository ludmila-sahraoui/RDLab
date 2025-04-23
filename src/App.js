import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatSidebar from './components/ChatHistory';
import Sidebar from './components/SideBar';
import LoginPage from './views/Login';
import SignupPage from './views/Signup';
import WelcomeAssistant from './views/WelcomeAssistant';
import ChatPage from './views/ChatPage';

function App() {
  const [showChatHistory, setShowChatHistory] = useState(false);

  return (
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Signup Page */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Welcome Page with Sidebar Layout */}
        <Route
          path="/welcome"
          element={
            <div className="flex w-full h-screen overflow-hidden">
              {/* Sidebar */}
              <Sidebar />

              {/* Chat Sidebar */}
              {showChatHistory && (
                <div className="w-1/3 h-full overflow-y-auto bg-white shadow-md z-40">
                  <ChatSidebar
                    isOpen={true}
                    onClose={() => setShowChatHistory(false)}
                  />
                </div>
              )}

              {/* Main Content */}
              <div
                className={`flex-1 h-full overflow-hidden transition-all duration-300`}
              >
                <ChatPage setShowChatHistory={setShowChatHistory} />
              </div>
            </div>
          }
        />

      </Routes>
  );
}

export default App;
