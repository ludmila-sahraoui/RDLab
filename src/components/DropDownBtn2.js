import React from 'react';

const Dropdown2 = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown2;
