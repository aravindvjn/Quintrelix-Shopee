import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/context";
import URL from "../../server";

const Products = ({id,name,category,image,price,description}) => {
    const {user,cartItems} = useContext(UserContext)
    const [cartStatus,setCartStatus] = useState(false)
    
    console.log("user",user)
    const removeFromCartHandler=async()=>{
        try{
            const response = await fetch(URL + 'cart/' + user.id +'/' + id,{
                method:'DELETE',
            })
            if(response.ok){
                alert("Removed from cart")
            }else{
                alert("Failed to Remove")
            }
        }catch(err){
            console.log("Error in add to Cart",err)
        }
    }
    const addToCartHandler =async()=>{
        try{
            const response = await fetch(URL + 'cart',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:user.id,
                    productId:id,
                    quantity:1
                })
            })
            if(response.ok){
                alert("added to cart")
            }else{
                alert("Failed to add")
            }
        }catch(err){
            console.log("Error in add to Cart",err)
        }
    }
    useEffect(()=>{
        console.log("cart item",cartItems)
        cartItems.map(item=>{
            if(item.id==id){
                setCartStatus(true)
            }
        })
    },[])
  return (
    <div className="products-on-category-single">
      <div>
        {" "}
        <img src={image} height="300px" alt={name} />
      </div>
      <div>
        <h5>{name}</h5>
        <p>{category}</p>
        <p>{description}</p>
        <h6>Rs. {price}</h6>
        <div className="products-buttons" >
          {cartStatus ? <button onClick={removeFromCartHandler}>Remove from Cart</button> : <button onClick={addToCartHandler}>Add to Cart</button>}
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
