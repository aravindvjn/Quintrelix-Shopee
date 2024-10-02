import React, { useEffect, useState } from 'react'
import AddCategoryForm from './AddCategoryForm'
import URL from '../../../server';

const CategoryAdd = ({products,setRefresh}) => {
    const [addCategoryForm,setAddCategoryForm] = useState(false);
    const handleEdit=async()=>{
      
    }
    const handleDelete=async (id)=>{
      console.log(id)
      try {
        const response = await fetch(URL+'category/'+id, {
          method: "DELETE"
        });

        if (response.ok) {
          alert("Deletion successfully!");
          setRefresh((prev)=>{
            return !prev
          })
        } else {
          alert("Failed to delete.");
        }
      } catch (error) {
        console.error("Error in Deletion:", error);
      }
    }
  return (
    <div className="electronics-add-parent">
        {addCategoryForm && <AddCategoryForm setAddCategoryForm={setAddCategoryForm} setRefresh={setRefresh}/>}
        <button className='show-category-form' onClick={()=>{
            setAddCategoryForm(true)
        }}>Add new Category</button>
      <table>
        <tr>
          <th>SL No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Group</th>
          <th>Starting Price</th>
        </tr>
        {products &&
          products.map((item, index) => {
            console.log(item)
            return (
              <tr>
                <td>{item.id}</td>
                <td><img src={item.image} height="30px" alt={item.name}/></td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.price}</td>
                <td><button onClick={()=>{
                  handleEdit(item.id)
                }}>Edit</button>
                <button onClick={()=>{
                  handleDelete(item.id)
                }}>Delete</button></td>
              </tr>
            );
          })}
      </table>
    </div>
  )
}

export default CategoryAdd
