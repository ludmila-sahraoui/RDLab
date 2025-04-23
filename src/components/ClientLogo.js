import React from 'react';
import kabaLogo from '../assets/images/logoKabas.svg';

const ClientLogo = () => {
  return (
    <div className="w-[94px] h-10 relative">
      <div className="flex justify-center items-center w-10 h-10 absolute left-0 top-0 px-[9px] py-[5px] rounded-[71px] bg-grey-medium">
        <img
          src={kabaLogo}
          alt="KABAS Logo"
          className="flex-grow-0 flex-shrink-0"
        />
      </div>
      <p className="absolute left-[47px] top-3 text-sm text-center text-[#a2a5ab]/[0.33]">
        KABAS
      </p>
    </div>
  );
};

export default ClientLogo;
