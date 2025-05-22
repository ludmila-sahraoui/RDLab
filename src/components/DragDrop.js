import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import UploadFile from "./AddedFile";
import BtnStyle1 from "./BtnStyleOne";
import axios from 'axios';

const API_URL = "http://localhost:8000";

const DropFileInput = ({ onFileChange }) => {    
    const [fileList, setFileList] = useState([]);
    const [filesWithMetadata, setFilesWithMetadata] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showMetadataPopup, setShowMetadataPopup] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [metadata, setMetadata] = useState({
        title: '',
        author: '',
        category: 'General'
    });

    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('opacity-60');
    const onDragLeave = () => wrapperRef.current.classList.remove('opacity-60');
    const onDrop = () => wrapperRef.current.classList.remove('opacity-60');

    const onFileDrop = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const filteredFiles = files.filter(file => 
                !fileList.some(existingFile => 
                    existingFile.name === file.name && 
                    existingFile.size === file.size
                )
            );
            const updatedList = [...fileList, ...filteredFiles];
            setFileList(updatedList);
            onFileChange(updatedList);
            
            if (updatedList.length > 0) {
                setCurrentFileIndex(0);
                setShowMetadataPopup(true);
                const fileNameWithoutExt = updatedList[0].name.replace(/\.[^/.]+$/, "");
                setMetadata({
                    title: fileNameWithoutExt,
                    author: '',
                    category: 'General'
                });
            }
        }
    };

    const fileRemove = (file) => {
        // Remove from both lists if present
        const updatedFileList = fileList.filter(f => f !== file);
        const updatedFilesWithMetadata = filesWithMetadata.filter(f => f.file !== file);
        
        setFileList(updatedFileList);
        setFilesWithMetadata(updatedFilesWithMetadata);
        onFileChange(updatedFileList);
    };

    const getFileType = (file) => {
        if (!file) return '';
        const fileType = file.type.split('/')[1]; 
        return fileType ? fileType.toLowerCase() : '';
    };

    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) return `${sizeInBytes} B`;
        if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        if (sizeInBytes < 1024 * 1024 * 1024) return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    };

    const handleMetadataChange = (e) => {
        const { name, value } = e.target;
        setMetadata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMetadataNext = () => {
        // Save metadata for current file
        const currentFile = fileList[currentFileIndex];
        setFilesWithMetadata(prev => [
            ...prev,
            {
                file: currentFile,
                metadata: { ...metadata }
            }
        ]);

        // Move to next file or close popup
        if (currentFileIndex < fileList.length - 1) {
            setCurrentFileIndex(currentFileIndex + 1);
            const nextFileName = fileList[currentFileIndex + 1].name.replace(/\.[^/.]+$/, "");
            setMetadata({
                title: nextFileName,
                author: '',
                category: 'General'
            });
        } else {
            setShowMetadataPopup(false);
        }
    };

    const handleUploadAll = async () => {
        if (filesWithMetadata.length === 0 || filesWithMetadata.length !== fileList.length) return;

        setUploading(true);
        
        try {
            for (const { file, metadata } of filesWithMetadata) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);
                uploadFormData.append('title', metadata.title || file.name);
                uploadFormData.append('author', metadata.author || 'Unknown');
                uploadFormData.append('category', metadata.category || 'General');
                uploadFormData.append('documentPreview', '');

                await axios.post(`${API_URL}/admin/upload`, uploadFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                });
            }
            setFileList([]);
            setFilesWithMetadata([]);
        } catch (error) {
            console.error('Upload failed:', error);
            let errorMessage = 'Upload failed';
            
            if (error.response) {
                if (error.response.status === 403) {
                    errorMessage = 'You need admin privileges to upload files';
                } else {
                    errorMessage = error.response.data.detail || errorMessage;
                }
            }
            
            alert(errorMessage);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="relative w-[95%] h-[40%] border-2 border-dashed border-purple-dark rounded-2xl flex items-center justify-center bg-white transition-opacity duration-300 ease-in-out"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}     
            >
                <div className="text-center text-purple-hover font-medium p-2 pointer-events-none">
                    <IoCloudUploadOutline className="text-6xl mx-auto mb-4" />
                    <p className="text-xl">Drag & Drop your files here</p>
                </div>
                <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={onFileDrop}
                    multiple
                />
            </div>
        
            {fileList.length > 0 && (
                <div className="w-[95%] h-[60%] overflow-y-auto hide-scrollbar m-4 flex flex-col">
                    {/* File List */}
                    <div className="space-y-3 mb-16">
                        {fileList.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <UploadFile
                                    fileName={item.name}
                                    fileType={getFileType(item)}
                                    fileSize={formatFileSize(item.size)}
                                    removeFile={() => fileRemove(item)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Upload Button - Only enabled when all files have metadata */}
                    <div className="absolute bottom-10 right-8">
                        <BtnStyle1
                            label={uploading ? `Uploading... ${uploadProgress}%` : "Upload All"}
                            onClick={handleUploadAll}
                            disabled={uploading || filesWithMetadata.length !== fileList.length}
                        />
                    </div>
                </div>
            )}

            {/* Metadata Popup */}
            {showMetadataPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="text-xl font-semibold">
                                File {currentFileIndex + 1} of {fileList.length}: {fileList[currentFileIndex]?.name}
                            </h3>
                            <button 
                                onClick={() => setShowMetadataPopup(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={metadata.title}
                                    onChange={handleMetadataChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-medium focus:border-transparent"
                                    placeholder="Enter document title"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={metadata.author}
                                    onChange={handleMetadataChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-medium focus:border-transparent"
                                    placeholder="Enter author name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={metadata.category}
                                    onChange={handleMetadataChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-medium focus:border-transparent"
                                >
                                    <option value="General">General</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Research">Research</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-4 border-t">
                            <button
                                onClick={() => setShowMetadataPopup(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleMetadataNext}
                                className="px-4 py-2 bg-purple-dark text-white rounded hover:bg-purple-medium transition-colors"
                            >
                                {currentFileIndex < fileList.length - 1 ? 'Next' : 'Done'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
};

export default DropFileInput;