import React, { useContext } from "react";
import Header from "../../../components/Header";
import AddProductBody from "./AddProductBody";
import { UserContext } from "../../Context/context";
import UnAuth from "../../UnAuth/UnAuth";

const AddProducts = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <UnAuth />;
  }
  if (!user.admin) {
    return <UnAuth />;
  }
  return (
    <div>
      <Header />
      <AddProductBody />
    </div>
  );
};

export default AddProducts;
