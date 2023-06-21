import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, setToCart } from "../../store/slices/cartSlice";

const CartProductCard = ({ product }) => {
  const { imgUrl, id, label, quantity, available, price } = product;

  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(quantity);

  useEffect(() => {
    dispatch(setToCart({ product: { ...product, quantity: productQuantity } }));
  }, [productQuantity]);

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

  const handleProductQuantity = (quantity) => {
    if (quantity <= available && quantity > 0) setProductQuantity(quantity);
    if (quantity > available) setProductQuantity(available);
    if (isNaN(quantity)) setProductQuantity("");
    if (quantity < 0) setProductQuantity(0);
  };

  return (
    <tr>
      <td className="flex gap-9 items-center">
        <img
          src={imgUrl}
          className="bg-[#fbebb5] p-1 h-24 w-24 rounded-lg"
          alt=""
        />
        <h1 className="text-base text-[#9F9F9F]">{label}</h1>
      </td>

      <td>
        <h1 className="text-base font-medium text-[#9F9F9F]">
          {separateThousands(price)}$
        </h1>
      </td>
      <td>
        <input
          className="text-center border border-gray-300 rounded-lg"
          style={{ width: `${("" + productQuantity).length + 2}ch` }}
          type="number"
          min={1}
          max={available}
          value={productQuantity}
          onChange={(e) => handleProductQuantity(parseInt(e.target.value))}
        />
      </td>
      <td className="font-medium">{separateThousands(productQuantity * price)}$</td>
      <td>
        <button type="button" onClick={() => dispatch(deleteFromCart(product))} className="group">
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
      </td>
    </tr>
  );
};

export default CartProductCard;
