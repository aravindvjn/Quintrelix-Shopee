import React, { useState } from "react";
import URL from "../../../server";

const AddCategoryForm = ({ setAddCategoryForm,setRefresh }) => {
  const [input, setInput] = useState({
    type: "Electronics",
  });
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="add-product-form">
      <button
        id="close-add-new"
        onClick={() => {
          setAddCategoryForm(false);
        }}
      >
        Close
      </button>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(input);
          try {
            const response = await fetch(URL + "category", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            });

            if (response.ok) {
              alert("Form submitted successfully!");
              setInput({});
              setAddCategoryForm(false);
              setRefresh((prev) => {
                return !prev;
              });
            } else {
              alert("Failed to submit form.");
            }
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        }}
      >
        <h4>Add Category Group</h4>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInput}
          required
        />
        <label htmlFor="">Type</label>
        <select value={input.type} name="type" onChange={handleInput}>
          <option>Electronics</option>
          <option>Fashion</option>
        </select>
        <label htmlFor="">Image URL</label>
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={handleInput}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
