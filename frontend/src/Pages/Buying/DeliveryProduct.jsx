import React, { useEffect, useState } from "react";

const DeliveryProduct = ({ id, name, category, image, price, description }) => {
  const [dateShow, setDateShow] = useState();

  useEffect(() => {
    const dateFetch = () => {
      const dateObject = new Date();
      dateObject.setDate(dateObject.getDate());
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      setDateShow(formattedDate);
    };
    dateFetch();
  });
  return (
    <div className="delivery-product">
        <h6>Expected date : <strong style={{color:'red'}}>{dateShow}</strong></h6>
      <img src={image} alt="" />
      <h6>{name}</h6>
      <p>
        <em>{category}</em>
      </p>
      <table className="delivery-table">
        <td>Item : </td>
        <td>
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(price)}
        </td>
        <tr />
        <td>Delivery : </td>
        <td>
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(40.0)}
        </td>
        <tr />
        <td>Total : </td>
        <td>
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(Number(price) + 40.0)}
        </td>
        <tr />
        <td>Offer : </td>
        <td>
          -
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(40.0)}
        </td>
      </table>
      <div className="delivery-product-total">
        <div>
          <h6>Total : </h6>
          <h2 style={{ color: "red", marginLeft: "10px" }}>
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(price)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProduct;
