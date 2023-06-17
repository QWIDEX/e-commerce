import React from "react";
import ButtonOutlineBtm from "../Reusable/BtnOutlineBtm";
import ProductCard from "../Reusable/ProductCard";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import ShopProductCard from "../ShopProductCard/ShopProductCard";

const TopPicksForU = () => {
  const desideHowManyRender = Math.floor(
    document.documentElement.clientWidth / 282
  ) - 1;

  const {products, error, loading} = useProducts(0, desideHowManyRender > 3 ? desideHowManyRender : 3)

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
        <div className="flex flex-wrap min-h-[370px] mb-5 justify-center">
          { error ? <ErrorIndicator /> : (loading ? <LoadingIndicator /> : products.map((product) => {
            return <ShopProductCard product={product} key={product.id} />;
          }))}
        </div>
        <Link to={"/shop"}><ButtonOutlineBtm>View More</ButtonOutlineBtm></Link>
      </div>
    </section>
  );
};

export default TopPicksForU;
