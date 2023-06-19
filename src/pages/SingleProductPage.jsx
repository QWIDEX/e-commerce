import React from "react";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import { useParams } from "react-router";
import ProductMainDesc from "../components/ProductMainDesc/ProductMainDesc";
import ProductDetailedDesc from "../components/ProductDetailedDesc/ProductDetailedDesc";
import TopPicksForU from "../components/topPicksForU/TopPicksForU";
import useProduct from "../hooks/useProduct";
import ErrorIndicator from "../components/ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import { Toaster } from "react-hot-toast";

const SingleProduct = () => {
  const { productID } = useParams();

  const { product, loading, error } = useProduct(productID);

  return (
    <div>
      {error ? (
        <ErrorIndicator />
      ) : loading ? (
        <LoadingIndicator className="py-9 h-[100vh]" />
      ) : (
        <>
          <MiniHeadingPathSect label={product.label} labels={["Shop"]} paths={["shop"]} />
          <ProductMainDesc product={product} />
          <div className="border my-12 border-[#D9D9D9] w-full"></div>
          <ProductDetailedDesc product={product} />
        </>
      )}
      <TopPicksForU />
    </div>
  );
};

export default SingleProduct;
