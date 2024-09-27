import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import URL from "../../server";
import { useLocation } from "react-router-dom";
import "./ProductsOnCategory.css";

const ProductsOnCategory = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([{}]);
  const [refresh, setRefresh] = useState(false);
  console.log(location.state);
  useEffect(() => {
    console.log("products", products);
    const fetchProducts = async () => {
      try {
        await fetch(
          URL +
            "category/" +
            location.state
              .split(" ")
              .join("-")
              .split("'")
              .join("")
              .toLowerCase()
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setProducts(data);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };

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
              return cat.type === location.state;
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

    if (location.state === "Electronics" || location.state === "Fashion") {
      fetchAllCategory();
    } else {
      fetchProducts();
    }
  }, [location.state, refresh]);

  return (
    <div>
      <Header />
      {products.length === 0 && <center>No products available</center>}
      <div className="products-on-category">
        {products &&
          products.map((product) => {
            return (
              <div className="products-on-category-single">
                <div>
                  {" "}
                  <img src={product.image} height="300px" alt={product.name} />
                </div>
                <div>
                  <h5>{product.name}</h5>
                  <p>{product.category}</p>
                  <p>{product.description}</p>
                  <h6>Rs. {product.price}</h6>
                  <div className="products-buttons"><button>Add to Cart</button>
                  <button>Buy</button></div>
                </div>
              
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsOnCategory;
