import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadFile from "./AddedFile";
import BtnStyle1 from "./BtnStyleOne";


const DropFileInput = props => {    

    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('opacity-60');
    const onDragLeave = () => wrapperRef.current.classList.remove('opacity-60');
    const onDrop = () => wrapperRef.current.classList.remove('opacity-60');

    const onFileDrop = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const filteredFiles = files.filter(file => 
                !fileList.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)
            );
            const updatedList = [...fileList, ...filteredFiles];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    const getFileType = (file) => {
        if (!file) return '';
        const fileType = file.type.split('/')[1]; 
        return fileType ? fileType.toLowerCase() : '';
    };

    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) {
            return `${sizeInBytes} B`;
        } else if (sizeInBytes < 1024 * 1024) {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        } else if (sizeInBytes < 1024 * 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
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
            multiple // Allow multiple file selection
          />
        </div>
      
        {fileList.length > 0 && (
          <div className="w-[95%] h-[60%] overflow-y-auto hide-scrollbar m-4 flex flex-col">
            {/* scrollable list */}
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
              {/* upload button */}
            <div className="absolute bottom-10 right-8">
              <BtnStyle1
                 
                label={"Upload"}
                onClick={() => {}}
              />
            </div>
            </div>
      
            
          </div>
        )}
        
      </>
      
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
