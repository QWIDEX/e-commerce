import React, { useEffect, useState } from "react";
import OrderCard from "../OrdersSect/OrderCard";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../../firebase";
import getOrders from "../../helpers/getOrders";

const AdminOrdersSect = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((orders) => {
        setLoading(false);
        setOrders(orders);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleOrderStatus = (orderId, idx, status) => {
    const orderRef = doc(db, `/orders/${orderId}`);
    updateDoc(orderRef, { status })
      .then(() => {
        const updatedOrders = [...orders]
        updatedOrders[idx] = {...orders[idx], status}
        setOrders(updatedOrders)
        toast.success("Successfully updated");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <>
      <h1 className="text-3xl mb-5 font-semibold leading-normal text-center">
        Orders
      </h1>
      <div className="flex gap-5 flex-col">
        {error ? (
          <ErrorIndicator />
        ) : loading ? (
          <LoadingIndicator className="min-h-[100%]" />
        ) : (
          orders?.map((order, idx) => (
            <OrderCard key={order.orderId} order={order}>
              <h1 className="font-medium text-base">
                Receiver: {order.firstName} {order.lastName}
              </h1>
              <div className="flex items-center gap-2">
                <h1 className="font-medium text-base">Status:</h1>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  onClick={(e) => e.stopPropagation()}
                  value={order.status}
                  onChange={(e) =>
                    handleOrderStatus(order.orderId, idx, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Packing">Packing</option>
                  <option value="Delivering">Delivering</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </OrderCard>
          ))
        )}
      </div>
    </>
  );
};

export default AdminOrdersSect;
