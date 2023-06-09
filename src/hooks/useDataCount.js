import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useDataCount = (queryParams) => {
  const [dataCount, setDataCount] = useState();

  const productsDocs = useSelector((state) => {
    let products;
    if (filterArr(Object.values(queryParams)).length !== 0) {
      products = state.optProducts.optProductsDocs;
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

  useEffect(() => {
    setDataCount(productsDocs.length)
  }, [...Object.values(queryParams)])

  return dataCount;
};

export default useDataCount;
