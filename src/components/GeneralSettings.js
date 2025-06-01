import React, { useState } from 'react';
import Dropdown2 from './DropDownBtn2';
import GreenToggle from './GreenToggle';
const GeneralSettings = () => {
  const [theme, setTheme] = useState('System');
  const [language, setLanguage] = useState('Auto-detect');
  const [notifications, setNotifications] = useState({
    newAgent1: true,
    newAgent2: true,
    newAgent3: true,
    newAgent4: true
  });
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(prev => !prev);
    console.log("Toggled! New state:", !isOn);
  };
  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className=" mx-auto p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-purple-800 mb-6 border-b pb-2">General</h2>

      <div className="grid grid-cols-2 gap-x-10 gap-y-10">
        {/* Theme Selector */}
        <Dropdown2
          label="Theme" 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            options={['System', 'Light', 'Dark']}
        />
        <Dropdown2
          label="Language" 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={['English', 'Français', 'عربية']}
        />

        <div className="flex justify-between items-center gap-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification when New Agent is added
            </label>
            <GreenToggle checked={isOn} onClick={handleToggle}/>
           </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
