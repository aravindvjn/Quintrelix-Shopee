import React from "react";
import "./Notice.css";
import CloseIcon from '@mui/icons-material/Close';
const Notice = ({ setNotice }) => {
  return (
    <div className="notice-parent center">
      <div className="center" style={{flexDirection:'column'}}>
        <CloseIcon  id="edit-username-close" onClick={()=>setNotice(false)}/>
        <h3>Disclaimer</h3>
        <p>
          This website is intended for <strong>educational purposes only</strong>. The products
          displayed on this site are not real and are <strong>not available</strong> for
          purchase. Any product details, descriptions, or prices are fictional
          and used solely to demonstrate the structure and functionality of an
          e-commerce platform. Please note that any payments or transactions
          attempted through this site are purely for <strong>demonstration purposes</strong> and
          will not result in actual purchases or charges. No real financial
          information is processed. Some images and media used on
          this website have been sourced from external sources. If you are the
          copyright owner of any content featured on this site and believe it
          has been used without proper authorization, please contact us
          immediately at <a href="mailto:aravind284479@gmail.com">mail</a>. We will address
          your concerns and take the necessary steps to either credit or remove
          the content as needed.
        </p>
      </div>
    </div>
  );
};

export default Notice;
