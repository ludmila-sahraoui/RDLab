import React, { useState } from 'react';
import userImage from '../assets/images/user.png';
import {
  FiMenu, FiMessageCircle, FiFileText, FiBarChart2,
  FiUsers, FiSettings, FiLogOut, FiMoon, FiSun
} from 'react-icons/fi';

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { icon: <FiMessageCircle />, label: 'Chats' },
    { icon: <FiFileText />, label: 'Documents' },
    { icon: <FiBarChart2 />, label: 'Dashboard' },
    { icon: <FiUsers />, label: 'Users' },
    { icon: <FiSettings />, label: 'Settings' },
    { icon: <FiLogOut />, label: 'Logout' }
  ];

  return (
    <div className="w-[4%] shadow-md bg-white min-h-screen fixed left-0 top-0 space-y-2">

      {/* Top Section */}
      <div className="flex flex-col items-center gap-6 mt-4 mb-16">
        <FiMenu className="text-xl text-purple-dark bg-grey-light rounded-r-md" />
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
            onClick={() => setActiveIndex(index)}
            className="relative group cursor-pointer"
          >
            {/* Purple Active Bar */}
            {activeIndex === index && (
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-8 bg-purple-dark rounded-r-md" />
            )}
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${
                activeIndex === index ? 'bg-purple-dark text-white' : 'bg-grey-light text-purple-dark'
              }`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

     {/* Bottom Section - Dark Mode Toggle */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300"
        >
          {/* Sun Icon */}
          <div
            className={`p-2 rounded-lg ${!darkMode ? 'bg-purple-dark text-white' : 'bg-grey-light text-purple-dark'} transition-all duration-300`}
          >
            <FiSun />
          </div>

          {/* Moon Icon */}
          <div
            className={`p-2 rounded-lg ${darkMode ? 'bg-purple-dark text-white' : 'bg-grey-light text-purple-dark'} transition-all duration-300`}
          >
            <FiMoon />
          </div>
        </button>
      </div>
    </div>
  );
}
