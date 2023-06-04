import React from "react";
import ProductCard from "../Reusable/ProductCard";
import { addToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

const Catalog = ({ productsState }) => {
  const { products, loading, error } = productsState;

  const dispatch = useDispatch();
  console.log(products, loading)
  if (loading) {
    return (
      <div className="flex min-h-[500px] w-full justify-center items-center max-w-[90%] mx-auto ">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[500px] w-full justify-center items-center max-w-[90%] mx-auto ">
        <ErrorIndicator />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-7 min-h-[500px] gap-y-4 w-fit justify-center max-w-[90%] mx-auto ">
      {products.map((product) => {
        return (
          <ProductCard product={product} key={product.id}>
            <div className="flex flex-col w-[10%] justify-center">
              <button
                type="button"
                className="group"
                onClick={() => dispatch(addToCart(product))}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="group-hover:fill-slate-400 transition-colors duration-300"
                    d="M12.8333 10.5V6.99999H9.33329V4.66666H12.8333V1.16666H15.1666V4.66666H18.6666V6.99999H15.1666V10.5H12.8333ZM8.16663 25.6667C7.52496 25.6667 6.97546 25.438 6.51813 24.9807C6.06079 24.5233 5.83251 23.9742 5.83329 23.3333C5.83329 22.6917 6.06196 22.1422 6.51929 21.6848C6.97663 21.2275 7.52574 20.9992 8.16663 21C8.80829 21 9.35779 21.2287 9.81513 21.686C10.2725 22.1433 10.5007 22.6924 10.5 23.3333C10.5 23.975 10.2713 24.5245 9.81396 24.9818C9.35663 25.4392 8.80751 25.6674 8.16663 25.6667ZM19.8333 25.6667C19.1916 25.6667 18.6421 25.438 18.1848 24.9807C17.7275 24.5233 17.4992 23.9742 17.5 23.3333C17.5 22.6917 17.7286 22.1422 18.186 21.6848C18.6433 21.2275 19.1924 20.9992 19.8333 21C20.475 21 21.0245 21.2287 21.4818 21.686C21.9391 22.1433 22.1674 22.6924 22.1666 23.3333C22.1666 23.975 21.938 24.5245 21.4806 24.9818C21.0233 25.4392 20.4742 25.6674 19.8333 25.6667ZM8.16663 19.8333C7.29163 19.8333 6.62079 19.4491 6.15413 18.6807C5.68746 17.9122 5.67774 17.1492 6.12496 16.3917L7.69996 13.5333L3.49996 4.66666H1.16663V2.33332H4.98746L9.94579 12.8333H18.1416L22.6625 4.66666L24.7041 5.77499L20.1833 13.9417C19.9694 14.3305 19.6875 14.6319 19.3375 14.8458C18.9875 15.0597 18.5888 15.1667 18.1416 15.1667H9.44996L8.16663 17.5H22.1666V19.8333H8.16663Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </ProductCard>
        );
      })}
    </div>
  );
};

export default Catalog;
