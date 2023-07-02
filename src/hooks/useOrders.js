import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getOrders from "../helpers/getOrders";
import { where } from "firebase/firestore";

const useOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getOrders([where("userId", "==", user.uid)])
      .then((orders) => {
        setLoading(false);
        setOrders(orders);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { loading, orders, error };
};

export default useOrders;
