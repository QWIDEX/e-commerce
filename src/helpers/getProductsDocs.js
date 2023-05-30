import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";

const getProductsDocs = async (queryParams, orderProducts) => {
  const productsCollectionRef = collection(db, "products");

  const filteredParams = queryParams.filter((arg) => {
    if (Array.isArray(arg)) {
      return arg.length !== 0;
    }
    return arg !== undefined && arg !== null && arg !== "";
  });

  let docs;
  try {
    const data = await getDocs(
      query(
        productsCollectionRef,
        ...filteredParams,
        orderProducts,
      )
    );
    docs = data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (error) {
    console.error(error);
  }

  return docs;
};

export default getProductsDocs;
