import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../store/slices/cartSlice";
import { setToCart } from "../../store/slices/cartSlice";
import separateThousands from "../../utils/separateThousands";

const CartMobileCard = ({ product }) => {
  const { imgUrl, label, quantity, price, available } = product;

  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(quantity);

  useEffect(() => {
    dispatch(setToCart({ product: { ...product, quantity: productQuantity } }));
  }, [productQuantity]);

  const handleProductQuantity = (quantity) => {
    if (quantity <= available && quantity > 0) setProductQuantity(quantity);
    if (quantity > available) setProductQuantity(available);
    if (isNaN(quantity)) setProductQuantity("");
    if (quantity < 0) setProductQuantity(0);
  };

  return (
    <div className="border border-gray-200 rounded-lg sm-sm-sm:!w-3/4 sm-sm-sm:mx-auto p-3 w-full">
      <div className="flex items-center sm-sm:justify-around justify-between gap-5">
        <img
          src={imgUrl}
          className="aspect-square w-24 p-1 rounded-lg bg-[#fbebb5]"
          alt=""
        />
        <h1 className="text-base font-medium">{label}</h1>
        <button
          type="button"
          onClick={() => dispatch(deleteFromCart(product))}
          className="group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M0 0h24v24H0z" />
              <path
                className="group-hover:fill-[#fbebb5] transition-all duration-300"
                fill="currentColor"
                d="M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6h16zm-6-4a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2h4z"
              />
            </g>
          </svg>
        </button>
      </div>
      <div className="sm-sm:flex block justify-between">
        <div className="items-center mt-5 gap-8 w-full justify-center flex">
          <input
            className="text-center border border-gray-300 rounded-lg"
            style={{ width: `${("" + productQuantity).length + 2}ch` }}
            type="number"
            min={1}
            max={available}
            value={productQuantity}
            onChange={(e) => handleProductQuantity(parseInt(e.target.value))}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z"
            />
          </svg>
          <span className="font-medium text-[#B88E2F]">
            {separateThousands(price)}$
          </span>
        </div>
        <div className="items-center mt-5 sm-sm:justify-center justify-around gap-4 w-1/2 mx-auto  flex">
          <h3 className="font-medium text-base">Subtotal</h3>
          <h3 className="font-medium text-[#B88E2F] text-base">
            {separateThousands(productQuantity * price)}$
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CartMobileCard;
