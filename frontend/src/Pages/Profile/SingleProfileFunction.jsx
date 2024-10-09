import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from '@mui/icons-material/Sell';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from "react-router-dom";

const SingleProfileFunction = () => {
  const navigate = useNavigate()
  return (
    <div className="profile-function">
      <div  onClick={()=>navigate('/account/user')}>
        <div>
          <AccountCircleIcon fontSize="large" id="icon" />
        </div>
        <div>Your Profile</div>
      </div>
      <div onClick={()=>navigate('/account/addresses')}>
        <div>
          <LocationOnIcon fontSize="large" id="icon" />
        </div>
        <div>Your Addresses</div>
      </div>
      <div onClick={()=> navigate('/orders')} >
        <div>
          <SellIcon fontSize="large" id="icon" />
        </div>
        <div>Your Orders</div>
      </div>
      <div onClick={()=> navigate('/cart')} >
        <div>
          <ShoppingCartIcon fontSize="large" id="icon" />
        </div>
        <div>Your Carts</div>
      </div>
      <div >
        <div>
          <HelpIcon fontSize="large" id="icon" />
        </div>
        <div>Help Center</div>
      </div>
    </div>
  );
};

export default SingleProfileFunction;
