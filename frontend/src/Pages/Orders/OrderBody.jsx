import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../../server";

const OrderBody = ({
  id,
  name,
  category,
  image,
  price,
  description,
  order,
  setRefresh,
}) => {
  const [dateShow, setDateShow] = useState();
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const navigate = useNavigate();
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
    setDeliveryStatus(
      new Date(order.order_date).setDate(
        new Date(order.order_date).getDate() + 5
      ) < new Date()
    );
    dateFetch();
  }, [order.order_date]);

  const cancelHandler = async () => {
    try {
      const response = await fetch(URL + "orders/" + order.order_id, {
        method: "DELETE",
      });
      if (response.ok) {
        setRefresh((prev) => !prev);
        alert("Cancelled the product");
      } else {
        alert("Failed in canceling product");
      }
    } catch (err) {
      console.log("Canceling error", err);
    }
  };
  return (
    <>
      <div className="delivery-status">
        {deliveryStatus ? (
          <h5>Delivered on {dateShow}</h5>
        ) : (
          <h5>Delivery is expected on {dateShow}</h5>
        )}{" "}
      </div>
      <div className="single-order">
        <div>
          <img src={image} alt="" style={{ maxWidth: "100%" }} />
        </div>
        <div>
          <p>{name}</p>
          <h5>
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(price)}
          </h5>
        </div>
        <div className="single-order-button">
          <button
            onClick={() =>
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
            }
          >
            View Product
          </button>
          {!deliveryStatus && (
            <button onClick={cancelHandler} id="cancel-button">
              Cancel
            </button>
          )}
          <button>Track Your Package</button>
          <button>More Information</button>
        </div>
      </div>
    </>
  );
};

export default OrderBody;
