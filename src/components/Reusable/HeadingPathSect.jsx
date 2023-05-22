import React from "react";
import { useHref } from "react-router";
import { Link } from "react-router-dom";

const HeadingPathSect = () => {
  const path = useHref();

  const displayPath =
    path
      .match(/(?<=\/)[^\/]*(?=\/|$)/)
      .toString()
      .slice(0, 1)
      .toUpperCase() +
    path
      .match(/(?<=\/)[^\/]*(?=\/|$)/)
      .toString()
      .slice(1)
      .replace(",", "");
  return (
    <>
      <div className="pt-24"></div>
      <section className="w-full justify-center items-center bg-no-repeat bg-cover bg-center backdrop-blur-md flex relative pb-12">
        <img
          src={require("../../images/path/background.png")}
          className="w-full select-none min-h-[180px]"
          alt="background"
        />
        <div className="flex flex-col px-5 items-center absolute left-[50%] pb-6 -translate-x-[50%]">
          <img
            src={require("../../images/path/Meubel_House_Logos-05.png")}
            className="w-[77px] h-[77px] "
            alt="Meubel_House_Logos-05.png"
          />
          <h2 className="font-medium text-5xl leading-normal">{displayPath}</h2>
          <div className="flex [&>*]:mr-2 items-center mt-1 h-7">
            <Link to="/" className="text-base font-medium leading-normal">
              Home
            </Link>
            <span>
              <svg
                width="20"
                height="20"
                className="mt-0.5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
              </svg>
            </span>
            <Link className="!mr-0" to={path}>
              {displayPath}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeadingPathSect;
