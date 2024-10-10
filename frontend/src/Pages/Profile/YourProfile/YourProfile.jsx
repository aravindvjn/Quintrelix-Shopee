import React, { useContext, useState } from "react";
import "./YourProfile.css";
import Header from "../../../components/Header";
import { UserContext } from "../../Context/context";
import CartLoginWarning from "../../Cart/CartLoginWarning";
import Footer from "../../../components/Footer";
import EditIcon from '@mui/icons-material/Edit';
import EditUserName from "./EditUserName";
import EditEmailAndPass from "./EditEmailAndPass";
const YourProfile = () => {
  const [editUSerName,setEditUserName] = useState(false)
  const [edit,setEdit] = useState(false)
  const {user} = useContext(UserContext)
  if (!user) {
    return (
      <>
        <Header />
        <CartLoginWarning message={"Please Login First"} />
        <Footer />
      </>
    );
  }
  return (
    <div>
      <Header />
      {editUSerName && <EditUserName setEditUserName={setEditUserName} user={user} />}
      {edit && <EditEmailAndPass setEdit={setEdit} user={user}/>}
      <div className="your-profile-parent">
       <div>
        <p>User Name : <strong><em>{user.username}</em></strong><EditIcon id="username-edit-icon" fontSize="small" onClick={()=>setEditUserName(true)} /> </p>
        <p>Email : <strong><em>{user.email}</em></strong></p>
       </div>
       <div>
        <button className="btn btn-dark change-password-button" onClick={()=>setEdit(true)}>Change Password</button>
       </div>
      </div>
    </div>
  );
};

export default YourProfile;

