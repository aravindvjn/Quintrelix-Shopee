import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import URL from "../../server";
import { useLocation } from "react-router-dom";
import "./ProductsOnCategory.css";

const ProductsOnCategory = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([{}]);
  console.log(location.state);
  useEffect(() => {
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

            setProducts(() => {
              return data.filter((item) => {
                return categoryList.map((cat) => {
                  if (cat.type === location.state) {
                    return cat.idname === item.idcategory;
                  }
                  return;
                });
              });
            });
            console.log("products", products);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };

    if (location.state === "Electronics") {
      fetchAllCategory();
    } else {
      fetchProducts();
    }
  }, []);

  return (
    <div>
      <Header />
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
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsOnCategory;
