import React, { useEffect, useState } from "react";
import OrderBody from "./OrderBody";

const SingleOrder = ({ product, order, setRefresh }) => {
  const [dateShow, setDateShow] = useState();
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
        <div style={{ display: "flex",gap:'5px'}}>
          <p>Delivery Address : </p>
          {(order.customer_name + " " + order.shipping_address).length < 30 ? (
            <em> {order.customer_name + ", " + order.shipping_address}</em>
          ) : (
            <em>
              {(order.customer_name + ", " + order.shipping_address).slice(
                0,
                30
              )}
              <strong>...</strong>
            </em>
          )}
        </div>
      </div>
      <OrderBody order={order} {...product[0]} setRefresh={setRefresh} />
    </div>
  );
};

export default SingleOrder;
