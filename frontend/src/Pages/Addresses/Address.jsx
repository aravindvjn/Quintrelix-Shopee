import React, { useContext, useEffect, useState } from "react";
import "./Address.css";
import { authURL } from "../../server";
import { UserContext } from "../Context/context";
import Header from "../../components/Header";
import SingleAddress from "./SingleAddress";
import CartLoginWarning from "../Cart/CartLoginWarning";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddAddress from "./AddAddress";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { user } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const results = await fetch(authURL + "api/user/address/" + user.id);
        const data = await results.json();
        if (data.length > 0) {
          console.log(data);
          setAddresses(data);
        } else {
          console.log("User dont have any addresses saved");
        }
      } catch (err) {
        console.log("Error in fetching address");
      }
    };
    fetchAddresses();
  }, [refresh]);
  return (
    <div>
      <Header />
      <div className="address-parent">
        {user ? (
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <h5>Saved Addresses </h5>
            <div className="address-add-div">
              <AddCircleIcon style={{cursor:'pointer'}} onClick={()=>{
                navigate('/account/addresses/add')
              }}
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                }}
              />

             {isHovered &&  <p className="address-add-hover">Add new address</p>}
            </div>
          </div>
        ) : (
          <CartLoginWarning />
        )}
        {addresses.length > 0 ? (
          addresses.map((address) => {
            return <SingleAddress {...address} setRefresh={setRefresh} />;
          })
        ) : (
          <p>No Saved Addresses are available</p>
        )}
      </div>
    </div>
  );
};

export default Address;
