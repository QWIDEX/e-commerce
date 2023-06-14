import React, { useEffect, useState } from "react";
import RateProduct from "../RateProduct/RateProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductDesc = ({ product, editing = false }) => {
  const { available } = product;

  const [orderProductCount, setOrderProductCount] = useState(1);

  const dispatch = useDispatch();

  const handleProductCount = (count) => {
    if (count <= available && count > 0) setOrderProductCount(count);
    if (count > available) setOrderProductCount(available);
    if (count < 1) setOrderProductCount(1);
    if (count === "") setOrderProductCount(count);
  };

  const separateThousands = (number) => {
    const reversedNumber = String(number).split("").reverse();
    let result = "";

    for (let i = 0; i < reversedNumber.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        result += ",";
      }
      result += reversedNumber[i];
    }

    return result.split("").reverse().join("");
  };

  useEffect(() => {
    if (editing) {
      const textArea = document.getElementById("smallDesc");
      textArea.style.height = `${textArea.scrollHeight + 10}px`;
    }
  });

  return (
    <div className="w-full lg-sm:w-1/2">
      <div className=" max-w-md mx-auto">
        <h1 className="text-4xl leading-normal text-center lg-sm:text-left">
          {product.label}
        </h1>

        <p className="text-2xl leading-normal text-[rgb(159,159,159)] font-medium">
          {`${separateThousands(product.price)}$`}
        </p>

        <div className="flex gap-5 items-center">
          <RateProduct className="py-2" />{" "}
          <div className="h-7 w-0.5 rounded-lg bg-[#9F9F9F]" />
          <div className="text-sm leading-normal text-[#9F9F9F]">
            {product.reviews.length} Customer Reviews
          </div>
        </div>
        <p>{product.smallDesc}</p>
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
