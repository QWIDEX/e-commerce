import React from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

const Catalog = ({ productsState, ProductCard }) => {
  const { products, loading, error } = productsState;

  if (error) {
    return (
      <div className="flex min-h-[500px] w-full justify-center items-center max-w-[90%] mx-auto ">
        <ErrorIndicator />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] w-full justify-center items-center max-w-[90%] mx-auto ">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-7 min-h-[500px] gap-y-4 w-fit justify-center max-w-[90%] mx-auto ">
      {products.length === 0 ? (
        <div className=" flex items-center justify-center">
          <h1 className="font-semibold text-xl">Nothing was found</h1>
        </div>
      ) : (
        <></>
      )}
      {products.map((product, idx) => {
        return <ProductCard product={product} idx={idx} key={product.id} />;
      })}
    </div>
  );
};

export default Catalog;
