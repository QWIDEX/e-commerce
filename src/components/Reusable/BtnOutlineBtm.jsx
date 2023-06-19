import React from "react";

const ButtonOutlineBtm = ({ children, type, className, onClick }) => {
  return (
    <button type={type} onClick={(e) => {onClick(e)}} className={`border-b-2 border-black font-medium max-w-max pb-2 text-2xl ${className || ''}`}>
      {children}
    </button>
  );
};

export default ButtonOutlineBtm;
