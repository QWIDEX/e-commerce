import React, { useEffect, useState } from "react";

const RateProduct = ({
  className,
  size = 20,
  initialRating = 0,
  editing = false,
  currentRating
}) => {
  const [stars, setStars] = useState([]);
  const [rating, setRating] = useState(initialRating);

  const onMouseEnter = (idx) => {
    if (editing) {
      setRating(idx + 1);
    }
  };

  const handleSetRating = (idx) => {
    if (editing) {
      currentRating.current = idx + 1;
      setRating(idx + 1);
    }
  };

  const onMouseLeave = () => {
    if (editing) {
      setRating(currentRating.current);
    }
  };

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  useEffect(() => {
    const localStars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      localStars.push("fullStar");
    }
    if (rating % 1 !== 0) localStars.push("halfStar");
    if (localStars.length < 5) {
      const emptyStars = [];
      for (let i = 0; i < 5 - localStars.length; i++)
        emptyStars.push("emptyStar");
      localStars.push(...emptyStars);
    }
    setStars(localStars);
  }, [rating]);

  return (
    <div className={`flex gap-5 ${className}`}>
      <div className="flex">
        {stars.map((star, idx) => (
          <Star
            editing={editing}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            handleSetRating={handleSetRating}
            type={star}
            key={idx}
            idx={idx}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default RateProduct;

const Star = ({
  type,
  size,
  idx,
  handleSetRating,
  onMouseLeave,
  onMouseEnter,
  editing,
}) => {
  let renderingStar;
  if (type === "fullStar") renderingStar = <FullStar size={size} />;

  if (type === "halfStar") renderingStar = <HalfStar size={size} />;

  if (type === "emptyStar") renderingStar = <EmptyStar size={size} />;
  if (editing) {
    return (
      <button
        onClick={() => handleSetRating(idx)}
        onMouseEnter={() => onMouseEnter(idx)}
        onMouseLeave={onMouseLeave}
      >
        {renderingStar}
      </button>
    );
  } else return renderingStar
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
