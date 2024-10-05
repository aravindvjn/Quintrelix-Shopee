import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleAddress = ({
  user_id,
  name,
  address,
  state,
  country,
  postal_code,
  phone_number,
  setRefresh,
}) => {
  const [defaults, setDefaults] = useState(false);
  const input = useRef();
  const deleteAddresss=()=>{
    
  }
  const editAddresss=()=>{

  }

//   const checkIt = () => {
//     if (input.current.checked) {
//       setDefaults(true);
//     } else {
//       setDefaults(false);
//     }
//     setRefresh((prev) => !prev);
//   };
  useEffect(() => {
    // checkIt();
  });
  return (
    <div className="single-address">
      <div className="single-address-edit-div">
        <DeleteIcon style={{cursor:'pointer'}} onClick={deleteAddresss}/>
        <EditIcon style={{cursor:'pointer'}} onClick={editAddresss} />
      </div>
      {false && (
        <div>
          <input
            type="radio"
            name="single-address"
            ref={input}
            onClick={checkIt}
          />
          <span> {defaults && " Default"}</span>
        </div>
      )}
      <p>
        <strong>{name}</strong>
      </p>
      <div>
        <p>
          <em>{address} , {state}</em>
        </p>
        <p><em>{country}</em></p>
      </div>
      <p>{postal_code}</p>
      <p>Phn No: {phone_number}</p>
    </div>
  );
};

export default SingleAddress;
