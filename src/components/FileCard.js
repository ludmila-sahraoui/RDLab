import { MoreVertical } from "lucide-react";
import { imgConfig } from '../constants/gridIconConfig';
import { useState } from "react";
import DeletePopup from './DeletePopUp';

export default function DocumentCard({ title = "Document Title", category = "Category", fileType = 'default',preview="", removeFile }) {
  const CategoryColors = {
    "Engineering": "bg-purple-100 text-purple-700",
    "Research": "bg-green-100 text-green-700",
    "Intern": "bg-yellow-100 text-yellow-700",
  };
 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-grey-light rounded-2xl p-4 w-50 flex flex-col items-center shadow-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <img
            src={imgConfig['pdf'] || imgConfig['default']}
            alt={fileType}
            className="w-5 h-5"
          />
          <div className="font-medium text-sm text-gray-800 truncate max-w-[110px]">
            {title}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1 rounded-full hover:bg-purple-medium transition duration-200"
          >
            <MoreVertical className="text-xs text-purple-dark hover:text-purple-hover transition duration-200" />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  // maybe show more information modal
                }}
                className="block w-full text-left px-4 py-2 text-sm text-purple-dark hover:bg-purple-medium rounded-t-xl"
              >
                More Information
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false); 
                  setTimeout(() => { 
                    setShowPopup(true); 
                  }, 0); 
                }}
                className="block w-full text-left px-4 py-2 text-sm text-purple-dark hover:bg-purple-medium rounded-b-xl"
              >
                Delete File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white/40 rounded-xl w-full h-40 flex mb-1 items-center justify-center">
      <img src={`data:image/jpeg;base64,${preview}`}
                  alt="Document thumbnail"
                  className="min-w-full min-h-full object-cover" />
      </div>

      {/* Footer */}
      <div className={`p-1 mt-1 rounded-full text-xs cursor-pointer ${CategoryColors[category]}`}>
        {category}
      </div>

      {/* Popup */}
      {showPopup && (
        <DeletePopup
        fileName= {title}
        onClose={() => setShowPopup(false)}
        onDelete={() => {
          removeFile();
          setShowPopup(false);
        }}
      />
      )}
    </div>
  );
}
