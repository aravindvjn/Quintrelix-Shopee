import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import URL from "../../server";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductsOnCategory.css";
import Products from "./Products";
import { UserContext } from "../Context/Context";
import LoginPopUp from "../../components/LoginPopUp";
import SingleProduct from "./SingleProduct/SingleProduct";
import Loading from "../../components/Loading/Loading";
import FetchingComponent from "../../components/FetchingComponent/FetchingComponent";
import ProductFetching from "../../components/FetchingComponent/ProductFetching/ProductFetching";

const ProductsOnCategory = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showDetail, setShowDetail] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([{}]);
  const [refresh, setRefresh] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  if (!location.state) {
    navigate("/");
  }
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
              .toLowerCase(),
          {
            method: "GET",
            credentials: "include",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setProducts(data);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };

    const fetchAllCategory = async () => {
      try {
        await fetch(URL + "category", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setCategoryList(data);
            fetchAllProducts();
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };
    const fetchAllProducts = async () => {
      try {
        await fetch(URL, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            const categoryListFiltered = categoryList.filter((cat) => {
              return cat.type === location.state;
            });
            setProducts(() => {
              return data.filter((singleData) => {
                return categoryListFiltered.some(
                  (cat) => cat.idname === singleData.idcategory
                );
              });
            });
            setTimeout(() => {
              setRefresh(true);
            }, 100);
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };

    const fetchCart = async () => {
      const cartResult = await fetch(URL + "cart/" + user.id, {
        method: "GET",
        credentials: "include",
      });
      const cartdata = await cartResult.json();
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
    return <SingleProduct {...showDetail} />;
  }
  return (
    <div>
      <Header />
      <div className="products-on-category">
        {products.length !== 0
          ? products.map((product) => {
              return (
                <Products
                  key={product.id}
                  {...product}
                  cartItems={cartItems.includes(product.id) ? true : false}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  setShowDetail={setShowDetail}
                />
              );
            })
          : Array(8)
              .fill(<ProductFetching />)
              .map((_, index) => <ProductFetching key={index} />)}
      </div>
    </div>
  );
};

export default ProductsOnCategory;
