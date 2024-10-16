import React from "react";
import "./FeatureComponents.css";
const PhotoPreview = ({ image, setPhotoPreview }) => {
  return (
    <div className="center login-pop-up" onClick={() => setPhotoPreview(false)}>
      <img className="preview-image" src={image} alt="" />
    </div>
  );
};

export default PhotoPreview;


