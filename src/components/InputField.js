import React from 'react';

const InputField = ({ label, hint, type = 'text', value, onChange }) => {
  return (
    <div className="w-full max-w-md relative h-[77px]">
      <label className="absolute left-4 top-0 text-[15px] text-black">
        {label}
      </label>

      <div className="absolute top-[22px] left-0 w-full">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={hint}
          className="w-full h-[55px] px-4 rounded-[15px] border border-purple-dark text-sm text-black placeholder:text-grey-medium"
        />
      </div>
    </div>
  );
};

export default InputField;
