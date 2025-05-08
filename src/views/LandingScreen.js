import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoWithSlogan from '../components/LogoSlogan';
import BtnStyle1 from '../components/BtnStyleOne';
import BtnStyle2 from '../components/BtnStyleTwo';
import ClientLogo from '../components/ClientLogo';
import loginImage from '../assets/images/background.svg';

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-0 right-0 h-screen w-full bg-cover bg-no-repeat bg-center flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="relative w-[70%] h-[90%] bg-white rounded-md shadow-md flex flex-col items-center justify-center px-10 py-8 gap-6 overflow-hidden">

        {/* Logo */}
        <div className="scale-90 md:scale-75 mb-6">
          <LogoWithSlogan />
        </div>

        {/* Headings */}
        <div className="text-center mb-8">
          <p className="text-[28px] md:text-[32px] font-semibold">Welcome to RDLab!</p>
          <p className="text-sm md:text-base text-black">Where Data meets Discovery</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 w-full max-w-xs justify-center">
        <div className="w-full">
            <BtnStyle2 label="Login" onClick={() => navigate('/login')} />
        </div>
        <div className="w-full">
            <BtnStyle1 label="Sign Up" onClick={() => navigate('/signup')} />
        </div>
        </div>
      </div>

      {/* Client Logo */}
      <div className="absolute bottom-4 right-4">
        <ClientLogo />
      </div>
    </div>
  );
};

export default LandingScreen;
