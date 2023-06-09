import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const getProducts = async (productsDocs) => {
  let fullProductsData;

  fullProductsData = await Promise.all(
    productsDocs.map(async (product) => {
      const imgUrl = await getDownloadURL(
        ref(storage, `images/products/${product.label}`)
      );
      return { ...product, imgUrl };
    })
  );
  
  return fullProductsData;
};

export default getProducts;
