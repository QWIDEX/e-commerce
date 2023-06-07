import React from "react";
import { Link } from "react-router-dom";

const MiniHeadingPathSect = ({ label = "Asgard Sofa" }) => {
  return (
    <div className="pt-[132px] py-9 px-24 flex gap-3">
      <Link to="/" className="text-base font-normal leading-normal text-[#9F9F9F]">
        Home
      </Link>
      <span>
        <svg
          width="20"
          height="20"
          className="mt-[3.5px]"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
        </svg>
      </span>
      <Link className="text-base font-normal leading-normal text-[#9F9F9F]" to="/shop/">
        Shop
      </Link>
      <svg
          width="20"
          height="20"
          className="mt-[3.5px]"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
        </svg>
        <span className="inline-block w-[2px] mx-4 relative top-[-5px] h-9 bg-[#9F9F9F]"></span>
    <span className="font-medium">{label}</span>

    </div>
  );
};

export default MiniHeadingPathSect;
