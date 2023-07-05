import React from "react";

const ErrorIndicator = () => {
  return (
    <div className="w-fit mx-auto  pt-[100px] h-[300px] p-5">
      <div className="w-full h-full p-7 rounded-lg bg-[#fff9e5] flex justify-around items-center flex-col">
        <h1 className="font-semibold text-xl leading-normal">
          Something went wrong
        </h1>
        <p className="font-medium text-base">Contact us and try again later</p>
      </div>
    </div>
  );
};

export default ErrorIndicator;
