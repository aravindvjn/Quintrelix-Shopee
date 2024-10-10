import React, { useState } from "react";
import Processing from "../Processing/Processing";
import PayNow from "./PayNow";
import ProcessingFailed from "../Processing/ProcessingFailed";

const UPI = ({ state }) => {
  const [processing, setProcessing] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {processing && (
        <Processing message={"UPI"} setProcessing={setProcessing} />
      )}
      {failed && <ProcessingFailed message={"UPI"}  />}
      <div className="center upi-parent">
        <div>
          <h3>UPI Payment Request</h3>
          <input type="text" placeholder="Enter UPI ID" required />
          <PayNow setProcessing={setProcessing} states={state} setFailed={setFailed}/>
        </div>
      </div>
    </>
  );
};

export default UPI;
