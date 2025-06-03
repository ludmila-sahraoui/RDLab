import React, { useState } from 'react';
import BtnStyle2 from '../components/BtnStyleTwo';
import GreenToggle from '../components/GreenToggle';
import DropDownBtn from '../components/DropDownBtn';
const SecuritySettings = () => {
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [allowUsageData, setAllowUsageData] = useState(true);
  
  return (
      <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-semibold text-purple-dark mb-6">Login & Security</h1>
      
      {/* Multi-factor Authentication Section */}
      <div className="mb-8">
        <h2 className="font-medium text-gray-700 mb-2">Multi-factor authentication</h2>
        <hr className="my-6 border-gray-200" />
        <div className="flex justify-between items-center gap-10">
        <p className="text-sm text-gray-600 mb-3">
          Sign in with extra security. Challenge when logging in from a new device or browser. When you turn on MFA, you'll be able to recover your account using your phone or backup codes.
        </p>
        <BtnStyle2 label={'Enable'} />
        </div>
      </div>
      
      
      <div className="mb-8">
        <h2 className="font-medium text-gray-700 mb-2">Log out of all devices</h2>
        <hr className="my-6 border-gray-200" />
        <div className="flex justify-between items-center gap-10">

        <p className="text-sm text-gray-600 mb-3">
          Log out of all active sessions across all devices, including your current session. It may take up to 30 minutes for other devices to be logged out.
        </p>

        <BtnStyle2 label={'Log out All'} />         

        </div>
      </div>
      
      
      {/* Allow usage data Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center gap-10">
          <div className="pr-4">
            <h2 className="font-medium text-gray-700 mb-2">Allow usage data collection to improve system performance and user experience</h2>
            <hr className="my-6 border-gray-200" />
            <div className="flex justify-between items-center gap-10">

            <p className="text-sm text-gray-600 mb-3">
              We securely collect, consider disactivating when your device is low on storage, when you're in a resource-constrained environment or could suffer from improving the system.
            </p>
            <GreenToggle checked = {'false'} onClick={() => console.log('Changes saved')}/>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SecuritySettings;
