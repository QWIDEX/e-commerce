import React, { useEffect, useState } from "react";
import RateProduct from "../RateProduct/RateProduct";
import { useDispatch } from "react-redux";
import { setToCart } from "../../store/slices/cartSlice";
import AddToFavoritesBtn from "../Reusable/AddToFavoritesBtn/AddToFavoritesBtn";
import separateThousands from "../../utils/separateThousands";

const ProductDesc = ({ product, editing = false }) => {
  const { available } = product;

  const [orderProductQuantity, setOrderProductQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleOrderProductQuantity = (quantity) => {
    if (quantity <= available && quantity > 0)
      setOrderProductQuantity(quantity);
    if (quantity > available) setOrderProductQuantity(available);
    if (isNaN(quantity)) setOrderProductQuantity("");
    if (quantity < 0) setOrderProductQuantity(0);
  };

  useEffect(() => {
    if (editing) {
      const textArea = document.getElementById("smallDesc");
      textArea.style.height = `${textArea.scrollHeight + 10}px`;
    }
  });

  const rating =
    product.reviews.reduce(
      (prevValue, currValue) => prevValue.rating * currValue.rating,
      { rating: 1 }
    ) / product.reviews.length;

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
          <RateProduct initialRating={rating || 0} className="py-2" />
          <div className="h-7 w-0.5 rounded-lg bg-[#9F9F9F]" />
          <div className="text-sm leading-normal text-[#9F9F9F]">
            {product.reviews.length} Customer Reviews
          </div>
        </div>
        <p>{product.smallDesc}</p>
        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#9F9F9F] mb-2 text-base">
              {available} available
            </p>
            <AddToFavoritesBtn productId={product.id} className="mr-10 pb-2" />
          </div>
          {available > 0 ? (
            <div className="flex gap-5">
              <div className="flex py-5 px-3 rounded-xl border-[#9F9F9F] border-solid border w-full max-w-[125px] justify-around">
                <button
                  className="relative cursor-pointer text-xl -top-[2px]"
                  onClick={() =>
                    handleOrderProductQuantity(orderProductQuantity - 1)
                  }
                >
                  -
                </button>
                <input
                  className="text-center border border-gray-300 rounded-lg"
                  style={{
                    width: `${("" + orderProductQuantity).length + 2}ch`,
                  }}
                  type="number"
                  min={1}
                  max={available}
                  value={orderProductQuantity}
                  onChange={(e) =>
                    handleOrderProductQuantity(parseInt(e.target.value))
                  }
                />
                <button
                  className="relative cursor-pointer text-xl -top-[2px]"
                  onClick={() =>
                    handleOrderProductQuantity(orderProductQuantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="text-xl lg:px-12 px-8 hover:bg-black transition-all duration-300 hover:text-[#ffffff]  py-4 border border-[#000000] rounded-xl cursor-pointer border-solid"
                onClick={() =>
                  dispatch(
                    setToCart({ product, quantity: orderProductQuantity })
                  )
                }
              >
                Add To Cart
              </button>
            </div>
          ) : (
            <button className="text-xl lg:px-12 px-8 hover:bg-black transition-all duration-300 hover:text-[#ffffff]  py-4 border border-[#000000] rounded-xl cursor-pointer border-solid">
              Notify if present
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
