import { orderBy } from "firebase/firestore";
import getProductsDocs from "./getProductsDocs";

const getMaxFieldValue = async (field, queryParams = []) => {
  let product;

  try {
    product = await getProductsDocs(1, queryParams, orderBy(field, "desc"));
  } catch (err) {
    console.error(err);
  }

  return product[0][field];
};

export default getMaxFieldValue;
