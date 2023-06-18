import React from "react";

const ButtonOutline = ({ children, type, onClick = () => {}, className }) => {
  return (
    <button onClick={onClick} type={type} className={`border-2 rounded-xl hover:bg-black hover:text-white transition-all duration-300 px-16 py-4 border-black font-normal max-w-max text-xl ${className || ''}`}>
      {children}
    </button>
  );
};

export default ButtonOutline;
