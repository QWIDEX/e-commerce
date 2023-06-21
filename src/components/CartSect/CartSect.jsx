import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProductCard from "../CartProductCard/CartProductCard";
import { Link } from "react-router-dom";
import CartMobileCard from "../CartProductCard/CartMobileCard";
import MiniCartProductCard from "../CartProductCard/MiniCartProductCard";

const CartSect = () => {
  const productsInCart = useSelector((state) => state.cart.products);

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

  let totalPrice = 0;

  productsInCart.map((product) => {
    totalPrice += product.quantity * product.price;
  });

  return (
    <div className="flex flex-col items-center xl:flex-row px-3 sm-md:px-24 gap-7 justify-between">
      <CartProductsBlock productsInCart={productsInCart} />
      <div className="h-96 w-full max-w-[384px] px-10 mt-7 rounded-lg items-center flex bg-[#fff9e5] flex-col justify-around py-4 sm-sm:px-16 xl:w-1/3">
        <h1 className="sm-sm:text-4xl text-3xl leading-normal font-semibold">Cart Totals</h1>
        <div className="w-full flex justify-between items-center">
          <h4 className=" leading-normal text-xl font-medium">Total</h4>
          <h3 className="text-[#B88E2F] text-xl sm-sm:text-2xl font-medium leading-normal">
            {separateThousands(totalPrice)}$
          </h3>
        </div>
        <Link
          to="/checkout"
          className="border-2 rounded-xl hover:bg-black hover:text-white transition-all duration-300 px-14 sm-sm-sm:px-16 py-4 border-black font-normal max-w-max text-xl"
        >
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default CartSect;

const CartProductsBlock = ({ productsInCart }) => {
  const [interfaceType, setInterfaceType] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (
        document.documentElement.offsetWidth < 768 &&
        interfaceType !== "mobile"
      )
        setInterfaceType("mobile");
      else if (interfaceType !== "desctop") setInterfaceType("desctop");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (interfaceType === "desctop")
    return (
      <table className="xl:w-2/3 w-full border-separate  h-fit border-spacing-y-7">
        <thead>
          <tr className="bg-[#fff9e5]">
            <th className="rounded-l-lg w-5/12 py-4">Product</th>
            <th className="text-start py-4">Price</th>
            <th className="text-start py-4">Quantity</th>
            <th className=" text-start py-4">Subtotal</th>
            <th className="rounded-r-lg py-4"></th>
          </tr>
        </thead>
        <tbody>
          {productsInCart.map((product) => (
            <CartProductCard key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    );
  else
    return (
      <div className="flex w-full flex-col gap-7">
        {productsInCart.map((product) => (
          <CartMobileCard key={product.id} product={product} />
        ))}
      </div>
    );
};
