import React, { useState } from "react";
import RateProduct from "../RateProduct/RateProduct";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductDesc = ({ product = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { available = 5 } = product;

  const [orderProductCount, setOrderProductCount] = useState(1);

  const dispatch = useDispatch();

  const handleProductCount = (count) => {
    if (count <= available && count > 0) setOrderProductCount(count);
    if (count > available) setOrderProductCount(available);
    if (count < 1) setOrderProductCount(1);
    if (count === "") setOrderProductCount(count);
  };

  return (
    <div className="w-full lg-sm:w-1/2">
      <div className=" max-w-md mx-auto">
        <h1 className="text-4xl leading-normal text-center lg-sm:text-left">
          Asgaard sofa
        </h1>
        <p className="text-2xl leading-normal text-[rgb(159,159,159)] font-medium">
          250,000.00 $
        </p>
        <div className="flex gap-5 items-center">
          <RateProduct className="py-2" />{" "}
          <div className="h-7 w-0.5 rounded-lg bg-[#9F9F9F]" />
          <div className="text-sm leading-normal text-[#9F9F9F]">
            5 Customer Review
          </div>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quos
          odit eius numquam placeat quibusdam mollitia velit repudiandae nam
          magni voluptatibus, quaerat esse fuga? Aliquid non accusantium ex quam
          magni.
        </p>
        <div className="mt-5">
          <h4 className="text-[#9F9F9F] text-base">Size</h4>
          <div className="flex gap-4 mt-3">
            <button
              style={
                !searchParams.get("size") || searchParams.get("size") === "L"
                  ? { backgroundColor: "#FBEBB5" }
                  : {}
              }
              className="h-8 w-8 text-sm bg-[#FAF4F4] rounded-lg"
              onClick={() =>
                setSearchParams(mergeSearchParams(searchParams, { size: "L" }))
              }
            >
              L
            </button>
            <button
              style={
                searchParams.get("size") === "XL"
                  ? { backgroundColor: "#FBEBB5" }
                  : {}
              }
              className="h-8 w-8 text-sm bg-[#FAF4F4] rounded-lg"
              onClick={() =>
                setSearchParams(mergeSearchParams(searchParams, { size: "XL" }))
              }
            >
              XL
            </button>
            <button
              style={
                searchParams.get("size") === "XS"
                  ? { backgroundColor: "#FBEBB5" }
                  : {}
              }
              className="h-8 w-8 text-sm bg-[#FAF4F4] rounded-lg"
              onClick={() =>
                setSearchParams(mergeSearchParams(searchParams, { size: "XS" }))
              }
            >
              XS
            </button>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[#9F9F9F] mb-2 text-base">{available} available</p>
          <div className="flex gap-5">
            <div className="flex py-5 px-3 rounded-xl border-[#9F9F9F] border-solid border w-full max-w-[125px] justify-around">
              <button
                className="relative cursor-pointer text-xl -top-[2px]"
                onClick={() => handleProductCount(orderProductCount - 1)}
              >
                -
              </button>
              <input
                className="text-center"
                style={{ width: `${("" + orderProductCount).length + 2}ch` }}
                type="number"
                min={1}
                max={available}
                value={orderProductCount}
                onChange={(e) => handleProductCount(e.target.value)}
              />
              <button
                className="relative cursor-pointer text-xl -top-[2px]"
                onClick={() => handleProductCount(orderProductCount + 1)}
              >
                +
              </button>
            </div>
            <button
              className="text-xl lg:px-12 px-8 hover:bg-black transition-all duration-300 hover:text-[#ffffff]  py-4 border border-[#000000] rounded-xl cursor-pointer border-solid"
              onClick={() => dispatch(addToCart(product, orderProductCount))}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
