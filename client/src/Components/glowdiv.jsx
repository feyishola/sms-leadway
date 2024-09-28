import React from "react";

const GlowDiv = ({ content }) => {
  return (
    <div className="relative z-0 w-56 h-12 rounded-lg text-white bg-gray-900 flex items-center justify-center cursor-pointer overflow-hidden border-none outline-none transition-opacity duration-300 ease-in-out">
      {content}
      <span className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-lg z-[-1]"></span>
      <span className="absolute top-[-2px] left-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] rounded-lg bg-gradient-to-r from-[#ff0000] via-[#ff7300] to-[#ff00c8] opacity-0 blur-[5px] transition-opacity duration-300 ease-in-out hover:opacity-100 animate-glowing"></span>
    </div>
  );
};

export default GlowDiv;
