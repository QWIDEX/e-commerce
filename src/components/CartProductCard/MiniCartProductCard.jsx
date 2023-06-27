import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";
import separateThousands from "../../utils/separateThousands";

const MiniCartProductCard = ({ product, toggleMiniCart }) => {
  const { imgUrl, id, label, quantity, price } = product;

  const dispatch = useDispatch();

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => toggleMiniCart()}
      className="flex justify-between items-center"
    >
      <img
        src={imgUrl}
        className="aspect-square w-24 p-1 rounded-lg bg-[#fbebb5]"
        alt=""
      />
      <div className=" w-1/2 flex flex-col justify-center">
        <h1 className="text-base text-start">{label}</h1>
        <div className="items-center gap-4 w-full flex">
          {quantity}
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
      </div>
      <button type="button" onClick={() => dispatch(deleteFromCart(product))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5" />
            <circle cx="8" cy="8" r="6.25" />
          </g>
        </svg>
      </button>
    </Link>
  );
};

export default MiniCartProductCard;
