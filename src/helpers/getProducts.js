import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import getProductsDocs from "./getProductsDocs";

const getProducts = async (productsDocs) => {
  let fullProductsData;

  try {
    fullProductsData = await Promise.all(
      productsDocs.map(async (product) => {
        const imgUrl = await getDownloadURL(
          ref(storage, `images/products/${product.label}`)
        );
        return { ...product, imgUrl };
      })
    );
  } catch (err) {
    console.error(err);
  }
  return fullProductsData;
};

export default getProducts;
