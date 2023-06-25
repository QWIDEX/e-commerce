import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        getProductsDocs([], orderBy("ordered", 'desc'))
          .then((productsDocs) => {
            dispatch(setProductsDocs(productsDocs));
          })
          .catch((error) => {
            setError(error);
          });
      });
    } else {
      const debounceTimer = setTimeout(() => {
        if (
          filterArr(Object.values(queryParams)).length !== 0 ||
          orderProducts !== "ordered"
        ) {
          if (
            JSON.stringify(prevOptDeps) !== JSON.stringify(deps) ||
            to > storeProducts.length
          ) {
            setLoading(true);
            const optProdutsDocs = filterProductsDocs(
              productsDocs,
              queryParams,
              orderProducts
            );
            dispatch(setOptProductsDocs(optProdutsDocs));
            dispatch((dispatch) => {
              getProducts(optProdutsDocs.slice(0, to))
                .then((products) => {
                  setLoading(false);
                  dispatch(setOptProducts(products));
                })
                .catch((error) => {
                  setError(error);
                  setLoading(false);
                });
            });
          }
          setLoading(false)
          prevOptDeps = deps;
        } else if (storeProducts.length < to) {
          setLoading(true);
          dispatch((dispatch) => {
            getProducts(productsDocs.slice(0, to))
              .then((products) => {
                setLoading(false);

                dispatch(setProducts(products));
              })
              .catch((error) => {
                setError(error);
                setLoading(false);
              });
          });
        } else setLoading(false);
      }, 400);

      return () => {
        clearTimeout(debounceTimer);
      };
    }
  }, [...deps, to, productsDocs]);

  return { products: storeProducts.slice(from, to), error, loading };
};

export default useProducts;
