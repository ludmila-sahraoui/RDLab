import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi'; // Feather send icon
import logo from '../assets/images/logoRDLab.svg'; 

const WelcomeAssistant = () => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (prompt.trim()) {
      console.log('User prompt:', prompt);
      setPrompt('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white font-sans gap-7">
      <img
        src={logo}
        alt="RDLab Logo"
        className="w-[6%] h-auto"
      />
      
      <p className="text-lg font-semibold text-center text-black">
        Your AI-Powered Work Partner
      </p>

      <div className="flex flex-col items-start w-[50%] gap-2 px-3 py-4 rounded-2xl bg-grey-light border">
        <div className="flex flex-col items-start w-full gap-2 px-2 rounded-lg">
          <p className="text-sm text-black">
            | What's on your mind?
          </p>
          <input
            type="text"
            placeholder="Start typing..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full text-sm bg-transparent outline-none border-none text-black placeholder:text-black/30"
          />
        </div>

        <div className="flex justify-end items-center w-full h-7 mt-2">
          <button
            onClick={handleSend}
            className="flex justify-center items-center p-1 rounded-lg hover:bg-black/5 cursor-pointer"
          >
            <FiSend className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAssistant;
