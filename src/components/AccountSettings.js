import React from 'react';
import InputField from './InputField';
import BtnStyle1 from './BtnStyleOne';
import BtnStyle2 from './BtnStyleTwo';
import ProfilePictureUpload from './ProfilePictureUpload';
import { useState } from 'react';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    phone: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    

      <div className="bg-white rounded-lg shadow p-8">
          <div className="flex-col items-center gap-20 mb-6">
          <h1 className="text-xl font-semibold text-purple-dark mb-6">Account Settings</h1>
          <p className="text-sm text-gray-600 mb-3">Upload a profile picture</p>
          <div className="w-1/3"><ProfilePictureUpload /></div>
          <hr className="my-6 border-gray-200" />


        <div className=" grid grid-cols-1 md:grid-cols-2 justify-items-center gap-y-10 gap-x-4 mb-4" >
          <InputField
          label="Full Name"
          hint="Please enter your full name"
          value={formData.fullName}
          onChange={handleChange('fullName')}
        />
          <InputField
            label="Email"
            type="email"
            hint="Please enter your email"
            value={formData.email}
            onChange={handleChange('email')}
          />
          <InputField
            label="Username"
            hint="Please enter your username"
            value={formData.username}
            onChange={handleChange('username')}
          />
          <InputField
            label="Phone Number"
            type="tel"
            hint="+213 Please enter your phone number"
            value={formData.phone}
            onChange={handleChange('phone')}
          />
          </div>
        <div className="flex justify-center items-center gap-10">
          <BtnStyle1
            label="Save"
            onClick={() => console.log('Changes saved')}
            />

            <BtnStyle2 label ="Reset"
            onClick={() => console.log('Changes saved')}
            />
          </div>
          </div>
          </div>

 
  );
};


export default AccountSettings;