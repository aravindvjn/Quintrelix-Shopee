import React, { useContext, useState } from "react";
import "./BuyFeature.css";
import { UserContext } from "../../Context/context";
import URL from "../../../server";
import { useNavigate } from "react-router-dom";
import LoginPopUp from "../../../components/LoginPopUp";

const BuyFeature = ({
  setPopUP,
  id,
  name,
  category,
  image,
  price,
  description,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  return (
    <>
      <button
        onClick={() => {
          if (!user) {
            setPopUP(true);
          } else {
            navigate("/buy-product", {
              state: {
                id,
                name,
                category,
                image,
                price,
                description,
              },
            });
          }
        }}
      >
        Buy
      </button>
    </>
  );
};

export default BuyFeature;
