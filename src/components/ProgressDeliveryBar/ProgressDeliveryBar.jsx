import React, { useEffect, useRef, useState } from "react";

const ProgressDeliveryBar = ({ status }) => {
  const wrapperRef = useRef();
  const [filledWidth, setFilledWidth] = useState();

  useEffect(() => {
    const fullLength = wrapperRef.current.offsetWidth;

    switch (status) {
      case "Pending":
        setFilledWidth(20);
        break;

      case "Packing":
        setFilledWidth((fullLength * 32) / 100 + 20);
        break;

      case "Delivering":
        setFilledWidth((fullLength * 64) / 100 + 20);
        break;

      case "Delivered":
        setFilledWidth(fullLength);
        break;

      default:
        setFilledWidth(20);
    }
  }, [status]);

  return (
    <div ref={wrapperRef} className="relative w-full p-1">
      <div className="w-full h-1 bg-gray-300 rounded-lg">
        <div
          style={{ width: `${filledWidth}px` }}
          className="h-full transition-all duration-300 rounded-full w-5 bg-green-500"
        ></div>
      </div>
      <div className="flex absolute w-full top-0 left-0">
        <div
          style={
            status === "Pending" ||
            status === "Packing" ||
            status === "Delivering" ||
            status === "Delivered"
              ? { backgroundColor: "#22c55e" }
              : { backgroundColor: "#d1d5db" }
          }
          className="h-3 transition-all duration-300 ml-5 mr-auto w-3 rounded-full"
        ></div>
        <div
          style={
            status === "Packing" ||
            status === "Delivering" ||
            status === "Delivered"
              ? { backgroundColor: "#22c55e" }
              : { backgroundColor: "#d1d5db" }
          }
          className="h-3 transition-all duration-300 mx-auto w-3 rounded-full "
        ></div>
        <div
          style={
            status === "Delivering" || status === "Delivered"
              ? { backgroundColor: "#22c55e" }
              : { backgroundColor: "#d1d5db" }
          }
          className="h-3 transition-all duration-300 mx-auto w-3 rounded-full "
        ></div>
        <div
          style={
            status === "Delivered"
              ? { backgroundColor: "#22c55e" }
              : { backgroundColor: "#d1d5db" }
          }
          className="h-3 transition-all duration-300 mr-5 ml-auto w-3 rounded-full "
        ></div>
      </div>
      <div className="flex w-full mt-5 ">
        <h2
          style={status === "Pending" ? { color: "#22c55e" } : {}}
          className="mr-auto font-medium text-[#9F9F9F]"
        >
          Pending
        </h2>
        <h2
          style={status === "Packing" ? { color: "#22c55e" } : {}}
          className="pl-5 mx-auto font-medium text-[#9F9F9F]"
        >
          Packing
        </h2>
        <h2
          style={status === "Delivering" ? { color: "#22c55e" } : {}}
          className="pl-5 mx-auto font-medium text-[#9F9F9F]"
        >
          Delivering
        </h2>
        <h2
          style={status === "Delivered" ? { color: "#22c55e" } : {}}
          className="ml-auto font-medium text-[#9F9F9F]"
        >
          Delivered
        </h2>
      </div>
    </div>
  );
};

export default ProgressDeliveryBar;
