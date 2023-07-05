import React from "react";
import OrderCard from "./OrderCard";
import useOrders from "../../hooks/useOrders";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const OrdersSect = () => {
  const { loading, orders, error } = useOrders();

  return (
    <>
      <h1 className="text-3xl mb-5 font-semibold leading-normal text-center">
        My orders
      </h1>
      <div className="flex gap-5 flex-col">
        {error ? (
          <ErrorIndicator />
        ) : loading ? (
          <LoadingIndicator className="min-h-[100%]" />
        ) : (
          <>
            {orders?.length === 0 ? (
              <div className="flex justify-center items-center">
                <h1 className="text-xl font-semibold">
                  Seems like you haven't ordered anything yet
                </h1>
              </div>
            ) : (
              <></>
            )}
            {orders?.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default OrdersSect;
