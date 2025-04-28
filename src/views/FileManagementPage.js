import SearchBar from '../components/SearchBar';
import FilterBtn from '../components/FilterBtn';
import ViewToggle from '../components/ToggleView';
import FileTable from '../components/FileTable';
import DropdownMenuButton from '../components/DropDownBtn';
import DropFileInput from '../components/DragDrop';
import React, { useState } from 'react';
import FileGrid from '../components/FileGrid';


const z = ()=>{
    console.log("hi")
}
const FileManagementScreen = () => {
    // add the filter functions later fix the upload problem later
    const [view, setView] = useState('list');  // 'list' or 'grid'
    const [sortOrder, setSortOrder] = useState('descending');
    

    const handleViewChange = (newView) => {
        setView(newView);
    };

    // dummy data for
    // Initial state for files
    const [filesData, setFilesData] = useState(
       [{
        fileName: 'DrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'pdf',
        size: '30MB',
        date: '12/12/2025',
        category: 'Engineering',
    }, 
    {
        fileName: 'MrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'csv',
        size: '30MB',
        date: '12/12/2025',
        category: 'Intern',
    }, 
    {
        fileName: 'MrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'json',
        size: '30MB',
        date: '12/12/2025',
        category: 'Engineering',
    }, 
    {
        fileName: 'MrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'xml',
        size: '30MB',
        date: '12/12/2025',
        category: 'Researcher',
    }, 
    {
        fileName: 'MrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'txt',
        size: '30MB',
        date: '12/12/2025',
        category: 'Intern',
    }, 
    {
        fileName: 'ZrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'pdf',
        size: '30MB',
        date: '12/12/2025',
        category: 'Researcher',
    }, 
    {
        fileName: 'XrillingFluidsReferenceManual_ddbchhhhhhhhhhhhhhhhhhhhhhhh.pdf',
        type: 'doc',
        size: '30MB',
        date: '12/12/2025',
        category: 'Engineering',
    }
]
    );

    const sortFiles = () => {
        const sortedFiles = [...filesData].sort((a, b) => {
            if (sortOrder === 'ascending') {
                return a.fileName.localeCompare(b.fileName);
            } else {
                return b.fileName.localeCompare(a.fileName);
            }
        });

        // Update the filesData state with the sorted files
        setFilesData(sortedFiles);

        // Toggle the sortOrder to alternate between ascending and descending
        setSortOrder(sortOrder === 'descending' ? 'ascending' : 'descending');
    };

    return (
        <div className="bg-white h-screen px-2 py-4 flex justify-end flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Left: File list section */}
            <div className="w-full lg:w-2/3 h-full overflow-y-auto  hide-scrollbar pr-2">
                <h3 className="font-semibold text-2xl mb-6">Upload Documents</h3>
                
                {/* Controls: Search, Filter, View Toggle, Dropdowns */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6  gap-4">
                    {/* Left side controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <SearchBar className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
                        <FilterBtn 
                        onClick={sortFiles}
                        className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
                    </div>

                    {/* Right side view toggle and dropdowns */}
                    <div className="flex items-center gap-2">
                    <ViewToggle onViewChange={handleViewChange} />
                        </div>
                   
                </div>
                <div className="flex items-center gap-10 mt-8 mb-6">
                        <DropdownMenuButton label='All Documents' />
                        <DropdownMenuButton label='Documents Types' />
                        <DropdownMenuButton  label='All Categories'/>
                    </div>

                {/* File table */}
                <div className="overflow-x-auto ">
                {view === 'list' ? (
                    <FileTable filesData={filesData} />
                ) : (
                    <FileGrid filesData={filesData} />
                )}
            </div>
            </div>

            {/* Right: Upload panel */}
           
            <div className='bg-grey-light h-[98%] w-[25%] rounded-2xl p-4 mt-1 mr-2 flex flex-col items-center'>
               <DropFileInput onFileChange={z} />
               </div>
            
        </div>
    );
};

export default FileManagementScreen;
