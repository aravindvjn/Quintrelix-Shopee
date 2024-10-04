import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import URL from "../../server";
import { useLocation } from "react-router-dom";
import "./ProductsOnCategory.css";
import Products from "./Products";
import { UserContext } from "../Context/context";
import LoginPopUp from "../../components/LoginPopUp";
import SingleProduct from "./SingleProduct/SingleProduct";
import Loading from "../../components/Loading/Loading";

const ProductsOnCategory = () => {
  const { user } = useContext(UserContext);
  const [showDetail, setShowDetail] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([{}]);
  const [refresh, setRefresh] = useState(false);
  const [cartItems, setCartItems] = useState([]);
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

    const fetchCart = async () => {
      const cartResult = await fetch(URL + "cart/" + user.id);
      const cartdata = await cartResult.json();
      console.log("cart data", cartdata);
      cartdata.map((item) => {
        setCartItems((prev) => {
          return [...prev, item.product_id];
        });
      });
    };
    if (user) {
      setCartItems([]);
      fetchCart();
    }
    if (location.state === "Electronics" || location.state === "Fashion") {
      fetchAllCategory();
    } else {
      fetchProducts();
    }
  }, [location.state, refresh]);
  if (showDetail.status) {
    return <SingleProduct {...showDetail}/>;
  }
  return (
    <div>
      <Header />
      <div className="products-on-category">
        {products ?
          products.map((product) => {
            return (
              <Products
                {...product}
                cartItems={cartItems.includes(product.id) ? true : false}
                setRefresh={setRefresh}
                refresh={refresh}
                setShowDetail={setShowDetail}
              />
            );
          }): <Loading />}
      </div>
    </div>
  );
};

export default ProductsOnCategory;
