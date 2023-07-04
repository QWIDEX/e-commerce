import React, { useState } from "react";
import { Link } from "react-router-dom";
import separateThousands from "../../utils/separateThousands";

const RowProductCard = (props) => {
  const { label, price, imgUrl, smallDesc } = props.product;
  const icons = props.children;

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="relative">
      <Link
        style={{ display: imageLoaded ? "flex" : "none" }}
        to={`/product/${props.product.id}`}
        className="flex justify-between gap-7 md:flex-row flex-col w-full items-center h-fit border border-gray-200 rounded-lg"
      >
        <img
          src={imgUrl}
          alt="Granite-square-side-table"
          className="max-w-242px w-full rounded-lg m-5 md:w-11/12"
          onLoad={handleImageLoad}
        />
        <p className="w-1/2 lg-sm:block hidden">{smallDesc}</p>
        <div className="md:w-[15%] w-11/12 items-center md:!items-end flex-col flex">
          <p className="font-normal text-end text-base leading-snug mb-3">
            {label}
          </p>
          <h2 className="font-medium text-2xl leading-normal">
            {`${separateThousands(price)}$`}
          </h2>
        </div>
        <div className="w-[5%] h-full"></div>
      </Link>
      <div className="absolute w-[5%] min-w-[30px] h-full justify-center flex-col gap-3 flex items-center bottom-[50%] translate-y-[50%] right-5">
        {icons}
      </div>
    </div>
  );
};

export default RowProductCard;
