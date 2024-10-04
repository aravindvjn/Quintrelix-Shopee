import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderBody = ({
  id,
  name,
  category,
  image,
  price,
  description,
  order,
}) => {
  const [dateShow, setDateShow] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const dateFetch = () => {
      const dateObject = new Date(order.order_date);
      dateObject.setDate(dateObject.getDate() + 5);
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      setDateShow(formattedDate);
    };
    dateFetch();
  });
  return (
    <>
      <div className="delivery-status">
        <h5>Delivery Expected on </h5>
        <p>{dateShow}</p>
      </div>
      <div className="single-order">
        <div>
          <img src={image} alt="" style={{ maxWidth: "100%" }} />
        </div>
        <div>
          <h5>{name}</h5>
          <div className="single-order-price">
            <h5>
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(price)}
            </h5>
            <button   onClick={() =>
          navigate("/show-product", {
            state: {
              id,
              name,
              category,
              image,
              price,
              description,
            },
          })
        }>View Product</button>
          </div>
        </div>
        <div className="single-order-button">
          <button>Cancel</button>
          <button>Track Your Package</button>
          <button>More Information</button>
        </div>
      </div>
    </>
  );
};

export default OrderBody;
