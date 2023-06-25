import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const createOrder = async (orderDetails, user, products) => {
  const ordersCollectionRef = collection(db, "/orders/");

  const productsBasic = products.map((product) => {
    return { id: product.id, price: product.price, quantity: product.quantity };
  });

  await Promise.all(
    products.map((product) => {
      const productRef = doc(db, `/products/${product.id}`);
      updateDoc(productRef, {
        ordered: product.ordered + product.quantity,
        available: product.available - product.quantity,
      });
    })
  );

  await addDoc(ordersCollectionRef, {
    ...orderDetails,
    userId: user.uid,
    products: productsBasic,
    date: new Date().toString(),
    status: "Pending",
  });
};

export default createOrder;
