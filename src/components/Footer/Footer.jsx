import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto pt-24 max-w-[1131px] p-5 relative ">
        <div className="grid lg:grid-cols-3 lg:grid-rows-1 pb-10 gap-5 grid-cols-1 grid-rows-1 ">
          <p className="h-14 text-center lg:text-start w-full lg:pt-[30%] leading-normal font-medium text-base text-[#9F9F9F]">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
          <div className="grid grid-cols-2 grid-rows-1">
            <div className="flex flex-col items-center [&>*]:mt-10 [&>*]:leading-normal  [&>*]:font-medium  [&>*]:text-base ">
              <h6 className="!mt-0 text-[#9F9F9F]">Links</h6>
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contacts">Contact</Link>
            </div>
            <div className="flex flex-col items-center [&>*]:mt-10 [&>*]:leading-normal  [&>*]:font-medium  [&>*]:text-base">
              <h6 className="!mt-0 text-[#9F9F9F]">Help</h6>
              <button>Payment Options</button>
              <button>Returns</button>
              <button>Privacy Policies</button>
            </div>
          </div>
          <div className="flex items-center flex-col lg:items-start">
            <h6>Newsletter</h6>
            <div>
              <input
                placeholder="Enter Your Email Address"
                className="border-b border-black"
                type="email"
              />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <p className="font-normal text-base pt-8 after:border-solid after:border-b after:absolute after:w-[100%] after:left-0 after:bottom-14 after:border-[#D9D9D9]">
          2022 Meubel House. All rights reverved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
