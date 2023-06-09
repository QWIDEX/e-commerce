import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref, listAll } from "firebase/storage";

const getProduct = async (docID, overwriteFields = {}) => {
  const productRef = doc(db, "products", docID);
  const productQueried = await getDoc(productRef);

  const product = { ...productQueried.data(), id: productQueried.id };

  const reviewCollRef = collection(db, `products/${docID}/reviews`);
  const reviewsQueried = (await getDocs(reviewCollRef)).docs;

  const reviews = reviewsQueried.map((review) => {
    return { ...review.data(), reviewId: review.id };
  });

  const mainImg = await getDownloadURL(
    ref(storage, `images/products/${product.label}`)
  );
  
  const imgsRefsList = (
    await listAll(ref(storage, `images/products/${product.label}/`))
  ).items;

  const descImgsRefsList = (
    await listAll(ref(storage, `images/products/${product.label}/desc/`))
  ).items;

  const imgsList = await Promise.all(
    imgsRefsList.map(
      async (imgRef) => await getDownloadURL(ref(storage, imgRef.fullPath))
    )
  );

  const descImgs = await Promise.all(
    descImgsRefsList.map(
      async (imgRef) => await getDownloadURL(ref(storage, imgRef.fullPath))
    )
  );

  return {
    ...product,
    imgsList: [mainImg, ...imgsList],
    descImgs,
    imgUrl: mainImg,
    reviews,
    ...overwriteFields,
  };
};

export default getProduct;
