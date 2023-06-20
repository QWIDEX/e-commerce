import React from "react";

const BtnRoundedOutline = ({
  type = "button",
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-9 hover:text-white leading-normal hover:bg-black transition-all duration-300 py-2 rounded-full text-xs border border-black ${className}`}
    >
      {children}
    </button>
  );
};

export default BtnRoundedOutline;
