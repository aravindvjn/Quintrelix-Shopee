import React, { useState } from "react";
import URL from "../../../server";

const EditForm = ({ initialName, initialImage, setEdit,id }) => {
  const loadingImage =
    "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif";
  const [input, setInput] = useState({
    name: initialName || "",
    image: initialImage || "",
  });
  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="edit-form-parent">
      <button
        id="close-add-new"
        onClick={() => {
          setEdit(false);
        }}
      >
        close
      </button>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await fetch(URL + "banner/" + id,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(input)
            });
            if(response.ok){
                alert("Updation Success")
                setEdit(false)
            }else{
                alert("Updation Failed")
            }
          } catch (err) {
            console.log("Error in updating Banner", err);
          }
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          value={input.name}
          required
        />
        <label htmlFor="">Image</label>
        <img src={input.image || loadingImage} alt="image Preview" />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          onChange={changeHandler}
          value={input.image}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
