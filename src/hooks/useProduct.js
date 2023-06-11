import { useEffect, useState } from "react";
import getProduct from "../helpers/getProduct";

const useProduct = (docID) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(docID)
      .then((product) => setProduct(product))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  }, [docID]);

  return { product, loading, error };
};

export default useProduct;
