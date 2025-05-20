import SearchBar from '../components/SearchBar';
import FilterBtn from '../components/FilterBtn';
import ViewToggle from '../components/ToggleView';
import FileTable from '../components/FileTable';
import DropdownMenuButton from '../components/DropDownBtn';
import DropFileInput from '../components/DragDrop';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileGrid from '../components/FileGrid';

const API_URL = "http://localhost:8000";

const fetchDocuments = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/files`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data.documents;
    } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    }
};

const FileManagementScreen = () => {
    const [filesData, setFilesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list');
    const [sortOrder, setSortOrder] = useState('descending');

    const handleViewChange = (newView) => {
        setView(newView);
    };

    useEffect(() => {
        const loadDocuments = async () => {
            setLoading(true);
            const documents = await fetchDocuments();
            setFilesData(documents.map(doc => ({
                fileName: doc.title,
                type: doc.filePath?.split('.').pop() || 'unknown',
                size: 'N/A',
                date: new Date(doc.uploadDate).toLocaleDateString(),
                category: doc.category,
                preview:doc.documentPreview
            })));
            setLoading(false);
        };
        
        loadDocuments();
    }, []);

    const sortFiles = () => {
        const sortedFiles = [...filesData].sort((a, b) => {
            if (sortOrder === 'ascending') {
                return a.fileName.localeCompare(b.fileName);
            } else {
                return b.fileName.localeCompare(a.fileName);
            }
        });

        setFilesData(sortedFiles);
        setSortOrder(sortOrder === 'descending' ? 'ascending' : 'descending');
    };

    return (
        <div className="bg-white h-screen px-2 py-4 flex justify-end flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Left: File list section */}
            <div className="w-full lg:w-2/3 h-full overflow-y-auto hide-scrollbar pr-2">
                <h3 className="font-semibold text-2xl mb-6">Upload Documents</h3>
                
                {/* Controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <SearchBar className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
                        <FilterBtn 
                            onClick={sortFiles}
                            className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" 
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <ViewToggle onViewChange={handleViewChange} />
                    </div>
                </div>
                
                <div className="flex items-center gap-10 mt-8 mb-6">
                    <DropdownMenuButton label='All Documents' />
                    <DropdownMenuButton label='Documents Types' />
                    <DropdownMenuButton label='All Categories'/>
                </div>

                {/* File display */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p>Loading documents...</p>
                        </div>
                    ) : filesData.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <p>No documents found. Upload some files to get started.</p>
                        </div>
                    ) : view === 'list' ? (
                        <FileTable filesData={filesData} />
                    ) : (
                        <FileGrid filesData={filesData} />
                    )}
                </div>
            </div>

            {/* Right: Upload panel */}
            <div className='bg-grey-light h-[98%] w-[23%] rounded-2xl p-4 mt-1 mr-2 flex flex-col items-center'>
                <DropFileInput onFileChange={() => {}} />
            </div>
        </div>
    );
};

export default FileManagementScreen;