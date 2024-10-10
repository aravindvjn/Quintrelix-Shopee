import React, { useContext } from "react";
import Header from "../../components/Header";
import { UserContext } from "../Context/Context";
import "./Profile.css";
import ProfileFunctions from "./ProfileFunctions";
import { useNavigate } from "react-router-dom";
import CartLoginWarning from "../Cart/CartLoginWarning";
import Footer from "../../components/Footer";
const Profile = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <div>
        <Header />
        <CartLoginWarning />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="profile-parent-div">
        <h4 style={{ margin: "20px 0px" }}>
          Hello, {user.username.toUpperCase()}
        </h4>
        <ProfileFunctions />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
