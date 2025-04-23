import React, { useState } from "react";
import { Pencil } from "lucide-react";
import User from "../assets/images/user.png";

const UserMessage = ({ id, message, timestamp, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleSave = () => {
    onEdit(id, editedMessage);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-end px-4 py-2 w-full">
      <div className="flex justify-between items-center w-full max-w-md pl-8 pr-2 mb-1">
        <span className="text-sm font-semibold text-black">You</span>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>

      <div className="relative max-w-md w-full flex items-start bg-grey-light rounded-xl p-5 pr-12 shadow-md">
        <img
          src={User}
          alt="User Avatar"
          className="w-10 h-10 rounded-lg absolute -left-4 -top-5 hidden sm:block"
        />

        <div className="flex flex-col ml-0 sm:ml-4 w-full">
          {isEditing ? (
            <>
              <textarea
                className="w-full p-2 text-black bg-gray-200 rounded-md resize-none"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                rows={3}
              />
              <button
                onClick={handleSave}
                className="p-2 bg-purple-dark text-white rounded-md mt-2 self-end"
              >
                Save
              </button>
            </>
          ) : (
            <p className="text-sm text-black break-words">{message}</p>
          )}
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Edit message"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserMessage;
