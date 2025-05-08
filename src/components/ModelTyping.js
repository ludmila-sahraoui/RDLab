// components/ModelTyping.js
import React from "react";
import modelIcon from "../assets/images/logo.svg";

const ModelTyping = () => {
  return (
    <div className="flex flex-col items-start w-full px-4 py-2">
      <div className="text-xs text-gray-500 mb-1 ml-8">Model is typing...</div>
      <div className="relative w-[80%] flex items-center bg-purple-light rounded-xl p-5 shadow-md">
        <img
          src={modelIcon}
          alt="Model"
          className="w-10 h-10 rounded-lg absolute -left-4 -top-4 hidden sm:block"
        />
        <div className="ml-0 sm:ml-2 flex space-x-1">
          <span className="animate-bounce delay-0">.</span>
          <span className="animate-bounce delay-200">.</span>
          <span className="animate-bounce delay-400">.</span>
        </div>
      </div>
    </div>
  );
};

export default ModelTyping;
