import React from 'react';
import { ReactComponent as LogoSVG } from '../assets/images/logoRDLab.svg'; 

const LogoWithSlogan = () => {
  return (
    <div className="w-full max-w-[321px] h-[133px] relative">
      {/* SVG Logo */}
      <div className="absolute top-0 left-0">
        <LogoSVG className="w-[89px] h-[133px]" />
      </div>

      {/* RDLab Title */}
      <p className="absolute left-[95px] top-9 text-[40px] sm:text-[48px] md:text-[64px] font-bold text-center text-purple-dark">
        RDLab
      </p>

      {/* Slogan */}
      <div className="absolute left-[83px] top-[50px] w-[258px] h-[71px]">
        <p className="text-sm sm:text-base font-semibold text-center text-purple-dark">
          Your intelligent assistant for smarter Oil &amp; Gas research.
        </p>
      </div>
    </div>
  );
};

export default LogoWithSlogan;
