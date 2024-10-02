import React, { useEffect, useState } from "react";
import ElectronicsAdd from "./ElectronicsAdd";
import AddProductForm from "./AddProductForm";
import CategoryAdd from "./CategoryAdd";
import URL from "../../../server";

const AddProductBody = () => {
  const [selected, setSelected] = useState("Electronics");
  const [addNewProducts, setAddNewProducts] = useState();
  const [products, setProducts] = useState();
  const [refresh, setRefresh] = useState(false);
  const [categoryList, setCategoryList] = useState([{}]);

  let element;
  const selectionHandler = (e) => {
    setSelected(e.target.textContent);
  };
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        await fetch(URL + "category")
          .then((response) => response.json())
          .then((data) => {
            console.log("category", data);
            setCategoryList(data);
            fetchAllProducts();
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };

    const fetchAllProducts = async () => {
      try {
        await fetch(URL)
          .then((response) => response.json())
          .then((data) => {
            console.log("all products", data);
            console.log("categorylist", categoryList);
            const categoryListFiltered = categoryList.filter((cat) => {
              return cat.type === selected;
            });
            console.log("categoryListFiltered", categoryListFiltered);
            setProducts(() => {
              return data.filter((singleData) => {
                return categoryListFiltered.some(
                  (cat) => cat.idname === singleData.idcategory
                );
              });
            });
            console.log("products", products);
            setTimeout(() => {
              setRefresh(true);
            }, 100);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };
    fetchAllCategory();
  }, [selected, refresh]);

  return (
    <div>
      {addNewProducts && (
        <AddProductForm
          setAddNewProducts={setAddNewProducts}
          setRefresh={setRefresh}
        />
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
      {selected === "Electronics" && (
        <ElectronicsAdd products={products} setRefresh={setRefresh} setAddNewProducts={setAddNewProducts} />
      )}
      {selected === "Fashion" && (
        <ElectronicsAdd products={products} setRefresh={setRefresh} setAddNewProducts={setAddNewProducts} />
      )}
      {selected === "Category" && (
        <CategoryAdd products={categoryList} setRefresh={setRefresh} />
      )}
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
