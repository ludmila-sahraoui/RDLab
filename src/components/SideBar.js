import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import userImage from '../assets/images/user.png';
import { ReactComponent as Marker } from "../assets/icons/Marker.svg";
import {
  FiMenu, FiMessageCircle, FiFileText, FiBarChart2,
  FiUsers, FiSettings, FiLogOut, FiMoon, FiSun, FiShield
} from 'react-icons/fi';
import ChatSidebar from './ChatHistory';
import LogoutPopup from './Logout';
import axios from "axios";

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [userRole, setUserRole] = useState(''); 
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/logout/', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data = await response.json();
      console.log(data.message);
      setShowLogoutPopup(false);

      // Optionally redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error.message);
      alert('Logout failed. Try again.');
    }
  };

  // Fetch user role
  const fetchRole = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/role/');
      return response.data.role;
    } catch (error) {
      console.error("Error fetching role:", error);
      throw new Error("Failed to fetch role");
    }
  };

  // Use effect to get the user role
  useEffect(() => {
    const getRole = async () => {
      try {
        const role = await fetchRole();
        setUserRole(role);
      } catch (error) {
        console.error("Could not fetch user role", error);
      }
    };

    getRole();
  }, []);

  // Define full menu with Roles page only for "admin"
  const fullMenu = [
    { icon: <FiMessageCircle />, label: 'Chats' },
    { icon: <FiFileText />, label: 'Documents' },
    { icon: <FiBarChart2 />, label: 'Dashboard' },
    { icon: <FiUsers />, label: 'Users' },
    { icon: <FiShield />, label: 'Roles' },
    { icon: <FiSettings />, label: 'Settings' },
    { icon: <FiLogOut />, label: 'Logout' },
  ];

  // Filter menu based on role
  const menuItems = fullMenu.filter(item => {
    if (userRole === 'Admin') return true;
    if (userRole === 'Researcher') return !['Dashboard', 'Users', 'Roles'].includes(item.label);
    if (userRole === 'User') return ['Chats', 'Settings', 'Logout'].includes(item.label);
    return false;
  });

  // Sync activeIndex with URL path
  useEffect(() => {
    const path = location.pathname;
    const labelToPath = {
      'Chats': '/chat',
      'Documents': '/documents',
      'Dashboard': '/dashboard',
      'Users': '/users',
      'Roles': '/roles',
      'Settings': '/settings',
      'Logout': '/login', // optional
    };

    const currentLabel = Object.entries(labelToPath).find(([label, route]) => path.startsWith(route))?.[0];
    const index = menuItems.findIndex(item => item.label === currentLabel);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [location.pathname, menuItems, activeIndex]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[4%] shadow-md bg-white min-h-screen fixed left-0 top-0 space-y-2 z-50 flex flex-col justify-between">

        {/* Top Section */}
        <div className="flex flex-col items-center gap-6 mt-4 mb-16">
          <button
            className={`p-2 hover:bg-muted bg-grey-light rounded-md ${
              showChatHistory || activeIndex !== 0 ? 'invisible' : ''
            }`}
            onClick={() => setShowChatHistory(true)}
          >
            <FiMenu className="text-xl text-purple-dark bg-grey-light rounded-r-md" />
          </button>

          <img
            src={userImage}
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>

        {/* Middle Section - Icons */}
        <div className="flex flex-col items-center gap-6 mt-10 flex-grow">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(index);

                // Close ChatSidebar if another icon is clicked
                if (item.label !== 'Chats') {
                  setShowChatHistory(false);
                } else {
                  setShowChatHistory(true);
                }

                if (item.label === 'Chats') navigate('/chat');
                else if (item.label === 'Documents') navigate('/documents');
                else if (item.label === 'Dashboard') navigate('/dashboard');
                else if (item.label === 'Users') navigate('/users');
                else if (item.label === 'Settings') navigate('/settings');
                else if (item.label === 'Logout') setShowLogoutPopup(true);
                else if (item.label === 'Roles') navigate('/roles');
              }}
              className="relative group cursor-pointer"
            >
              {activeIndex === index && (
                <Marker className="w-8 h-8 absolute -left-5 " />
              )}
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-purple-dark text-white'
                    : 'bg-grey-light text-purple-dark'
                }`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Dark Mode Toggle */}
        <div className="mb-12 flex flex-col items-center gap-2 ">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 m-2 rounded-lg bg-grey-light w-[50%] flex flex-col items-center justify-center transition-all duration-300"
          >
            {/* Sun Icon */}
            <div
              className={`p-1 rounded-lg ${!darkMode ? 'bg-purple-dark text-white' : 'bg-grey-light text-purple-dark'} transition-all duration-300`}
            >
              <FiSun className="w-3 h-3" />
            </div>

            {/* Moon Icon */}
            <div
              className={`p-1 rounded-lg ${darkMode ? 'bg-purple-dark text-white' : 'bg-grey-light text-purple-dark'} transition-all duration-300`}
            >
              <FiMoon className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area including ChatSidebar */}
      <div className="ml-[15%] max-w-[25vw] flex-grow">
        {showChatHistory && (
          <ChatSidebar
            isOpen={showChatHistory}
            onClose={() => setShowChatHistory(false)}
          />
        )}
      </div>
      {showLogoutPopup && (
        <LogoutPopup
          onCancel={() => setShowLogoutPopup(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
