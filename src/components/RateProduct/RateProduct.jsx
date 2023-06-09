import React from "react";

const RateProduct = ({ reviews = [] }) => {
  return (
    <div className="flex gap-5 py-2">
      <div className="flex">
        <FullStar />
        <FullStar />
        <FullStar />
        <HalfStar />
        <EmptyStar />
      </div>
      <div className="h-7 w-0.5 relative -top-1 rounded-lg bg-[#9F9F9F]" />
      <div className="text-sm leading-normal text-[#9F9F9F]">
        {reviews.length} Customer Review
      </div>
    </div>
  );
};

export default RateProduct;

const FullStar = () => {
  return (
    <svg
      width="20"
      height="20"
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

const HalfStar = () => {
  return (
    <svg
      width="20"
      height="20"
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

const EmptyStar = () => {
  return (
    <svg
      width="20"
      height="20"
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
