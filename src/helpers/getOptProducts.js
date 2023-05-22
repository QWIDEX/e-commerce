import { orderBy, where } from "firebase/firestore";
import getProducts from "./getProducts";
import { setOptProducts } from "../store/slices/productsSlice";

const getOptProducts = (dispatch, queryParams, orderProducts, to) => {
  function convertSortMethod(sortMethod) {
    if (sortMethod === "priceUp") {
      return orderBy("price", "asc");
    } else if (sortMethod === "priceDown") {
      return orderBy("price", "desc");
    } else if (sortMethod) {
      return orderBy(sortMethod);
    }
  }

  function filterArr(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    });
  }

  const typeFiltersArr = filterArr(queryParams.typeFilters);
  const typeFilters =
    typeFiltersArr.length === 0
      ? undefined
      : where("type", "in", typeFiltersArr);

  const priceFrom = where("price", ">=", queryParams.priceFrom || 0);
  const priceTo = where("price", "<=", queryParams.priceTo || 300000);

  dispatch((dispatch) =>
    getProducts(
      to,
      filterArr([typeFilters, priceFrom, priceTo]),
      orderBy("price")
    ).then((products) => {
      dispatch(setOptProducts(products));
    })
  );
};

export default getOptProducts;
