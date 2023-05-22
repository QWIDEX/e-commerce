import React from "react";

const ProductCard = (props) => {
  const { label, price, imgUrl } = props.product;
  const icons = props.children;

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

  return (
    <div className="flex flex-col max-w-287px items-center md:!items-start ">
      <img
        src={imgUrl}
        alt="Granite-square-side-table"
        className="max-w-242px w-full m-5 md:w-11/12"
      />
      <div className="w-[100%] flex ">
        <div className="w-[80%]">
          <p className="font-normal  text-base leading-snug mb-3 text-center md:text-start max-w-74%">
            {label}
          </p>
          <h2 className="font-medium text-2xl leading-normal">
            {`${separateThousands(price)}$`}
          </h2>
        </div>
          {icons}
      </div>
    </div>
  );
};

export default ProductCard;
