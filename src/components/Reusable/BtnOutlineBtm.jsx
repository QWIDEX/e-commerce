import React from "react";

const ButtonOutlineBtm = ({ children, onClick }) => {
  return (
    <button onClick={(e) => {onClick(e)}} className="border-b-2 border-black font-medium max-w-max pb-2 text-2xl">
      {children}
    </button>
  );
};

export default ButtonOutlineBtm;
