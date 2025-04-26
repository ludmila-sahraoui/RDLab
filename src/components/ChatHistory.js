import { useState } from "react";
import { FiPlus, FiMoreHorizontal, FiBookmark } from "react-icons/fi";
import { MdChat, MdBookmark } from "react-icons/md";
import SearchBar from "./SearchBar";
import logo from '../assets/images/logoRDLab.svg'; 
import FilterBtn from "../components/FilterBtn";
import { useChatContext } from "../contexts/ChatContext";

function ChatItem({ title, preview, time, isSaved, onSave, isActive, onClick }) {
  return (
    <div
      className={`relative shadow-md rounded-lg p-4 flex flex-col gap-2 cursor-pointer transition-all w-full overflow-hidden ${
        isActive ? 'bg-purple-medium ' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <img src={logo} alt="RDLab Logo" className="w-4 h-4 object-contain" />
          <span className="text-sm font-semibold text-neutral-800">{title}</span>
        </div>
        <span className="text-xs text-gray-500 w-full line-clamp-2">{preview}</span>
      </div>

      <div className={`absolute bottom-2 right-2 text-[10px] ${isActive ? 'text-white' : 'text-neutral-400'}`}>
        {time}
      </div>

      <div className="absolute top-2 right-2">
        <button onClick={(e) => {
          e.stopPropagation();
          onSave();
        }}>
          {isSaved ? (
            <MdBookmark className="w-4 h-4 text-purple-dark" />
          ) : (
            <FiBookmark className="w-3 h-3 text-purple-dark" />
          )}
        </button>
      </div>
    </div>
  );
}

function ToggleBar({ chatsCount, savedCount, selected, onSelect }) {
  const baseButtonStyle = "flex items-center justify-between px-2 py-1 rounded-md flex-1 min-w-[40%] aspect-[4/1]";
  const labelStyle = "text-[10px] font-semibold";

  return (
    <div className="flex gap-2 px-2 py-2 w-[90%] rounded-md bg-grey-light">
      <button
        onClick={() => onSelect("chats")}
        className={`${baseButtonStyle} ${selected === "chats" ? "bg-white text-purple-dark" : "bg-grey-light text-neutral-700"}`}
      >
        <div className="flex items-center gap-1">
          <MdChat className="w-4 h-4 text-purple-dark" />
          <span className={labelStyle}>CHATS</span>
        </div>
        <div className={`rounded px-2 py-0.5 text-[10px] font-semibold ${selected === "chats" ? "bg-purple-dark text-white" : "bg-grey-medium text-neutral-700"}`}>
          {chatsCount.toString().padStart(2, "0")}
        </div>
      </button>

      <button
        onClick={() => onSelect("saved")}
        className={`${baseButtonStyle} ${selected === "saved" ? "bg-white text-purple-dark" : "bg-grey-light text-neutral-700"}`}
      >
        <div className="flex items-center gap-1">
          <MdBookmark className="w-4 h-4 text-purple-dark" />
          <span className={labelStyle}>SAVED</span>
        </div>
        <div className={`rounded px-2 py-0.5 text-[10px] font-semibold ${selected === "saved" ? "bg-purple-dark text-white" : "bg-grey-medium text-neutral-700"}`}>
          {savedCount.toString().padStart(2, "0")}
        </div>
      </button>
    </div>
  );
}

export default function ChatSidebar({ isOpen, onClose }) {
  const { chats, currentChatId, setCurrentChatId, addChat, toggleSaveChat } = useChatContext();
  const [showSaved, setShowSaved] = useState(false);

  if (!isOpen) return null;

  return (
    <aside className="w-full flex-shrink-0 border-r h-full flex flex-col bg-background">
      <div className="sticky top-0 z-10 bg-white pb-2">
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-lg font-semibold">My Chats</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-muted bg-purple-dark rounded-md" onClick={() => addChat()}>
              <FiPlus className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 hover:bg-muted bg-grey-light rounded-md" onClick={onClose}>
              <FiMoreHorizontal className="h-5 w-5 " />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <ToggleBar
            chatsCount={chats.length}
            savedCount={chats.filter(chat => chat.isSaved).length}
            selected={showSaved ? "saved" : "chats"}
            onSelect={(option) => setShowSaved(option === "saved")}
          />
        </div>

        <div className="flex items-center justify-between gap-2 px-4 py-2 w-full">
          <SearchBar />
          <FilterBtn />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-4 py-4 space-y-1">
        {chats
          .filter(chat => (showSaved ? chat.isSaved : true))
          .map(chat => (
            <ChatItem
              key={chat.id}
              title={chat.title}
              preview={chat.preview}
              time={chat.time}
              isSaved={chat.isSaved}
              onSave={() => toggleSaveChat(chat.id)}
              isActive={currentChatId === chat.id}
              onClick={() => setCurrentChatId(chat.id)}
            />
        ))}
      </div>
    </aside>
  );
}
