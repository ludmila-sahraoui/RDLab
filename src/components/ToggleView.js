import { useState } from 'react';
import { BsListUl } from 'react-icons/bs';
import { CiGrid32 } from 'react-icons/ci';

const ViewToggle = ({ onViewChange }) => {
    const [activeView, setActiveView] = useState('list'); // 'list' or 'grid'

    const handleViewChange = (view) => {
        setActiveView(view);
        onViewChange(view);  // Call the callback function from the parent
    };

    return (
        <div className="flex items-center gap-2 bg-grey-light rounded-xl w-[]">
            <button
                onClick={() => handleViewChange('list')}
                className={`rounded-xl p-2 text-2xl cursor-pointer transition ${
                    activeView === 'list' ? 'bg-purple-dark text-white' : 'text-purple-dark'
                }`}
            >
                <BsListUl />
            </button>
            <button
                onClick={() => handleViewChange('grid')}
                className={`rounded-xl p-2 text-2xl cursor-pointer transition ${
                    activeView === 'grid' ? 'bg-purple-dark text-white' : 'text-purple-dark'
                }`}
            >
                <CiGrid32 />
            </button>
        </div>
    );
};

export default ViewToggle;
