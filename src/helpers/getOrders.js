import getProduct from "./getProduct";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const getOrders = async (params) => {
  const ordersCollRef = collection(db, "/orders");
  const ordersRef = params
    ? query(ordersCollRef, ...params)
    : ordersCollRef;

  const orders = (await getDocs(ordersRef)).docs.map((doc) => {
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
