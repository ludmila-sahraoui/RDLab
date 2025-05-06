import React, { useState } from 'react';
import LogoWithSlogan from '../components/LogoSlogan';
import InputField from '../components/InputField';
import BtnStyle1 from '../components/BtnStyleOne';
import ClientLogo from '../components/ClientLogo';
import { Link } from 'react-router-dom';
import axios from 'axios';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const res = await axios.post('http://localhost:8000/user/signup/', payload);
      alert('Signup successful! You can now log in.');
      console.log('Signup Response:', res.data);
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert(error.response?.data?.detail || "Signup failed.");
    }
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-grey-light flex items-center justify-center px-4 py-10">
      <div className="relative w-[70%] h-[98%] bg-white rounded-md shadow-md flex flex-col items-center px-10 py-4 overflow-hidden">

        {/* Logo */}
        <div className="scale-75 md:scale-60">
          <LogoWithSlogan />
        </div>

        {/* Headings */}
        <div className="text-center mb-4">
          <p className="text-3xl md:text-3xl font-semibold">Create an account</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <InputField
            label="Name"
            hint="Name...."
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <InputField
            label="Email Address"
            hint="Email..."
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <InputField
            label="Phone Number"
            hint="Phone...."
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <InputField
            label="Password"
            hint="Password..."
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <InputField
            label="Date of Birth"
            hint=""
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
          <InputField
            label="Confirm Your Password"
            hint="Confirm password..."
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
          />
        </div>

        {/* Sign Up Button */}
        <div className="flex justify-center gap-6 text-sm mt-6">
          <span>Already Have An Account?</span>
          <Link to="/login" className="text-purple-dark font-semibold hover:underline"> Log In </Link>
        </div>
        <div className="mt-6">
          <Link to="/chat">
          <BtnStyle1 label="Sign Up" onClick={handleSignup} />
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
