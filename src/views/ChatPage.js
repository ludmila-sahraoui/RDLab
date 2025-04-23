// ChatPage.js
import React, { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import ModelResponse from "../components/ModelResponse";
import UserMessage from "../components/UserMessage";
import ModelTyping from "../components/ModelTyping";


const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "model",
      text: "Hi! I'm here to assist with any questions you might have.",
      timestamp: new Date().toLocaleString(),
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const timestamp = new Date().toLocaleString();

    if (editingId !== null) {
      // Update user message
      const updatedMessages = messages.map((msg, idx) =>
        msg.id === editingId ? { ...msg, text: userInput, timestamp } : msg
      );

      setMessages(updatedMessages);
      setUserInput("");
      setEditingId(null);

      // Also regenerate the next model message
      const userIndex = updatedMessages.findIndex((msg) => msg.id === editingId);
      if (
        updatedMessages[userIndex + 1] &&
        updatedMessages[userIndex + 1].sender === "model"
      ) {
        const reply = await getModelResponse(userInput);
        const updatedModel = {
          ...updatedMessages[userIndex + 1],
          text: reply,
          timestamp: new Date().toLocaleString(),
        };

        const finalMessages = [...updatedMessages];
        finalMessages[userIndex + 1] = updatedModel;
        setMessages(finalMessages);
      }

      return;
    }

    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userInput,
      timestamp,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");

    try {
      setIsLoading(true);
      const reply = await getModelResponse(userInput);
      const newModelMessage = {
        id: messages.length + 2,
        sender: "model",
        text: reply,
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prev) => [...prev, newModelMessage]);
    } catch (err) {
      console.error("Model Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          sender: "model",
          text: "Sorry, I couldn't get a response at the moment.",
          timestamp: new Date().toLocaleString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleEditMessage = async (msgId, newText) => {
    const timestamp = new Date().toLocaleString();
  
    const updatedMessages = messages.map((msg) =>
      msg.id === msgId ? { ...msg, text: newText, timestamp } : msg
    );
  
    setMessages(updatedMessages);
    setUserInput("");
    setEditingId(null);
  
    // Find next message (which should be model's response)
    const userIndex = updatedMessages.findIndex((msg) => msg.id === msgId);
    if (
      updatedMessages[userIndex + 1] &&
      updatedMessages[userIndex + 1].sender === "model"
    ) {
      setIsLoading(true);
      const reply = await getModelResponse(newText);
      setIsLoading(false);
      const updatedModel = {
        ...updatedMessages[userIndex + 1],
        text: reply,
        timestamp: new Date().toLocaleString(),
      };
  
      const finalMessages = [...updatedMessages];
      finalMessages[userIndex + 1] = updatedModel;
      setMessages(finalMessages);
    }
  };
  

  const handleRegenerate = async (modelMessageId) => {
    const index = messages.findIndex((m) => m.id === modelMessageId);
    if (index === -1 || index === 0) return;

    const userMessage = messages[index - 1];
    setIsLoading(true);
    const newResponse = await getModelResponse(userMessage.text);
    setIsLoading(false);
    const updatedModelMessage = {
      ...messages[index],
      text: newResponse,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [...messages];
    updated[index] = updatedModelMessage;
    setMessages(updated);
  };

  const getModelResponse = async (input) => {
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        message: input,
      });
      return response.data.reply;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Sorry, I couldn't get a response at the moment.";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-4 w-[80%] mx-auto">
      {messages.map((msg, i) =>
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

      <div className="w-[80%] mx-auto mb-9 px-3 rounded-xl py-4 bg-grey-light">
        <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent new line
              handleSendMessage();
            }
          }}
          className="w-full text-sm bg-transparent outline-none text-black placeholder:text-black/30"
        />
          <div className="flex justify-end">
            <button
              onClick={handleSendMessage}
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
