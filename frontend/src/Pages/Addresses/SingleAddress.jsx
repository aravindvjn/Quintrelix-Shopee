import React, { useContext, useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { authURL } from "../../server";
import { UserContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

const SingleAddress = ({
  id,
  user_id,
  name,
  address,
  state,
  country,
  postal_code,
  phone_number,
  setRefresh,
  buyPage,
  product,
  setSelectedAddress,
}) => {
  const { user } = useContext(UserContext);
  const input = useRef();
  const navigate = useNavigate();
  const deleteAddresss = async () => {
    try {
     if(confirm("Do You Want to Proceed")){
      const response = await fetch(authURL + "api/user/address/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });
      if (response.ok) {
        setRefresh((prev) => !prev);
        alert("Deleted");
      } else {
        alert("Failed");
      }
     }
    } catch (err) {
      console.log("Error in Deleting an address", err);
    }
  };
  const editAddresss = () => {
    navigate("/account/addresses/add", {
      state:{
        id,
        buyPage:buyPage,
        state:product
      }
    });
  };

  const checkIt = () => {
    if (input.current.checked) {
      setSelectedAddress({
        name: name,
        shipping_address:
          address +
          ", " +
          state +
          ", " +
          country +
          ", Postal Code : " +
          postal_code +
          ", Phone Number : " +
          phone_number,
      });
    }
    setRefresh((prev) => !prev);
  };
  useEffect(() => {
    if (buyPage) {
      checkIt();
    }
  },[]);
  return (
    <div className="single-address">
      <div className="single-address-edit-div">
        <DeleteIcon style={{ cursor: "pointer" }} onClick={deleteAddresss} />
        <EditIcon style={{ cursor: "pointer" }} onClick={editAddresss} />
      </div>
      {buyPage && (
        <div>
          <input style={{transform:'translateY(-20px)'}}
            type="radio"
            name="single-address"
            ref={input}
            onClick={checkIt}
          />
        </div>
      )}
      <p>
        <strong>{name}</strong>
      </p>
      <div className="single-address-address-body">
        <p>
          <em>
            {address} , {state}
          </em>
        </p>
        <p>
          <em>{country}</em>
        </p>
      </div>
      <p>{postal_code}</p>
      <p>Phn No: {phone_number}</p>
    </div>
  );
};

export default SingleAddress;


