import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { getDocs, collection, limit, query, where } from "firebase/firestore";

const getProducts = async (count, queryParams, orderProducts) => {

  const productsCollectionRef = collection(db, "products");
  let fullProductData;

  const filteredParams = queryParams.filter((arg) => {
    if (Array.isArray(arg)) {
      return arg.length !== 0;
    }
    return arg !== undefined && arg !== null && arg !== "";
  })

  try {
    const data = await getDocs(
      query(productsCollectionRef, ...filteredParams, orderProducts, limit(count))
    );
    const filteredData = data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    fullProductData = await Promise.all(
      filteredData.map(async (product) => {
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
