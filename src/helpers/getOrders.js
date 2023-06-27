import getProduct from "./getProduct";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const getOrders = async (user) => {
  const ordersCollRef = collection(db, "/orders");
  const currentUserOrdersRef = query(
    ordersCollRef,
    where("userId", "==", user.uid)
  );

  const orders = (await getDocs(currentUserOrdersRef)).docs.map((doc) => {
    return { ...doc.data(), orderId: doc.id };
  });

  const orderedProducts = await Promise.all(
    orders.map(async (order) => {
      const products = await Promise.all(
        order.products.map(
          async (product) =>
            await getProduct(product.id, {
              price: product.price,
              quantity: product.quantity,
            })
        )
      );

      return { ...order, products, date: new Date(order.date) };
    })
  );

  return orderedProducts;
};

export default getOrders;
