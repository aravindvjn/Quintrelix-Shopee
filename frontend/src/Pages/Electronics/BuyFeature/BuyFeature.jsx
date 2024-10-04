import React, { useContext } from "react";
import "./BuyFeature.css";
import { UserContext } from "../../Context/context";
import URL from "../../../server";

const BuyFeature = ({
  setPopUP,
  id,
  name,
  category,
  image,
  price,
  description,
}) => {
  const { user } = useContext(UserContext);
  const inputAddress = "Nandanam,Kaithackal,Anayadi";
  const paymentMethod = "Credit Card";
  const buyHandler = async () => {
    if (!user) {
      setPopUP(true);
    } else {
      try {
        const response = await fetch(URL + "orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            product_id: id,
            customer_name: user.username,
            total_amount: price,
            shipping_address: inputAddress,
            payment_method: paymentMethod,
          }),
        });
        if(response.ok){
            alert("Added to Cart")
        }else{
            alert("Failed to add to cart")
        }
      } catch (err) {
        console.log("Error in adding order", err);
      }
    }
  };
  return (
    <div>
      <button onClick={buyHandler}>Buy</button>
    </div>
  );
};

export default BuyFeature;
