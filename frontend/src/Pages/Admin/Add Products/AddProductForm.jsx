import React, { useEffect, useState } from "react";
import URL from "../../../server";

const AddProductForm = ({ setAddNewProducts, setRefresh }) => {
  const [input, setInput] = useState({});
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [category, setCategory] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch(URL + "category")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCategory(data);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="add-product-form">
      <button
        id="close-add-new"
        onClick={() => {
          setAddNewProducts(false);
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
            const response = await fetch(URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            });

            if (response.ok) {
              alert("Form submitted successfully!");
              setInput({});
              setAddNewProducts(false);
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
        <h4>Add New Products</h4>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInput}
          required
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name="description"
          value={input.description}
          onChange={handleInput}
        />
        <label htmlFor="">Category</label>
        {/* <input
          type="text"
          name="category"
          value={input.category}
          onChange={handleInput}
          required
        /> */}
        <select value={input.category} name="category" onChange={handleInput}>
          <option></option>
          {category &&
            category.map((cat) => {
              return <option>{cat.name}</option>;
            })}
        </select>
        <label htmlFor="">Price</label>
        <input
          type="number"
          name="price"
          value={input.price}
          onChange={handleInput}
          required
        />
        <label htmlFor="">Stock</label>
        <input
          type="number"
          name="stock"
          value={input.stock}
          onChange={handleInput}
          required
        />
        <label htmlFor="">Image</label>
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

export default AddProductForm;
