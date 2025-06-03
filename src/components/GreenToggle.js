// ToggleSwitch.js
import React from 'react';

const GreenToggle = ({ 
  checked, 
  onClick,
  activeColor = "bg-green-200",
  inactiveColor = "bg-gray-300",
  size = "md"
}) => {
  let toggleClasses = "relative rounded-full transition-colors";
  let thumbClasses = "absolute bg-white rounded-full transition-all";
  
  switch (size) {
    case "sm":
      toggleClasses += " w-8 h-4";
      thumbClasses += " w-3 h-3 top-0.5 left-0.5";
      if (checked) thumbClasses += " translate-x-4";
      break;
    case "lg":
      toggleClasses += " w-14 h-7";
      thumbClasses += " w-6 h-6 top-0.5 left-0.5";
      if (checked) thumbClasses += " translate-x-7";
      break;
    default: 
      toggleClasses += " w-11 h-6";
      thumbClasses += " w-5 h-5 top-0.5 left-0.5";
      if (checked) thumbClasses += " translate-x-5";
  }
  
  toggleClasses += checked ? ` ${activeColor}` : ` ${inactiveColor}`;
  
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={checked}
        onClick={onClick}
      />
      <div className={toggleClasses}>
        <div className={thumbClasses}></div>
      </div>
    </label>
  );
};

export default GreenToggle;