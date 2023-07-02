import React, { useEffect, useState } from "react";
import OrderCard from "../OrdersSect/OrderCard";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { doc, updateDoc, where } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../../firebase";
import getOrders from "../../helpers/getOrders";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";

const AdminOrdersSect = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const status =
        searchParams.get("status") === "Any"
          ? undefined
          : searchParams.get("status");
      const userId = searchParams.get("userId");

      let paramsArr = [];
      if (status) {
        if (userId)
          paramsArr = [
            where("status", "==", status),
            where("userId", "==", userId),
          ];
        else paramsArr = [where("status", "==", status)];
      } else if (userId) paramsArr = [where("userId", "==", userId)];

      getOrders(paramsArr)
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
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchParams]);

  const handleOrderStatus = (orderId, idx, status) => {
    const orderRef = doc(db, `/orders/${orderId}`);
    updateDoc(orderRef, { status })
      .then(() => {
        const updatedOrders = [...orders];
        updatedOrders[idx] = { ...orders[idx], status };
        setOrders(updatedOrders);
        toast.success("Successfully updated");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <>
      <h1 className="text-3xl mb-5 font-semibold leading-normal text-center">
        Orders
      </h1>
      <div className="flex gap-7 flex-wrap  mb-5">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-base">Status:</h1>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={searchParams.get("status") || "Any"}
            onChange={(e) =>
              setSearchParams(
                mergeSearchParams(searchParams, { status: e.target.value })
              )
            }
          >
            <option value="Any">Any</option>
            <option value="Pending">Pending</option>
            <option value="Packing">Packing</option>
            <option value="Delivering">Delivering</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-base">User Id:</h1>
          <input
            type="text"
            value={searchParams.get("userId") || ""}
            onChange={(e) =>
              setSearchParams(
                mergeSearchParams(searchParams, { userId: e.target.value })
              )
            }
            placeholder="User Id"
            name="userId"
            className={
              "border border-gray-300 border-solid text-base w-[26ch] py-3 px-4 rounded-lg"
            }
          />
        </div>
      </div>
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
