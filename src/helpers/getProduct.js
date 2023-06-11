import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref, listAll,  } from "firebase/storage";

const getProduct = async (docID) => {
  const productRef = doc(db, "products", docID);
  const product = (await getDoc(productRef)).data();

  const mainImg = await getDownloadURL(
    ref(storage, `images/products/${product.label}`)
  );

  const imgsRefsList = (
    await listAll(ref(storage, `images/products/${product.label}/`))
  ).items;

  const imgsList = await Promise.all(
    imgsRefsList.map(
      async (imgRef) => await getDownloadURL(ref(storage, imgRef.fullPath))
    )
  );

  return { ...product, imgsList: [mainImg, ...imgsList] };
};

export default getProduct;
