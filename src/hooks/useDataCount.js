import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase";
import getDataCount from "../helpers/getDataCount";

const useDataCount = (queryArgs) => {
  const [dataCount, setDataCount] = useState();
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    getDataCount(
      Array.isArray(queryArgs)
        ? query(productsCollectionRef, ...queryArgs)
        : query(productsCollectionRef, queryArgs)
    ).then(count => setDataCount(count));
  }, []);

  return dataCount;
};

export default useDataCount;
