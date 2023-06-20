import React from "react";

const ClasicInput = ({ label, value, onChange, name, type = "text" }) => {
  return (
    <label className="flex w-full flex-col gap-5 max-w-sm">
      <h3 className="font-medium text-[20px] leading-normal">{label}</h3>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        name={name}
        className="border border-black border-solid text-base w-full py-3 px-4 rounded-lg"
      />
    </label>
  );
};

export default ClasicInput;
