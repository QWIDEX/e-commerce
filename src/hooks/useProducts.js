import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../helpers/getProducts";
import { setOptProducts, setProducts } from "../store/slices/productsSlice";
import { orderBy, where } from "firebase/firestore";
import getOptProducts from "../helpers/getOptProducts";

let prevOptDeps = [];

const useProducts = (
  from,
  to,
  deps = [],
  orderProducts = "ordered",
  queryParams = {}
) => {
  function filterArr(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    });
  }

  const storeProducts = useSelector((state) => {
    let products;
    if (
      filterArr(Object.values(queryParams)).length !== 0 ||
      orderProducts !== "ordered"
    ) {
      products = state.products.optProduts;
    } else {
      products = state.products.products;
    }
    return products;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (
        filterArr(Object.values(queryParams)).length !== 0 ||
        orderProducts !== "ordered"
      ) {
        if (
          JSON.stringify(prevOptDeps) !== JSON.stringify(deps) ||
          to > storeProducts.length
        ) {
          getOptProducts(dispatch, queryParams, orderBy(orderProducts), to);
        }
        prevOptDeps = deps;
      } else if (to > storeProducts.length) {
        dispatch((dispatch) =>
          getProducts(to, [], [orderBy("ordered")]).then((products) =>
            dispatch(setProducts(products))
          )
        );
      }
    }, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [...deps, to]);

  return storeProducts.slice(from, to);
};

export default useProducts;
