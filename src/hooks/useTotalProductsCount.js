import { useSelector } from "react-redux";

const useTotalProductsCount = (queryParams) => {
  const currentProductsDocs = useSelector((state) => {
    let products;
    if (filterArr(Object.values(queryParams)).length !== 0) {
      products = state.optProducts.optProdutsDocs;
    } else {
      products = state.products.productsDocs;
    }
    return products;
  });

  function filterArr(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    });
  }

  return currentProductsDocs?.length;
};

export default useTotalProductsCount;
