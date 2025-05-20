import React from 'react';
import { imgConfig } from '../constants/confFileIcon';
import { IoIosRemoveCircleOutline } from "react-icons/io";



const FileTable = ({ filesData, onFileChange }) => {

    return (
        <div className="overflow-auto  custom-scrollbar w-full">
            <div className=" rounded-lg shadow-lg">
                {/* Table Headers */}
                <div className="grid grid-cols-6 gap-0 ">
                    <div className="col-span-6 grid grid-cols-6 gap-0 bg-green-dark  h-14 rounded-t-lg border-b border-gray-20">
                        <div className="flex items-center justify-center text-sm font-semibold">File Name</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Type</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Size</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Date</div>
                        <div className="flex items-center justify-center text-sm font-semibold">Category</div>
                        <div className="flex items-center justify-center text-sm font-semibold"></div>
                    </div>

                    {/* Table Rows */}
                    {filesData.map((row, index) => (
                        <div    
                            key={index}
                            className={`col-span-6 grid grid-cols-6 gap-0 h-14 items-center  border-b border-gray-200`}
                        >
                            <div className="flex items-center justify-center text-sm text-gray-700">{row.fileName}</div>
                            <div className="flex items-center justify-center text-sm text-gray-700">
                                <img
                                    src={imgConfig['pdf'] || imgConfig['default']}
                                    alt={row.type}
                                    className="w-8 h-8"
                                />
                            </div>
                            <div className="flex items-center justify-center text-sm text-gray-700">30MB</div>
                            <div className="flex items-center justify-center text-sm text-gray-700">{row.date}</div>
                            <div className="flex items-center justify-center">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    {row.category}
                                </span>
                            </div>
                            <div className="flex items-center justify-center">
                            <button
                                                onClick={() => {
                                                    console.log(" hello you deleted the file")
                                                }}
                                                className="ml-2 p-2 rounded-full hover:bg-purple-medium transition duration-200"
                                            >
                                                <IoIosRemoveCircleOutline className="text-2xl text-purple-dark hover:text-purple-hover transition duration-200" />
                                            </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default FileTable;
