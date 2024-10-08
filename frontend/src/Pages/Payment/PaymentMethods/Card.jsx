import React, { useState } from "react";
import Processing from "../Processing/Processing";
import PayNow from "./PayNow";
import ProcessingFailed from "../Processing/ProcessingFailed";

const Card = ({ state }) => {
  const [processing, setProcessing] = useState(false);
  const [failed,setFailed] = useState(false)
  return (
    <>
        {processing && (
          <Processing message={"UPI"} setProcessing={setProcessing} />
        )}
        {failed && <ProcessingFailed />}
      <div className="center upi-parent">
        <div>
          <h3>Payment Request</h3>
          <input type="text" placeholder="Card Number" />
          <input type="date" placeholder="Expiration Date (MM/YY)" />
          <input type="number" placeholder="CVV" />
         <PayNow setProcessing={setProcessing} states={state} setFailed={setFailed}/>
        </div>
      </div>
    </>
  );
};

export default Card;
