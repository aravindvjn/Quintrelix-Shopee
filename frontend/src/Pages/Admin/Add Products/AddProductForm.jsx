import React, { useEffect, useState } from "react";
import URL from "../../../server";

const AddProductForm = ({
  setAddNewProducts,
  setRefresh,
  setEditPanel,
  editPanel,
}) => {
  console.log("edit pannel", editPanel.id);
  const [input, setInput] = useState({});
  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const [category, setCategory] = useState();
  useEffect(() => {
    const fetchProductData = async (id) => {
      try {
        console.log(URL + id);
        const results = await fetch(URL + id);
        const data = await results.json();
        if (results) {
          setInput({
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            image: data.image,
            stock: data.stock,
          });
        } else {
          console.log("product not found");
        }
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    if (editPanel.status) {
      fetchProductData(editPanel.id);
    }

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
          setEditPanel({ status: false, id: 0 });
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
            const response = await fetch(
              URL + (editPanel.status ? editPanel.id : ""),
              {
                method: editPanel.status ? "PUT" : "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
              }
            );

            if (response.ok) {
              alert("Form submitted successfully!");
              setInput({});
              setAddNewProducts(false);
              setEditPanel({ status: false, id: 0 });
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
