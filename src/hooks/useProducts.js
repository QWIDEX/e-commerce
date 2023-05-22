import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../helpers/getProducts";
import { setOptProducts, setProducts } from "../store/slices/productsSlice";
import { orderBy, where } from "firebase/firestore";

let prevOptDeps = [];

const useProducts = (
  from,
  to,
  deps = [],
  orderProducts = orderBy("ordered"),
  queryParams = {}
) => {
  function filterArr(arr) {
    if (!Array.isArray(arr)) return []
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    })
  }

  const storeProducts = useSelector((state) => {
    let products;
    if (
      filterArr(Object.values(queryParams)).length !== 0 ||
      JSON.stringify(orderProducts) !==
        '{"_field":{"segments":["ordered"],"offset":0,"len":1},"_direction":"asc","type":"orderBy"}'
    ) {
      products = state.products.optProduts;
    } else {
      products = state.products.products;
    }
    return products;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      filterArr(Object.values(queryParams)).length !== 0 ||
      JSON.stringify(orderProducts) !==
        '{"_field":{"segments":["ordered"],"offset":0,"len":1},"_direction":"asc","type":"orderBy"}'
    ) {
      if (
        JSON.stringify(prevOptDeps) !== JSON.stringify(deps) ||
        to > storeProducts.length
      ) {
        const typeFiltersArr = filterArr(queryParams.typeFilters)
        const typeFilters = typeFiltersArr.length === 0 ? undefined : where("type", "in", typeFiltersArr)

        dispatch((dispatch) =>
          getProducts(to, [typeFilters], orderProducts).then((products) => {
            dispatch(setOptProducts(products));
          })
        );
      }
      prevOptDeps = deps;
    } else if (to > storeProducts.length) {
      dispatch((dispatch) =>
        getProducts(to, [], orderProducts).then((products) =>
          dispatch(setProducts(products))
        )
      );
    }
  }, [...deps, to]);

  return storeProducts.slice(from, to);
};

export default useProducts;
