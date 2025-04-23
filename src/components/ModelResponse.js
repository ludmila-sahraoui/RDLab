import React from "react";
import modelIcon from "../assets/images/logo.svg";
import { RefreshCcw } from "lucide-react";

const ModelResponse = ({ id, responseText, timestamp, onRegenerate }) => {
  return (
    <div className="flex flex-col items-start w-full px-4 py-2">
      <span className="text-xs text-gray-500 mb-1 ml-8">{timestamp}</span>

      <div className="relative w-[80%] flex items-start bg-purple-medium rounded-xl p-5 pr-10 shadow-md">
        <img
          src={modelIcon}
          alt="Model"
          className="w-10 h-10 rounded-lg absolute -left-4 -top-4 hidden sm:block"
        />

        <div className="flex flex-col ml-0 sm:ml-2 w-full">
          <p className="text-sm text-black break-words">{responseText}</p>

          <button
            onClick={() => onRegenerate(id)}
            className="mt-3 flex items-center space-x-1 bg-white text-gray-600 hover:text-black py-0.5 px-2 rounded-md text-xs w-fit"
          >
            <RefreshCcw size={12} />
            <span>Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelResponse;
