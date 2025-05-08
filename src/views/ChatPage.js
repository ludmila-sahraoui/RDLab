import React from "react";
import { FiSend } from "react-icons/fi";
import { useChatContext } from "../contexts/ChatContext";
import ModelResponse from "../components/ModelResponse";
import UserMessage from "../components/UserMessage";
import ModelTyping from "../components/ModelTyping";

const ChatPage = () => {
  const { currentChat, handleSendMessage, isLoading, setUserInput, userInput, handleEditMessage, handleRegenerate } = useChatContext();

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-4 w-[80%] mx-auto">
        {currentChat?.messages.map((msg) =>
          msg.sender === "user" ? (
            <UserMessage
              key={msg.id}
              id={msg.id}
              message={msg.text}
              timestamp={msg.timestamp}
              onEdit={handleEditMessage}
            />
          ) : (
            <ModelResponse
              key={msg.id}
              id={msg.id}
              responseText={msg.text}
              timestamp={msg.timestamp}
              onRegenerate={handleRegenerate}
            />
          )
        )}
        {isLoading && <ModelTyping />}
      </div>

      {/* Message input */}
      <div className="w-[80%] mx-auto mb-9 px-3 py-4 bg-grey-light rounded-xl">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)} // Update value here
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(userInput); 
                setUserInput('');
              }
            }}
            className="w-full text-sm bg-transparent outline-none text-black placeholder:text-black/30"
          />
          <div className="flex justify-end">
            <button
              onClick={() => {
                handleSendMessage(userInput)
                setUserInput('');
              }
            }
              className="flex items-center gap-1 p-2 hover:bg-black/5 rounded-lg"
            >
              <FiSend className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
