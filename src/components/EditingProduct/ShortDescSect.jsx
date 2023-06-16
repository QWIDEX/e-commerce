import React, { useState, useEffect } from "react";
import RateProduct from "../RateProduct/RateProduct";

const ShortDescSect = ({ product }) => {
    const [label, setLabel] = useState(product.label);
    const [price, setPrice] = useState(product.price);
    const [smallDesc, setSmallDesc] = useState(product.smallDesc);
    const [available, setAvailable] = useState(product.available);
  
    useEffect(() => {
      const textArea = document.getElementById("smallDesc");
      textArea.style.height = `${textArea.scrollHeight + 10}px`;
    }, []);
  
    return (
      <div className="w-full lg-sm:w-1/2">
        <div className=" max-w-md mx-auto">
          <input
            type="text"
            className="text-4xl border border-gray-200 rounded-lg leading-normal text-center lg-sm:text-left"
            value={label}
            id="label"
            name="label"
            onChange={(e) => setLabel(e.target.value)}
          />
          <input
            type="number"
            name="price"
            id="price"
            className="text-2xl leading-normal text-[rgb(159,159,159)] font-medium border border-gray-200 rounded-lg"
            value={price}
            min={0}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <span>$</span>
          <div className="flex gap-5 items-center">
            <RateProduct className="py-2" />
            <div className="h-7 w-0.5 rounded-lg bg-[#9F9F9F]" />
            <div className="text-sm leading-normal text-[#9F9F9F]">
              {product.reviews.length} Customer Reviews
            </div>
          </div>
          <textarea
            name="smallDesc"
            id="smallDesc"
            value={smallDesc}
            className="border h-fit border-gray-200 w-full rounded-lg"
            onChange={(e) => {
              e.target.style.height = `${e.target.scrollHeight + 2}px`;
              setSmallDesc(e.target.value);
            }}
          ></textarea>
          <div className="mt-5">
            <input
              type="number"
              style={{ width: `${("" + available).length + 2}ch` }}
              value={available}
              name="available"
              id="available"
              className="text-[#9F9F9F] border border-gray-200 rounded-lg mb-2 text-base"
              onChange={(e) => setAvailable(parseInt(e.target.value))}
            />
            <span className="text-[#9F9F9F] mb-2 text-base">available</span>
          </div>
        </div>
      </div>
    );
  };

  export default ShortDescSect