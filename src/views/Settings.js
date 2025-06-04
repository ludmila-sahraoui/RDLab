// Component Structure for Settings Interface
import axios from "axios";
import React, { useState, useEffect } from 'react';
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
  const [username, setUserName] = useState(''); 
  const [useremail, setUserEmail] = useState(''); 
  

  // Fetch user Info
      const fetchInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8000/user/profile/');
          return response.data;
        } catch (error) {
          console.error("Error fetching profile info:", error);
          throw new Error("Failed to fetch profile info");
        }
      };
    
      // Use effect to get the user INFO
      useEffect(() => {
        const getProfile = async () => {
          try {
            const info = await fetchInfo();
            setUserName(info.name);
            setUserEmail(info.email);
          } catch (error) {
            console.error("Could not fetch user profile information", error);
          }
        };
    
        getProfile();
      }, []);
  

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar for Settings */}
      <SettingsSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="flex-1 overflow-auto p-6">
        <Header 
          user_email={useremail} 
          username={username}
          profile_pic={userprofile}
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