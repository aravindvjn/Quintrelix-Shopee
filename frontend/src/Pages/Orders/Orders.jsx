import React, { useContext } from "react";
import Header from "../../components/Header";
import { UserContext } from "../Context/context";
import LoginButton from "../../components/LoginButton";
import CartLoginWarning from "../Cart/CartLoginWarning";

const Orders = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <>
      <Header/>
      <CartLoginWarning message={"Please Login First"} />
      </>
    );
  }

  return (
    <div>
      <Header />
    </div>
  );
};

export default Orders;
