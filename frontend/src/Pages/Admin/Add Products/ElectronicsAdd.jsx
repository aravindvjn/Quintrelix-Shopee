import React, { useEffect, useState } from "react";
import URL from "../../../server";
import "../Admin.css";
const ElectronicsAdd = ({
  products,
  setRefresh,
  setAddNewProducts,
  setEditPanel,
}) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(URL + id, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Product deleted");
        setRefresh((prev) => {
          return !prev;
        });
      } else {
        alert("Failed");
      }
    } catch (err) {
      console.error("Error in deleting a product");
    }
  };
  return (
    <div className="electronics-add-parent">
      <table>
        <tr>
          <th>SL No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
        {products &&
          products.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} height="30px" alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <button
                    onClick={() => {
                      setAddNewProducts(true);
                      setEditPanel({ status: true, id: item.id });
                    }}
                  >
                    Edit
                  </button>
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

export default ElectronicsAdd;
