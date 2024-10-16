import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { UserContext } from "../Context/Context";
import CartLoginWarning from "../Cart/CartLoginWarning";
import "./Orders.css";
import SingleOrder from "./SingleOrder";
import URL from "../../server";
import Footer from "../../components/Footer";

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState("1 Month");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const results = await fetch(URL + "orders/" + user.id, {
          method: "GET",
          credentials: "include",
        });
        const data = await results.json();
        if (data.length > 0) {
          setOrderData(() => {
            return data.filter((item) => {
              return (
                new Date().setMonth(
                  new Date().getMonth() - Number(selected.trim().split(" ")[0])
                ) < new Date(item.order_date)
              );
            });
          });
        } else {
          console.log("No orders");
        }
      } catch (err) {
        console.log("Error in fetching Orders", err);
      }
    };
    const fetchProducts = async () => {
      try {
        const results = await fetch(URL, {
          method: "GET",
          credentials: "include",
        });
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
    if (user) {
      fetchOrders();
      fetchProducts();
    }
  }, [refresh, selected]);
  const selectElement = useRef();

  if (!user) {
    return (
      <>
        <Header />
        <CartLoginWarning message={"Please Login First"} />
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header />
      <div
        className="center order-parent"
        style={{ minHeight: "65vh", justifyContent: "start" }}
      >
        <div className="center">
          <p>Orders within</p>
          <select
            ref={selectElement}
            onChange={() => setSelected(selectElement.current.value)}
          >
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>
        </div>
        {orderData.length > 0 ? (
          orderData.map((order) => {
            return (
              <SingleOrder
                setRefresh={setRefresh}
                order={order}
                product={products.filter((product) => {
                  return product.id === order.product_id;
                })}
              />
            );
          })
        ) : (
          <center>No Orders</center>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
