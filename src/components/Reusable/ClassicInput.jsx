import React from "react";

const ClasicInput = ({ label, value, onChange, name, type = "text", className = '', wrapperClassName = '' }) => {
  return (
    <label className={`flex w-full flex-col gap-5 max-w-sm ${wrapperClassName}`}>
      <h3 className="font-medium text-[20px] leading-normal">{label}</h3>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        name={name}
        className={`border border-black border-solid text-base w-full py-3 px-4 rounded-lg ${className} `}
      />
    </label>
  );
};

export default ClasicInput;
