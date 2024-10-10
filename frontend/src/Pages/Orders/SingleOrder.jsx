import React, { useEffect, useState } from "react";
import OrderBody from "./OrderBody";

const SingleOrder = ({ product, order, setRefresh }) => {
  const [dateShow, setDateShow] = useState();
  const [passDeliveryStatus, setPassDeliveryStatus] = useState(false);
  useEffect(() => {
    const dateFetch = () => {
      const dateObject = new Date(order.order_date);
      dateObject.setDate(dateObject.getDate());
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      setDateShow(formattedDate);
    };
    dateFetch();
  });
  if (product.length <= 0) {
    return;
  }
  return (
    <div className="single-order-parent">
      <div className="single-colored">
        <div>
          <h6>ORDER PLACED</h6>
          <h6>{dateShow}</h6>
        </div>
        <div>
          <h6>TOTAL</h6>
          <h6>
            {" "}
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product[0].price)}
          </h6>
        </div>
        <div className="order-delivery-address" style={{ display: "flex", gap: "5px" }}>
          {(order.customer_name + " " + order.shipping_address).length < 30 ? (
            <p>
              Delivery Address :{" "}
              <em> {order.customer_name + ", " + order.shipping_address}</em>
            </p>
          ) : (
            <p>
              Delivery Address :{" "}
              <em>
                {(order.customer_name + ", " + order.shipping_address).slice(
                  0,
                  30
                )}
                <strong>...</strong>
              </em>
            </p>
          )}
        </div>
        <div>
          {!passDeliveryStatus && (
            <p>
              Payment Status :{" "}
              <span
                style={{
                  fontWeight: "600",
                  color: `${
                    order.payment_method === "Cash on Delivery"
                      ? "red"
                      : "green"
                  }`,
                }}
              >
                {order.payment_method === "Cash on Delivery"
                  ? " COD"
                  : " Successful"}
              </span>
            </p>
          )}
        </div>
      </div>
      <OrderBody
        order={order}
        {...product[0]}
        setRefresh={setRefresh}
        setPassDeliveryStatus={setPassDeliveryStatus}
      />
    </div>
  );
};

export default SingleOrder;
