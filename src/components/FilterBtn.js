import { useState } from 'react';
import { IoFilter } from "react-icons/io5";


// fix it to affect the other components later 
const FilterBtn = ({ onClick }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    if (onClick) onClick(newState);
  };

  return (
    <div
      className={`bg-grey-light p-2 rounded-lg transition-all duration-300 cursor-pointer ${
        active ? 'bg-purple-hover' : ''
      }`}
      onClick={handleToggle}
    >
      <IoFilter
        className={` transition-transform duration-300 ${
          active ? 'rotate-180 text-white ' : 'rotate-0 text-purple-dark'
        }`}
        size={20}
      />
    </div>
  );
};

export default FilterBtn;
