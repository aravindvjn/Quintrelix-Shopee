import React from "react";
import "./Notice.css";
import CloseIcon from "@mui/icons-material/Close";
const Notice = ({ setNotice }) => {
  return (
    <div className="notice-parent center">
      <div className="center" style={{ flexDirection: "column" }}>
        <CloseIcon id="edit-username-close" onClick={() => setNotice(false)} />
        <h3>Disclaimer</h3>
        <p>
          <strong>
            This website is designed solely for educational purposes.
          </strong>
          The products displayed here are not real and are not available for
          purchase. Any product details, descriptions, or prices are{" "}
          <strong>fictional</strong> and are used to demonstrate the structure
          and functionality of an e-commerce platform. Some images and media
          used on this website are sourced from external sources. If you are the
          copyright owner of any content featured on this site and believe it
          has been used without proper authorization, please contact us
          immediately at 
          <a href="mailto:aravind284479@gmail.com">mail</a>. We will address
          your concerns and take the necessary steps to either credit or remove
          the content as needed.
        </p>
      </div>
    </div>
  );
};

export default Notice;
