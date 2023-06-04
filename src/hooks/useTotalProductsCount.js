import { useSelector } from "react-redux";

let renderCount = 0
let prevQueryParams = []

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

  if (JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams)) renderCount = 0

  renderCount++
  prevQueryParams = queryParams
  
  if (renderCount > 2 && filterArr(Object.entries(queryParams)).length !== 0) {
    return currentProductsDocs?.length;
  } else if (filterArr(Object.entries(queryParams)).length === 0) {
    return currentProductsDocs?.length
  } else return undefined

};

export default useTotalProductsCount;
