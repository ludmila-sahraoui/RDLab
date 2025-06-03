import React from 'react';
const Header = ({user_email, username, profile_pic}) => {
  return (
    <header className="flex items-center mb-6 gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img 
          src={profile_pic || "/default-avatar.png"} 
          alt={username || "User"} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800">{username || "User"}</h1>
        <p className="text-sm text-gray-600">{user_email || "No email provided"}</p>
      </div>
    </header>
  );
};
export default Header;