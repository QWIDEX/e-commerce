import React from "react";
import DetailedDesc from "../components/EditingProduct/DetailedDesc";
import MainDesc from "../components/EditingProduct/MainDesc";
import useProduct from "../hooks/useProduct";
import ErrorIndicator from "../components/ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import { useParams } from "react-router";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";

const EditProductPage = () => {
  const { productID } = useParams();
  const { loading, product, error } = useProduct(productID);
  return (
    <>
      {error ? (
        <ErrorIndicator />
      ) : loading ? (
        <LoadingIndicator className="py-9 h-[100vh]" />
      ) : (
        <div className="py-9">
          <MiniHeadingPathSect label={product.label} />
          <MainDesc product={product} />
          <div className="border my-12 border-[#D9D9D9] w-full"></div>
          <DetailedDesc product={product} />
        </div>
      )}
    </>
  );
};

export default EditProductPage;
