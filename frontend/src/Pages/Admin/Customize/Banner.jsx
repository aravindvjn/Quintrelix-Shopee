import React, { useState } from "react";
import EditForm from "./EditForm";
const loadingImage =
  "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif";

const Banner = ({ image, name, id, setRefresh }) => {
  const [edit, setEdit] = useState(false);
  setRefresh(edit);
  return (
    <div className="banner-parent">
      {edit && (
        <EditForm
          setEdit={setEdit}
          initialImage={image}
          initialName={name}
          id={id}
        />
      )}
      <img
        src={image || loadingImage}
        alt={name || "default"}
        onClick={() => {
          setEdit(true);
        }}
      />
      <p>{name || "Loading..."}</p>
    </div>
  );
};

export default Banner;
