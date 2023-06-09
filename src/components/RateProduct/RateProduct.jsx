import React from "react";

const RateProduct = ({ className, size = 20 }) => {
  return (
    <div  className={`flex gap-5 ${className}`}>
      <div className="flex">  
        <Star type={"fullStar"} size={size} />
        <Star type={"fullStar"} size={size} />
        <Star type={"fullStar"} size={size} />
        <Star type={"halfStar"} size={size} />
        <Star type={"emptyStar"} size={size} />
      </div>
    </div>
  );
};

export default RateProduct;

const Star = ({ type, size }) => {
  if (type === "fullStar") return <FullStar size={size} />;
  if (type === "halfStar") return <HalfStar size={size} />;
  if (type === "emptyStar") return <EmptyStar size={size} />;
};

const FullStar = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
        fill="#FFDA5B"
      />
    </svg>
  );
};

const HalfStar = ({ size }) => {
  return (
    <svg
    width={size}
    height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
        fill="#cccccc"
      />
      <path
        d="M7.1563 7.0125L0.800049 7.9375L5.40005 12.4188L4.31255 18.75L10 15.7625V1.25L7.1563 7.0125Z"
        fill="#FFDA5B"
      />
    </svg>
  );
};

const EmptyStar = ({ size }) => {
  return (
    <svg
    width={size}
    height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 16L4 19L5.13 12.37L1 7.75L7 7L10 1Z"
        fill="#cccccc"
      />
    </svg>
  );
};
