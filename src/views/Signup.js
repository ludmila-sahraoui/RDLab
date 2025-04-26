import React, { useState } from 'react';
import LogoWithSlogan from '../components/LogoSlogan';
import InputField from '../components/InputField';
import BtnStyle1 from '../components/BtnStyleOne';
import ClientLogo from '../components/ClientLogo';
import { Link } from 'react-router-dom';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    extraInfo: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-grey-light flex items-center justify-center px-4 py-10">
      <div className="relative w-[70%] h-[98%] bg-white rounded-md shadow-md flex flex-col items-center px-10 py-8 overflow-hidden">

        {/* Logo */}
        <div className="scale-90 md:scale-75">
          <LogoWithSlogan />
        </div>

        {/* Headings */}
        <div className="text-center mb-3">
          <p className="text-[28px] md:text-[32px] font-semibold">Get Started Now</p>
          <p className="text-sm md:text-base text-black ">Create your account</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <InputField
            label="Name"
            hint="Name...."
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <InputField
            label="Password"
            hint="Password..."
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <InputField
            label="Phone Number"
            hint="Phone...."
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <InputField
            label="Confirm Your Password"
            hint="Confirm password..."
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
          />
          <InputField
            label="Email Address"
            hint="Email..."
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <InputField
            label="Another Information to be added"
            hint="..."
            value={formData.extraInfo}
            onChange={(e) => handleChange('extraInfo', e.target.value)}
          />
        </div>

        {/* Sign Up Button */}
        <div className="mt-6">
          <Link to="/chat">
          <BtnStyle1 label="Sign Up" onClick={() => console.log('Sign Up Data', formData)} />
          </Link>
        </div>

      </div>

      {/* Client Logo */}
      <div className="absolute bottom-4 right-4">
          <ClientLogo />
      </div>

    </div>
  );
};

export default SignupPage;
