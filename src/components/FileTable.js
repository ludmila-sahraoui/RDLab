import React, { useState, useEffect } from 'react';
import { imgConfig } from '../constants/confFileIcon';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import DeletePopup from './DeletePopUp';

const FileTable = ({ filesData, onFileChange }) => {
    const CategoryColors = {
        "Engineering": "bg-purple-100 text-purple-700",
        "Researcher": "bg-green-100 text-green-700",
        "Intern": "bg-yellow-100 text-yellow-700",
    };

    const [fileList, setFileList] = useState(filesData || []);

    useEffect(() => {
        setFileList(filesData || []);
    }, [filesData]);

    const [showPopup, setShowPopup] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);

    const fileRemove = (file) => {
        const updatedList = fileList.filter(f => f !== file);
        setFileList(updatedList);
        if (onFileChange) {
            onFileChange(updatedList);
        }
    };

    return (
        <div className="overflow-auto custom-scrollbar w-full">
            <div className="rounded-lg shadow-lg">
                {/* Table Headers */}
                <div className="grid grid-cols-6 gap-0">
                    <div className="col-span-6 grid grid-cols-6 gap-0 bg-green-dark h-14 rounded-t-lg border-b border-gray-20">
                        <div className="flex items-center justify-center text-sm font-semibold">File Name</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Type</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Size</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Date</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Category</div>
                        <div className="flex items-center justify-center text-sm font-semibold"></div>
                    </div>

                    {/* Table Rows */}
                    {fileList.length === 0 ? (
                        <div className="col-span-6 flex justify-center items-center h-24 text-gray-500">
                            No files available
                        </div>
                    ) : (
                        fileList.map((row, index) => (
                            <div
                                key={index}
                                className="col-span-6 grid grid-cols-6 gap-0 h-14 items-center border-b border-gray-200"
                            >
                                <div className="flex items-center justify-start text-sm text-gray-700 pl-4 overflow-hidden whitespace-nowrap truncate max-w-md">
                                    {row.fileName.length > 30
                                        ? `${row.fileName.slice(0, 27)}...`
                                        : row.fileName}
                                </div>

                                <div className="flex items-center justify-center text-sm text-gray-700">
                                    <img
                                        src={imgConfig[row.type] || imgConfig['default']}
                                        alt={row.type}
                                        className="w-8 h-8"
                                    />
                                </div>
                                <div className="flex items-center justify-center text-sm text-gray-700">{row.size}</div>
                                <div className="flex items-center justify-center text-sm text-gray-700">{row.date}</div>
                                <div className="flex items-center justify-center">
                                    <span className={`px-2 py-1 rounded-full text-xs cursor-pointer ${CategoryColors[row.category]}`}>
                                        {row.category}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() => {
                                            setFileToDelete(row); // Save the file you want to delete
                                            setShowPopup(true);   // Then show the popup
                                        }}
                                        className="ml-2 p-2 rounded-full hover:bg-purple-medium transition duration-200"
                                    >
                                        <IoIosRemoveCircleOutline className="text-2xl text-purple-dark hover:text-purple-hover transition duration-200" />
                                    </button>
                                </div>

                            </div>

                        ))
                    )}
                </div>
            </div>
            {/* Popup */}
            {showPopup && fileToDelete && (
                <DeletePopup
                    fileName={fileToDelete.fileName}
                    onClose={() => {
                        setShowPopup(false);
                        setFileToDelete(null);
                    }}
                    onDelete={() => {
                        fileRemove(fileToDelete);
                        setShowPopup(false);
                        setFileToDelete(null);
                    }}
                />
            )}

        </div>

    );
};

export default FileTable;
