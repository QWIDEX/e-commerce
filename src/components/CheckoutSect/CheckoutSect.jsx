import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonOutline from "../Reusable/BtnOutline";
import ClasicInput from "../Reusable/ClassicInput";
import ChekoutProductCard from "./ChekoutProductCard";
import createOrder from "../../helpers/createOrder";
import { toast } from "react-hot-toast";
import { setCart } from "../../store/slices/cartSlice";
import { auth } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";
import getUserData from "../../helpers/getUserData";
import updateUser from "../../helpers/updateUser";
import { useNavigate } from "react-router";

const CheckoutSect = () => {
  const user = useSelector((state) => state.user.user);
  const productsInCart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [street, setStreet] = useState(user?.street || "");
  const [zipCode, setZipConde] = useState(user?.zipCode || "");
  const [paymentMethod, setPaymentMethod] = useState("Direct Bank Transfer");

  const productsInCartFiltered = productsInCart.filter((product) =>
    product.quantity > 0 ? true : false
  );

  const totalPrice = productsInCartFiltered.reduce((accumulator, product) => {
    return product.quantity * product.price + accumulator;
  }, 0);

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

  function filterArr(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    });
  }

  const handleCheckout = () => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    else if (
      filterArr([
        paymentMethod,
        zipCode,
        street,
        city,
        country,
        phoneNumber,
        email,
        lastName,
        firstName,
      ]).length < 9
    )
      toast.error("You must fill in all fields before order");
    else {
      createOrder(
        {
          paymentMethod,
          zipCode,
          street,
          city,
          country,
          phoneNumber,
          email,
          lastName,
          firstName,
          totalPrice,
        },
        user,
        productsInCartFiltered
      )
        .then(() => {
          navigate('/profile/orders')
          toast.success("Order placed");
          toast(
            (t) => (
              <div className="flex items-center gap-3">
                <h1 className="font-medium">
                  Shall we save this information for future orders?
                </h1>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    handleSaveInfo();
                  }}
                  className="transition-all text-white duration-300 hover:bg-green-600 rounded-lg bg-green-500 border px-5 py-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="border border-red-500 transition-all duration-300 rounded-lg hover:bg-red-500 px-[19px] py-[7px]"
                >
                  No
                </button>
              </div>
            ),
            { duration: 6000, style: { maxWidth: "550px", minWidth: "318px" } }
          );
          dispatch(setCart([]));
        })
        .catch(() => toast.error("Something went wrong, try again later"));
    }
  };

  const handleSaveInfo = () => {
    updateUser(
      {
        firstName,
        lastName,
        phoneNumber,
        city,
        country,
        street,
        zipCode,
        email,
      },
      user
    )
      .then(() => {
        toast.success("Successfully saved");
        dispatch((dispatch) => {
          getUserData(auth.currentUser).then((user) => {
            dispatch(setUser(user));
          });
        });
      })
      .catch((error) => {
        toast.error("Something went wrong, try again later");
        console.error(error);
      });
  };

  useEffect(() => {});

  return (
    <>
      <h1 className="font-semibold text-center text-4xl ">Billing details</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
        className="flex justify-between xl:flex-row flex-col-reverse gap-6 px-5 sm:px-14 md:px-24"
      >
        <div className="lg:px-20 w-full sm:px-10 px-0 xl:!w-2/3">
          <div className="flex flex-col mt-7 gap-7">
            <div className="flex gap-5 sm-md:items-center mb-5 items-start sm-md:flex-row sm-md:justify-between  flex-col  rounded-lg">
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"First name"}
                onChange={setFirstName}
                value={firstName}
                name={"firstName"}
              />
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"Last name"}
                onChange={setLastName}
                value={lastName}
                name={"lastName"}
              />
            </div>
            <div className="flex gap-5 sm-md:items-center mb-5 items-start sm-md:flex-row sm-md:justify-between  flex-col  rounded-lg">
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 "
                wrapperClassName="!w-full max-w-full"
                label={"Email adress"}
                onChange={setEmail}
                type="email"
                value={email}
                name={"email"}
              />
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"Phone number"}
                onChange={setPhoneNumber}
                type="tel"
                value={phoneNumber}
                name={"phoneNumber"}
              />
            </div>
            <div className="flex gap-5 sm-md:items-center mb-5 items-start sm-md:flex-row sm-md:justify-between  flex-col  rounded-lg">
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"Country"}
                onChange={setCountry}
                value={country}
                name={"country"}
              />
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"City"}
                onChange={setCity}
                value={city}
                name={"city"}
              />
            </div>
            <div className="flex gap-5 sm-md:items-center mb-5 items-start sm-md:flex-row sm-md:justify-between  flex-col  rounded-lg">
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"Street address"}
                onChange={setStreet}
                value={street}
                name={"street"}
              />
              <ClasicInput
                className="py-5 px-8 text-base border-gray-300 max-w-[624px]"
                wrapperClassName="!w-full max-w-full"
                label={"ZIP code"}
                onChange={setZipConde}
                value={zipCode}
                name={"zipCode"}
              />
            </div>
          </div>
        </div>

        <div className="xl:!w-1/3 w-full max-w-[500px] mx-auto mb-5">
          <div className=" grid mt-16 grid-cols-2 h-min gap-5">
            <h1 className="text-2xl font-medium">Product</h1>
            <h1 className="text-2xl font-medium text-end">Subtotal</h1>
            {productsInCartFiltered.map((product) => (
              <ChekoutProductCard key={product.id} product={product} />
            ))}
            <h1 className="text-xl font-medium">Total</h1>
            <h1 className="text-2xl text-[#B88E2F] text-right font-semibold">
              {separateThousands(totalPrice)}$
            </h1>
          </div>
          <div className="h-[1px] my-7 w-full bg-[#D9D9D9]"></div>
          <h1 className="text-xl font-medium mb-2">Choose payment method</h1>
          <div className="flex flex-col gap-2">
            <label className="flex gap-2">
              <input
                type="radio"
                checked={paymentMethod === "Direct Bank Transfer"}
                onChange={() => setPaymentMethod("Direct Bank Transfer")}
                name="paymentMethod"
              />
              <span>Direct Bank Transfer</span>
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                checked={paymentMethod === "Cash On Delivery"}
                onChange={() => setPaymentMethod("Cash On Delivery")}
                name="paymentMethod"
              />
              <span>Cash On Delivery</span>
            </label>
          </div>
          <p className="my-7">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>
          <ButtonOutline type="submit" className="!mx-auto block">
            Place order
          </ButtonOutline>
        </div>
      </form>
    </>
  );
};

export default CheckoutSect;
