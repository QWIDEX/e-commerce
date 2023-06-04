import React from "react";
import ButtonOutlineBtm from "../Reusable/BtnOutlineBtm";
import ProductCard from "../Reusable/ProductCard";
import useProducts from "../../hooks/useProducts";

const TopPicksForU = () => {
  const desideHowManyRender = Math.floor(
    document.documentElement.clientWidth / 282
  ) - 1;

  const {products, error, loading} = useProducts(0, desideHowManyRender)

  return (
    <section>
      <div className="px-5 mx-auto my-12 items-center flex flex-col">
        <div className="w-full flex items-center flex-col">
          <h1 className="leading-normal font-medium text-4xl mb-3 text-center">
            Top Picks For You
          </h1>
          <p className="leading-normal text-base font-medium text-gray-400 text-center ">
            Find a bright ideal to suit your taste with our great selection of
            suspension, floor and table lights.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          {products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
        <ButtonOutlineBtm>View More</ButtonOutlineBtm>
      </div>
    </section>
  );
};

export default TopPicksForU;
