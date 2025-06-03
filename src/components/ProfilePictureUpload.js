import React, { useState } from 'react';
import addgallery from './../assets/icons/gallery-add.svg';
import { Icon } from 'lucide-react';
const ProfilePictureUpload = () => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ marginTop: '10px', border: '1px dashed #ccc', borderRadius: '5px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#f0f0f0', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <img src={addgallery} width={24} height={24} color="#5e2e85" />  
        </div>
        <label htmlFor="profile-picture-upload" style={{ cursor: 'pointer', color: '#5e2e85' }}>
          Upload your photo
          <input type="file" id="profile-picture-upload" style={{ display: 'none' }} />
        </label>
      </div>
    </div>
  );
};
export default ProfilePictureUpload;