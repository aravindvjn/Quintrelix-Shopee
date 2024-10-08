import React, { useState } from "react";
import OrderSuccessFull from "../OrderSuccessFull/OrderSuccessFull";
import PayNow from "./PayNow";

const COD = ({ address,state }) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
    {confirm.success && <OrderSuccessFull />}
    {confirm.failed && <OrderSuccessFull failed={true} />}
      <div className="center  upi-parent">
        <div className="center" style={{maxWidth:'350px',textAlign:'center'}}>
          <p>
            <strong>{address.name}</strong>
          </p>
          <p>{address.shipping_address}</p>
          <PayNow setConfirm={setConfirm} states={state} cod={true}/>
        </div>
      </div>
    </>
  );
};

export default COD;
