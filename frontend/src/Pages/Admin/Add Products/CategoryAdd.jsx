import React, { useEffect, useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import URL from "../../../server";
import PhotoPreview from "../../../components/FeatureComponents/PhotoPreview";

const CategoryAdd = ({
  categoryList,
  setRefresh,
  allProducts,
  setPhotoPreview,
}) => {
  const [addCategoryForm, setAddCategoryForm] = useState(false);
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await fetch(URL + "category/" + id, {
        method: "DELETE",
        credentials:'include'
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
          <th>No. Products</th>
          <th>Group</th>
        </tr>
        {categoryList &&
          categoryList.map((item, index) => {
            const array = allProducts.filter((product) => {
              return product.idcategory === item.idname;
            });
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img
                    onClick={() =>
                      setPhotoPreview({ status: true, image: item.image })
                    }
                    src={item.image}
                    height="30px"
                    alt={item.name}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{array.length}</td>
                <td>{item.type}</td>
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
