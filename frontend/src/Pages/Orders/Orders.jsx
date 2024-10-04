import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { UserContext } from "../Context/context";
import CartLoginWarning from "../Cart/CartLoginWarning";
import "./Orders.css";
import SingleOrder from "./SingleOrder";
import URL from "../../server";

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const results = await fetch(URL + "orders/" + user.id);
        const data = await results.json();
        if (data.length > 0) {
          setOrderData(data);
        } else {
          console.log("No orders");
        }
      } catch (err) {
        console.log("Error in fetching Orders", err);
      }
    };
    const fetchProducts = async () => {
      try {
        const results = await fetch(URL);
        const data = await results.json();
        if (data.length > 0) {
          setProducts(data);
        } else {
          console.log("No products");
        }
      } catch (err) {
        console.log("Error in fetching Products", err);
      }
    };
    fetchOrders();
    fetchProducts();
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <CartLoginWarning message={"Please Login First"} />
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="center order-parent">
        {orderData.map((order) => {
          console.log("order",order)
          console.log("products",products)
          return <SingleOrder order={order} product={products.filter(product=>{
            return product.id === order.product_id;
          })}/>;
        })}
      </div>
    </div>
  );
};

export default Orders;
