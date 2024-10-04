import React, { useEffect, useState } from "react";
import OrderBody from "./OrderBody";

const SingleOrder = ({product,order}) => {
    console.log("the product",product)
    const [dateShow, setDateShow] = useState();
useEffect(()=>{
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
})
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
      </div>
      <OrderBody order={order} {...product[0]} />
    </div>
  );
};

export default SingleOrder;
