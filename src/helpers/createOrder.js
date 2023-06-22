import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const createOrder = async (orderDetails, user, products) => {
  const ordersCollectionRef = collection(db, "/orders/");

  addDoc(ordersCollectionRef, {...orderDetails, userId: user.uid, products, date: new Date(), status: "Pending" });
};

export default createOrder;
