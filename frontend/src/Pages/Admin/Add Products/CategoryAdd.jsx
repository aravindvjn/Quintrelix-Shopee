import React, { useEffect, useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import URL from "../../../server";

const CategoryAdd = ({ categoryList, setRefresh,allProducts }) => {
  const [addCategoryForm, setAddCategoryForm] = useState(false);
  const handleEdit = async () => {};
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await fetch(URL + "category/" + id, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Deletion successfully!");
        setRefresh((prev) => {
          return !prev;
        });
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error in Deletion:", error);
    }
  };
  return (
    <div className="electronics-add-parent">
      {addCategoryForm && (
        <AddCategoryForm
          setAddCategoryForm={setAddCategoryForm}
          setRefresh={setRefresh}
        />
      )}
      <button
        className="show-category-form"
        onClick={() => {
          setAddCategoryForm(true);
        }}
      >
        Add new Category
      </button>
      <table>
        <tr>
          <th>SL No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Group</th>
          <th>Starting Price</th>
        </tr>
        {categoryList &&
          categoryList.map((item, index) => {
            const filteredProduct = allProducts.filter((product)=>{
              return product.idcategory === item.idname;
            })
            console.log(item.name,filteredProduct)
            const priceArray = filteredProduct.map(pro=>{
              return pro.price;
            })
            console.log()
            return (
              <tr>
                <td>{item.id}</td>
                <td>
                  <img src={item.image} height="30px" alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{Math.min(...priceArray)===Infinity? 0 :Math.min(...priceArray)}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default CategoryAdd;
