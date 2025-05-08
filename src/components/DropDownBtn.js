import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const DropdownMenuButton = ({ label = "Options", items = [], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-dark text-white rounded-2xl hover:bg-purple-hover h-9 transition duration-200"
            >
                <span>{label}</span>
                <IoIosArrowDown className="text-lg" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg z-50">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className="block w-full text-left px-4 py-2 text-sm text-purple-dark hover:bg-purple-medium first:rounded-t-xl last:rounded-b-xl"
                            onClick={() => {
                                setIsOpen(false);
                                onSelect?.(item); // Trigger the callback with the selected item
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenuButton;
