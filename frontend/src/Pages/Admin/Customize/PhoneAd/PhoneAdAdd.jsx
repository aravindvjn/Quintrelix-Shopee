import React, { useEffect, useState } from "react";
import { authURL } from "../../../../server";
import "./PhoneAd.css";
const PhoneAdadd = () => {
  const [fetchPhoneAd, setFetchPhoneAd] = useState();
  const loadingImage =
    "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif";
  const [image, setImage] = useState(1);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        authURL + "api/advertisement/" + fetchPhoneAd.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchPhoneAd),
        }
      );
      if(response.ok){
        alert("Successfully Updated")
      }else{
        alert("Failed to update")
      }
    } catch (err) {
      console.log("Error in updating advertisement");
    }
  };
  const changeHandler = (e) => {
    setFetchPhoneAd({
      ...fetchPhoneAd,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetch(authURL + "api/advertisement")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
        setFetchPhoneAd(results[0]);
      } catch (err) {
        console.error("Error in fetching data at Home.jsx", err);
      }
    };
    fetchData();
  }, []);
  const style1 = {
    backgroundImage: `url(${fetchPhoneAd ? fetchPhoneAd.image : loadingImage})`,
    backgroundSize: "cover",
    borderRadius: "10px",
  };
  return (
    <div className="admin-phone-ad-parent center">
      <div className="admin-phone-ad">
        <div className="phone-ad-parent">
        <h4 style={{textAlign:'center'}}>ADVERTISMENT</h4>
          <div
            className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary phone-ad-background"
            style={style1}
          >
            {fetchPhoneAd && (
              <div className="col-md-6 p-lg-5 mx-auto my-5">
                <h1 className="display-3 fw-bold" style={{ color: "white" }}>
                  {fetchPhoneAd.heading}
                </h1>
                <h3 className="fw-normal mb-3" style={{ color: "white" }}>
                  {fetchPhoneAd.subheading}
                </h3>
                <div className="d-flex gap-3 justify-content-center lead fw-normal">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href={fetchPhoneAd.learnmore}
                    target="_blank"
                  >
                    Learn more
                  </a>
                  <a
                    className="icon-link"
                    style={{ color: "white", textDecoration: "none" }}
                    href={fetchPhoneAd.buylink}
                    target="_blank"
                  >
                    Visit
                  </a>
                </div>
              </div>
            )}
            <div className="product-device shadow-sm d-none d-md-block"></div>
            <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
          </div>
        </div>
        <div>
          {fetchPhoneAd && (
            <form onSubmit={submitHandler} className="admin-phone-ad-form">
              <label htmlFor="">Heading</label>
              <input
                type="text"
                name="heading"
                value={fetchPhoneAd.heading}
                onChange={changeHandler}
                required
              />
              <label htmlFor="">Sub Heading</label>
              <input
                type="text"
                name="subheading"
                value={fetchPhoneAd.subheading}
                onChange={changeHandler} required
              />
              <label htmlFor="">Image URL</label>
              <input
                name="image"
                type="text"
                value={fetchPhoneAd.image}
                onChange={changeHandler} required
              />
              <label htmlFor="">Visit Link</label>
              <input
                name="buylink"
                type="text"
                value={fetchPhoneAd.buylink}
                onChange={changeHandler} required
              />
              <label htmlFor="">Learn More Link</label>
              <input
                name="learnmore"
                type="text"
                value={fetchPhoneAd.learnmore}
                onChange={changeHandler} 
              />
              <button style={{marginTop:'20px'}} type="submit" className="btn btn-success">Save</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneAdadd;
