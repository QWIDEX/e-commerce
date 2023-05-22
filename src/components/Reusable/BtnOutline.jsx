import React from "react";

const ButtonOutline = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="border-2 rounded-xl px-16 py-4 border-black font-normal max-w-max text-xl">
      {children}
    </button>
  );
};

export default ButtonOutline;
