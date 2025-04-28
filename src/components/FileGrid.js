import React, { useState, useEffect } from 'react';
import DocumentCard from './FileCard';

const FileGrid = ({ filesData, onFileChange }) => {
    const [fileList, setFileList] = useState(filesData || []);

    useEffect(() => {
        setFileList(filesData || []);
    }, [filesData]);

    const fileRemove = (file) => {
        const updatedList = fileList.filter(f => f !== file);
        setFileList(updatedList);
        if (onFileChange) {
            onFileChange(updatedList);
        }
    };

    return (
        <div className="grid grid-cols-5 gap-4 p-2">
            {fileList.map((file, index) => (
                <DocumentCard
                    key={index}
                    title={file.fileName}
                    fileType={file.type}
                    category={file.category}
                    removeFile={() => fileRemove(file)}
                />
            ))}
        </div>
    );
};

export default FileGrid;
