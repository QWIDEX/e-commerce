import React from "react";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import { useParams } from "react-router";
import ProductMainDesc from "../components/ProductMainDesc/ProductMainDesc";
import ProductDetailedDesc from "../components/ProductDetailedDesc/ProductDetailedDesc";

const SingleProduct = () => {
  const { productID } = useParams();
  return (
    <div>
      <MiniHeadingPathSect />
      <ProductMainDesc />
      <div className="border my-12 border-[#D9D9D9] w-full"></div>
      <ProductDetailedDesc />
    </div>
  );
};

export default SingleProduct;
