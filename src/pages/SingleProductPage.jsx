import React from "react";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import { useParams } from "react-router";
import ProductMainDesc from "../components/ProductMainDesc/ProductMainDesc";

const SingleProduct = () => {
  const { productID } = useParams();
  return (
    <div>
      <MiniHeadingPathSect />
      <ProductMainDesc />
    </div>
  );
};

export default SingleProduct;
