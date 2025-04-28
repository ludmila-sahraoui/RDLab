import { useState, useRef, useEffect } from 'react';
import { imgConfig } from '../constants/confFileIcon';
import { IoMdMore } from "react-icons/io";


// add later the delete and the add category 
const UploadFile = ({ fileName, fileType, fileSize, removeFile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    // Close the dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[97%] h-auto flex items-center bg-white p-3 rounded-3xl shadow-sm relative">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
                <img
                    src={imgConfig[fileType] || imgConfig['default']}
                    alt={fileType}
                    className="w-8 h-8"
                />
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate whitespace-nowrap overflow-ellipsis">
                    {fileName}
                </p>
                <p className="text-xs font-medium ">
                    {fileSize}
                </p>
            </div>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-4 p-2 rounded-full hover:bg-purple-medium transition duration-200"
                >
                    <IoMdMore className="text-2xl text-purple-dark hover:text-purple-hover transition duration-200" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-purple-dark hover:bg-purple-medium rounded-t-xl"
                            onClick={()=>{
                                //setIsOpen(!isOpen); 
                            }}
                        > change Category
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-purple-dark hover:bg-purple-medium rounded-b-xl"
                            onClick={() => {
                                setIsOpen(false);
                                removeFile();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadFile;
