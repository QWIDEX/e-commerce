import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getProduct from "../helpers/getProduct";

const useFavorites = (deps = []) => {
  const user = useSelector((state) => state.user.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all(
      user.favorites?.map(async (productId) => await getProduct(productId))
    )
      .then((product) => {
        setProducts(product);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [...deps, user]);

  return { products, loading, error };
};

export default useFavorites;
