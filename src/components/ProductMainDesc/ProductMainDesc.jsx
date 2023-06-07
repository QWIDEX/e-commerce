import React from "react";
import ProductImgsSect from "./ProductImgsSect";
import ProductDesc from "./ProductDesc";

const ProductMainDesc = ({ product }) => {
  return (
    <div className="sm-sm:px-6 sm:px-12 px-4 md:px-16 flex gap-4 md:gap-8 lg:gap-20 justify-between">
      <ProductImgsSect />
      <ProductDesc />
    </div>
  );
};

export default ProductMainDesc;
