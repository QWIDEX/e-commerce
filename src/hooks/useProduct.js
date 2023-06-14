import { useEffect, useState } from "react";
import getProduct from "../helpers/getProduct";

const useProduct = (docID) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(docID)
      .then((product) => {
        setProduct(product);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [docID]);

  return { product, loading, error };
};

export default useProduct;
