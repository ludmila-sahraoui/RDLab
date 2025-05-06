import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const startChat = () => setHasChatStarted(true);

  const addChat = (title, preview) => {
    const newChat = {
      id: Date.now(),
      title: title || "New Chat",
      preview: preview || "Start typing...",
      timestamp: new Date().toLocaleString(),
      isSaved: false,
      messages: [],
    };

    // Use functional update to ensure we're working with the latest state
    setChats(prevChats => {
      const updatedChats = [...prevChats, newChat];
      // Now that we're in the setChats callback, we can safely update other states
      setCurrentChatId(newChat.id);
      return updatedChats;
    });
    return newChat;
  };

  useEffect(() => {
    if (currentChatId && !hasChatStarted && chats.length > 0) {
      setHasChatStarted(true);
    }
  }, [currentChatId, hasChatStarted, chats]);


  const currentChat = chats.find((chat) => chat.id === currentChatId) || null;

  const toggleSaveChat = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, isSaved: !chat.isSaved } : chat
      )
    );
  };

  const addMessageToChat = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
            }
          : chat
      )
    );
  };

  const updateChatTitleAndPreview = (chatId, newTitle, newPreview) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle || chat.title,
              preview: newPreview || chat.preview,
            }
          : chat
      )
    );
  };

  const getModelResponse = async (messages) => {
    try {
      const concatenatedMessage = messages.map((msg) => msg.text).join(".\n ");
  
      // Call the FastAPI RAG endpoint
      const res = await axios.post("http://localhost:8888/rag", {
        question: concatenatedMessage,
        category: "Drilling", 
      });
  
      const titlePrompt = "Give a short 2 word title for this context: " + concatenatedMessage;
  
      const suggestedTitleResponse = await axios.post("http://localhost:8888/rag", {
        question: titlePrompt,
        category: "Drilling",
      });
      console.log("Final reply:", res.data.answer);
      console.log("Suggested title:", suggestedTitleResponse.data.answer);
      return {
        reply: res.data.answer,
        suggestedTitle: suggestedTitleResponse.data.answer,
      };
    } catch (err) {
      console.error("API Error:", err);
      return {
        reply: "Sorry, I couldn't get a response at the moment.",
        suggestedTitle: "Untitled Chat",
      };
    }
  };
  
  
  const handleEditMessage = async (msgId, newText) => {
    // Find the index of the message being edited
    const index = currentChat.messages.findIndex((msg) => msg.id === msgId);
    
    // Slice the messages array to remove messages up to the edited one
    const updatedMessages = currentChat.messages.slice(0, index);

    // Clear the current chat messages and set the updated messages
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
      )
    );
    // Call handleSendMessage to handle sending the updated conversation forward
    handleSendMessage(newText);
  };
  
  // Add handleRegenerate function
  const handleRegenerate = async (modelId) => {
    const index = currentChat.messages.findIndex((m) => m.id === modelId);
    if (index < 1) return;

    const userText = currentChat.messages[index - 1]?.text;
    
    // Slice the messages array to remove messages up to the edited one
    const updatedMessages = currentChat.messages.slice(0, index-1);

    // Clear the current chat messages and set the updated messages
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
      )
    );
    // Call handleSendMessage to handle sending the updated conversation forward
    handleSendMessage(userText);
  };

  const handleSendMessage = async (userInput, chatId = currentChatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (!userInput.trim() || !chat) return;
    console.log(userInput)
    const timestamp = new Date().toLocaleString();
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userInput,
      timestamp,
    };

    addMessageToChat(chat.id, userMsg);
    setIsLoading(true);

    try {
      const messages = chat.messages.concat(userMsg);
      const { reply, suggestedTitle } = await getModelResponse(messages);
      const modelMsg = {
        id: Date.now(),
        sender: "model",
        text: reply, 
        timestamp: new Date().toLocaleString(),
      };
      addMessageToChat(chat.id, modelMsg);

      updateChatTitleAndPreview(
        chat.id,
        suggestedTitle.slice(0, 30) + "...",
        reply.slice(0, 60) + "..."
      );
    } catch {
      addMessageToChat(chat.id, {
        id: Date.now() +1 ,
        sender: "model",
        text: "Sorry, I couldn't get a response at the moment.",
        timestamp: new Date().toLocaleString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        showChatHistory,
        setShowChatHistory,
        hasChatStarted,
        startChat,
        chats,
        setChats,
        currentChatId,
        setCurrentChatId,
        currentChat,
        addChat,
        toggleSaveChat,
        addMessageToChat,
        isLoading,
        setIsLoading,
        handleSendMessage,
        userInput,
        setUserInput,
        handleEditMessage,
        handleRegenerate,
        chats
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
