import React, { useState } from "react";
import modelIcon from "../assets/images/logo.svg";
import { RefreshCcw, Copy, Heart, HeartIcon } from "lucide-react";

const ModelResponse = ({ id, responseText, timestamp, onRegenerate }) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(responseText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset after 1.5s
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start w-[80%] px-4 py-2">
      {/* Timestamp + Icons Row */}
      <div className="flex justify-between items-center w-full mb-1 ml-8">
        <span className="text-xs text-gray-500">{timestamp}</span>

        <div className="flex gap-2 items-center mr-4 pr-4 relative">
          <button
            onClick={handleCopy}
            className="p-1 rounded-md bg-grey-light hover:bg-gray-300"
            title="Copy"
          >
            <Copy size={14} className="text-gray-600" />
          </button>
          {copied && (
            <div className="absolute -top-5 right-8 px-2 py-0.5 text-xs text-grey-medium">Copied!</div>
          )}

          <button
            onClick={handleLike}
            className={`p-1 rounded-md bg-grey-light hover:bg-gray-300`}
            title="Like"
          >
            {liked ? (
              <HeartIcon size={14} className="text-purple-dark" />
            ) : (
              <Heart size={14} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Response Box */}
      <div className="relative w-full flex items-start bg-purple-medium rounded-xl p-5 pr-10 shadow-md">
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
