import React, { useEffect, useState } from "react";
import ElectronicsAdd from "./ElectronicsAdd";
import AddProductForm from "./AddProductForm";
import CategoryAdd from "./CategoryAdd";
import URL from "../../../server";

const AddProductBody = () => {
  const [selected, setSelected] = useState("Electronics");
  const [addNewProducts, setAddNewProducts] = useState();
  const [category, setCategory] = useState();
  const [addNewFashion, setAddNewFashion] = useState();
  const [products, setProducts] = useState();
  const [refresh,setRefresh] = useState(false)

  let element;
  const selectionHandler = (e) => {
    setSelected(e.target.textContent);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = "";
        if (selected === "Electronics") {
          endpoint = "";
        } else if (selected === "Category") {
          endpoint = "category";
        }
        await fetch(URL + endpoint)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setProducts(data);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };
    fetchProducts();
  }, [selected,refresh]);

  return (
    <div>
      {addNewProducts && (
        <AddProductForm setAddNewProducts={setAddNewProducts} setRefresh={setRefresh} />
      )}

      <ul className="add-product">
        <li
          className={`${selected === "Electronics" && "selected"}`}
          onClick={selectionHandler}
        >
          Electronics
        </li>
        <li
          className={`${selected === "Fashion" && "selected"}`}
          onClick={selectionHandler}
        >
          Fashion
        </li>
        <li
          className={`${selected === "Category" && "selected"}`}
          onClick={selectionHandler}
        >
          Category
        </li>
      </ul>
      {selected === "Electronics" && <ElectronicsAdd products={products} setRefresh={setRefresh} />}
      {selected === "Fashion" && <ElectronicsAdd products={products} setRefresh={setRefresh}/>}
      {selected === "Category" && <CategoryAdd products={products} setRefresh={setRefresh} />}
      <button
        id="add-product-button"
        onClick={() => {
          setAddNewProducts(true);
        }}
      >
        Add
        <br />
        Products
      </button>
    </div>
  );
};

export default AddProductBody;
