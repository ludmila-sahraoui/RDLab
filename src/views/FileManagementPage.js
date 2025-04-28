import SearchBar from '../components/SearchBar';
import FilterBtn from '../components/FilterBtn';
//import ViewToggle from '../components/FileManagement/ViewToggle';
import FileTable from '../components/FileTable';
import DropdownMenuButton from '../components/DropDownBtn';
import DropFileInput from '../components/Drag&Drop';

const FileManagementScreen = () => {
    return (
        <div className="bg-white h-screen  px-2 py-4 flex  justify-end flex-col lg:flex-row gap-6">
            {/* Left: File list section */}
            <div className="w-full lg:w-2/3">
                <h3 className="font-semibold text-2xl mb-4">Upload Documents</h3>
                
                {/* Controls: Search, Filter, View Toggle, Dropdowns */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                    {/* Left side controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <SearchBar className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
                        <FilterBtn className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
                    </div>

                    {/* Right side view toggle and dropdowns */}
                    <div className="flex items-center gap-2">
                       {/* <ViewToggle />*/}
                        </div>
                   
                </div>
                <div className="flex items-center gap-2">
                        {/*<ViewToggle />*/}
                        <DropdownMenuButton />
                        <DropdownMenuButton />
                        <DropdownMenuButton />
                    </div>

                {/* File table */}
                <div className="overflow-x-auto">
                    <FileTable />
                </div>
            </div>

            {/* Right: Upload panel */}
           
            <div className=' bg-grey-light h-[98%] w-[25%] rounded-2xl p-4 mt-1 flex flex-col items-center'>
               <DropFileInput/>
               </div>
            
        </div>
    );
};

export default FileManagementScreen;
