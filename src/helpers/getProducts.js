import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import getProductsDocs from "./getProductsDocs";

const getProducts = async (count, queryParams, orderProducts) => {
  let fullProductData;

  try {
    const data = await getProductsDocs(count, queryParams, orderProducts);

    fullProductData = await Promise.all(
      data.map(async (product) => {
        const imgUrl = await getDownloadURL(
          ref(storage, `images/products/${product.label}`)
        );
        return { ...product, imgUrl };
      })
    );
  } catch (err) {
    console.error(err);
  }
  return fullProductData;
};

export default getProducts;
