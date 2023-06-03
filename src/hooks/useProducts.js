import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setProductsDocs } from "../store/slices/productsSlice";
import { orderBy } from "firebase/firestore";
import getProductsDocs from "../helpers/getProductsDocs";
import getProducts from "../helpers/getProducts";
import {
  setOptProducts,
  setOptProductsDocs,
} from "../store/slices/optProductsSlice";
import filterProductsDocs from "../helpers/getOptProductsDocs";

let prevOptDeps = [];

const useProducts = (
  from,
  to,
  deps = [],
  orderProducts = "ordered",
  queryParams = {}
) => {
  const storeProducts = useSelector((state) => {
    let products;
    if (
      filterArr(Object.values(queryParams)).length !== 0 ||
      orderProducts !== "ordered"
    ) {
      products = state.optProducts.products;
    } else {
      products = state.products.products;
    }
    return products;
  });

  let productsDocs = useSelector((state) => state.products.productsDocs);
  const dispatch = useDispatch();

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
    if (productsDocs.length === 0) {
      dispatch((dispatch) => {
        getProductsDocs([], orderBy("ordered")).then((productsDocs) => {
          dispatch(setProductsDocs(productsDocs));
        });
      });
    } else {
      const debounceTimer = setTimeout(() => {
        if (
          filterArr(Object.values(queryParams)).length !== 0 ||
          orderProducts !== "ordered"
        ) {
          console.log(prevOptDeps, deps)
          if (
            JSON.stringify(prevOptDeps) !== JSON.stringify(deps) ||
            to > storeProducts.length
          ) {
            const optProdutsDocs = filterProductsDocs(
              productsDocs,
              queryParams,
              orderProducts
            );
            dispatch(setOptProductsDocs(optProdutsDocs));
            dispatch((dispatch) => {
              getProducts(optProdutsDocs.slice(0, to)).then((products) => {
                console.log(products, to)
                return dispatch(setOptProducts(products))
              }
              );
            });
          }
          prevOptDeps = deps;
        } else if (storeProducts.length < to) {
          dispatch((dispatch) => {
            getProducts(productsDocs.slice(0, to)).then((products) =>
              dispatch(setProducts(products))
            );
          });
        }
      }, 400);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [...deps, to, productsDocs]);

  return storeProducts.slice(from, to);
};

export default useProducts;
