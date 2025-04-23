import React, { useState } from 'react';
import LogoWithSlogan from '../components/LogoSlogan.js';
import loginImage from '../assets/images/bg.svg';
import ClientLogo from '../components/ClientLogo';
import InputField from '../components/InputField'; 
import BtnStyle1 from '../components/BtnStyleOne.js';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-grey-light flex items-center justify-center px-4 py-10">
      <div className="relative w-[70%] h-[98%] bg-white rounded-md shadow-md flex flex-col lg:flex-row overflow-hidden items-center justify-center">
        
        {/* Left Image */}
        <div className="hidden lg:flex w-[45%] h-full items-center justify-center">
          <img
            src={loginImage}
            alt="Login Visual"
            className="h-[90%] w-[90%] object-contain rounded-md"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-[55%] h-full flex flex-col items-center p-6 md:p-12 gap-4">
          <div className="relative flex flex-col items-center scale-90 md:scale-75">
            <LogoWithSlogan />
          </div>

          <div className="text-center">
            <p className="text-[28px] md:text-[32px] font-semibold">Welcome!</p>
            <p className="text-sm md:text-base text-black mt-1">Log into your account</p>
          </div>

          <div className="w-full max-w-sm space-y-6">
            <InputField
              label="Enter Your Email"
              hint="Email..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Enter Your Password"
              hint="Password..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full max-w-sm text-right">
            <a href="#" className="text-xs text-purple-medium">
              Forgot Password?
            </a>
          </div>

          <div className="w-2/3 ">
            <div className="h-0.5 bg-purple-dark rounded-xl mb-2"></div>
            <div className="flex justify-center gap-6 text-sm">
              <span>Don't Have An Account?</span>
              <Link to="/signup" className="text-purple-dark font-semibold hover:underline"> Sign Up </Link>
            </div>
          </div>

          <div className="absolute bottom-8 right-4">
            <Link to="/welcome">
                <BtnStyle1 label="Log In" onClick={() => console.log('Logging in with', email, password)} />
            </Link>
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

export default LoginPage;
