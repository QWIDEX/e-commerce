import React from "react";
import { useSelector } from "react-redux";
import MiniCartProductCard from "../CartProductCard/MiniCartProductCard";
import BtnRoundedOutline from "../Reusable/BtnRoundedOutline";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import separateThousands from "../../utils/separateThousands";

const MiniCart = ({ closeBtnRef, miniCartRef, toggleMiniCart }) => {
  const productsInCart = useSelector((state) => state.cart.products);

  const navigate = useNavigate();

  let totalPrice = 0;

  productsInCart.map((product) => {
    totalPrice += product.quantity * product.price;
  });

  return (
    <>
      <button
        type="button"
        onClick={toggleMiniCart}
        ref={closeBtnRef}
        className="fixed min-h-full z-40 transition-all hidden opacity-0 duration-300 top-0 left-0 w-full h-[100vh] !bg-[rgba(0,0,0,.3)]"
      ></button>
      <div
        ref={miniCartRef}
        className=" max-h-[730px] w-[417px] -top-[730px] bg-white transition-all duration-300 absolute z-50 right-0 p-7"
      >
        <button
          type="button"
          onClick={toggleMiniCart}
          className="absolute top-8 right-7"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 16 16"
          >
            <g fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10L6.146 8.854a.5.5 0 0 1 0-.708z"
              />
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
            </g>
          </svg>
        </button>
        <h1 className="text-2xl leading-normal font-semibold">Shopping Cart</h1>
        <div className="h-[1px] w-4/5 bg-[#D9D9D9] mt-7 mb-10"></div>
        <div className="flex overflow-y-auto h-[444px] flex-col gap-5">
          {productsInCart.length > 0 ? (
            productsInCart?.map((product) => (
              <MiniCartProductCard key={product.id} toggleMiniCart={toggleMiniCart} product={product} />
            ))
          ) : (
            <div className=" flex flex-col justify-around h-full items-center gap-3 text-center">
              <img src={require('../../images/Empty Cart illustartion.png')} alt="Empty Cart illustartion" />
              <h1 className="font-bold text-2xl">Your Cart is Empty</h1>
              <p className="text-lg font-medium text-[#9E9E9E]">Looks like you haven’t added anything to your cart yet</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-7 w-9/12">
          <h3>Subtotal</h3>
          <p className="text-[#B88E2F] font-semibold">
            {separateThousands(totalPrice)}$
          </p>
        </div>
        <div className="h-[1px] w-full bg-[#D9D9D9] my-2"></div>
        <div className="flex justify-between mt-7 w-9/12">
          <BtnRoundedOutline
            onClick={() => {
              toggleMiniCart();
              navigate("/cart");
            }}
          >
            View Cart
          </BtnRoundedOutline>
          <BtnRoundedOutline
            onClick={() => {
              if (productsInCart.length > 0) {
                toggleMiniCart();
                navigate("/checkout");
              } else toast.error("You have to add something to cart at first")
            }}
          >
            Checkout
          </BtnRoundedOutline>
        </div>
      </div>
    </>
  );
};

export default MiniCart;
