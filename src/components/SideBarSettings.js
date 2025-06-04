import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const SettingsSidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'general', label: 'General', icon: <HomeIcon size={18} /> },
    { id: 'settings', label: 'Account Settings', icon: <SettingsIcon size={18} /> },
    { id: 'security', label: 'Login & Security ', icon: <SecurityIcon size={18} /> },
    { id: 'about', label: 'About', icon: <InfoOutlinedIcon size={18} /> },
  ];

  return (
    <div className="l-[4%] w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h2 className="ml-14 text-xl font-semibold mb-6">Settings</h2>
       
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full p-3 text-left ${
                  activeSection === item.id
                    ? ' hover:text-bg-purple text-bg-purple'
                    : 'text-gray-700 '
                }`}
              >
                <span className="ml-12"></span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SettingsSidebar;