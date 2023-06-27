import React, { useRef, useState } from "react";
import ProgressDeliveryBar from "../ProgressDeliveryBar/ProgressDeliveryBar";
import { Link } from "react-router-dom";
import separateThousands from "../../utils/separateThousands";

const OrderCard = ({ order }) => {
  const [displayedFullInfo, setDisplayedFullInfo] = useState(false);

  const {
    orderId,
    city,
    country,
    email,
    firstName,
    lastName,
    status,
    paymentMethod,
    phoneNumber,
    street,
    products,
    totalPrice,
    zipCode,
    date,
  } = order;

  const fullInfoRef = useRef();

  const handleShowFullInfo = () => {
    if (displayedFullInfo) {
      fullInfoRef.current.style.height = "0px";
      fullInfoRef.current.style.paddingBottom = "0px";
    } else {
      fullInfoRef.current.style.height = `${
        fullInfoRef.current.scrollHeight + 20
      }px`;
      fullInfoRef.current.style.paddingBottom = "20px";
    }

    setDisplayedFullInfo(!displayedFullInfo);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md">
      <div
        onClick={handleShowFullInfo}
        className="flex px-10 py-5 justify-between items-center"
      >
        <div className="relative">
          <div
            style={
              status === "Pending"
                ? { backgroundColor: "lightgray" }
                : status === "Delivered"
                ? { backgroundColor: "#00e500" }
                : { backgroundColor: "yellow" }
            }
            className="absolute h-[110%] top-1/2 -translate-y-1/2 -left-4 w-2 rounded-full"
          ></div>
          <h1 className="font-medium text-base">Order: {orderId}</h1>
          <p className="text-[#9F9F9F]">Status: {status}</p>
        </div>
        <button>
          {displayedFullInfo ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
            >
              <g transform="rotate(180 512 512)">
                <path
                  fill="currentColor"
                  d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
                />
              </g>
            </svg>
          )}
        </button>
      </div>
      <div
        ref={fullInfoRef}
        className="h-0 px-5 md:px-10 flex-col flex gap-5 overflow-y-hidden transition-all duration-300 w-full"
      >
        {document.documentElement.scrollWidth >= 450 ? (
          <ProgressDeliveryBar status={status} />
        ) : (
          <></>
        )}
        <div className="flex flex-wrap gap-7 justify-between">
          <div>
            <div className="w-fit mb-5">
              <h3 className="font-medium text-lg ">Destination</h3>
              <div>
                <h4 className="w-fit inline-block font-medium">Place:</h4>{" "}
                <span>{`${country}, ${city}, ${street}`}</span>
              </div>
              <div>
                <h4 className="w-fit inline-block font-medium">ZIP Code:</h4>{" "}
                <span>{zipCode}</span>
              </div>
            </div>
            <div className="w-fit mb-5">
              <h3 className="font-medium text-lg ">Receiver</h3>
              <p>{`${lastName} ${firstName}`}</p>
              <div>
                <h4 className="w-fit inline-block font-medium">Email:</h4>{" "}
                <span>{email}</span>
              </div>
              <div>
                <h4 className="w-fit inline-block font-medium">
                  Phone number:
                </h4>{" "}
                <span>{phoneNumber}</span>
              </div>
            </div>
            <div className="w-fit">
              <h3 className="font-medium text-lg ">Other</h3>
              <div>
                <h4 className="w-fit inline-block font-medium">
                  Date of order:
                </h4>{" "}
                <span>{date.toDateString()}</span>
              </div>
              <div>
                <h4 className="w-fit inline-block font-medium">
                  Payment method:
                </h4>{" "}
                <span>{paymentMethod}</span>
              </div>
              <p> </p>
            </div>
          </div>
          <div className="flex w-1/3 min-w-fit flex-col gap-5">
            <h3 className="font-medium text-lg">Ordered Products</h3>
            {products.map((product) => (
              <MyOrdersProductCard key={product.id} product={product} />
            ))}
            <p className="font-medium">
              Total price: {""}
              <span className="text-[#B88E2F]">
                {separateThousands(totalPrice)}$
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

const MyOrdersProductCard = ({ product }) => {
  const { imgUrl, id, label, quantity, price } = product;

  return (
    <Link
      to={`/product/${id}`}
      className="flex flex-col sm-sm-sm:flex-row gap-5 items-center justify-between"
    >
      <img
        src={imgUrl}
        className="aspect-square w-24 p-1 rounded-lg bg-[#fbebb5]"
        alt=""
      />
      <div className=" w-full flex flex-col justify-center">
        <h1 className="text-base">{label}</h1>
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
    </Link>
  );
};
