import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useProduct = (docID) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productRef = doc(db, "products", docID);
    getDoc(productRef)
      .then((product) =>
        product.exists
          ? setProduct(product.data())
          : setError("Product doesn't exist")
      )
      .catch((err) => setError(err))
      .finally(setLoading(false));

  }, [docID]);

  return { product, loading, error };
};

export default useProduct;
