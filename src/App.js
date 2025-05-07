import './App.css';
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
import ManageUsersPage from './views/UsersPage';
import ManageRolesPage from './views/RolesPage';
import Dashboard from './views/Dashboard'
import FileManagementScreen from './views/FileManagementPage';

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
          {/* Public Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing" element={<LandingScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Pages with Sidebar Layout */}
          <Route
            path="/users"
            element={
              <div className="flex w-full h-screen overflow-hidden">
                <Sidebar />
                <div className="main-content flex-1">
                  <ManageUsersPage />
                </div>
              </div>
            }
          />
          <Route
            path="/roles"
            element={
              <div className="flex w-full h-screen overflow-hidden">
                <Sidebar />
                <div className="main-content flex-1">
                  <ManageRolesPage />
                </div>
              </div>
            }
          />
          <Route
            path="/documents"
            element={
              <div className="flex w-full h-screen overflow-hidden">
                <Sidebar />
                <div className="main-content flex-1">
                  <FileManagementScreen />
                </div>
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div className="flex w-full h-screen overflow-hidden">
                <Sidebar />
                <div className="main-content flex-1">
                  <Dashboard />
                </div>
              </div>
            }
          />
          <Route
            path="/chat"
            element={
              <div className="flex w-full h-screen overflow-hidden">
                <Sidebar />
                {/* Chat Sidebar (optional based on showChatHistory) */}
                {showChatHistory && (
                  <div className="max-w-1/4 h-full overflow-y-auto bg-white shadow-md z-40">
                    <ChatSidebar
                      isOpen={true}
                      onClose={() => setShowChatHistory(false)}
                    />
                  </div>
                )}
                {/* Main Chat Area */}
                <div className="flex-1 h-full overflow-hidden transition-all duration-300">
                  {hasChatStarted ? <ChatPage /> : <WelcomeAssistant />}
                </div>
              </div>
            }
          />
        </Routes>
  );
}

export default App;
