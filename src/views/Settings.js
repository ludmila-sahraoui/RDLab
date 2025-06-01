// Component Structure for Settings Interface

import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Info } from 'lucide-react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import userprofile from './../assets/images/user.png'; // Adjust the path as necessary
import InputField from '../components/InputField';
import BtnStyle1 from '../components/BtnStyleOne';
import BtnStyle2 from '../components/BtnStyleTwo';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import GreenToggle from '../components/GreenToggle';
import DropDownBtn from '../components/DropDownBtn';
import SettingsSidebar from '../components/SideBarSettings';
import Header from '../components/HeaderSettings';
import SideBar from '../components/SideBar';
import SecuritySettings from '../components/SecuritySetting';
import AboutSettings from '../components/AboutSettings';
import AccountSettings from '../components/AccountSettings';
import GeneralSettings from '../components/GeneralSettings';
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('personal');
  
  // Define user data here inside the component (not in global scope)
  const userData = {
    user_email: 'safaachour0105@gmail.com',
    username: 'safa',
    profile_pic: userprofile
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar for Settings */}
      <SettingsSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="flex-1 overflow-auto p-6">
        <Header 
          user_email={userData.user_email} 
          username={userData.username}
          profile_pic={userData.profile_pic}
        />
        <SettingsContent activeSection={activeSection} />
      </div>
    </div>
  );
};

const SettingsContent = ({ activeSection }) => {
  // Render different content based on active section
  switch (activeSection) {
    case 'general':
      return <GeneralSettings />;
    case 'settings':
      return <AccountSettings />;
    case 'security':
      return <SecuritySettings />;
    case 'about':
      return <AboutSettings />;
    default:
      return <GeneralSettings />;
  }
};
export default SettingsPage;