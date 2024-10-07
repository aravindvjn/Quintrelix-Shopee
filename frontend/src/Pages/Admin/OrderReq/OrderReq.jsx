import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import "./OrderReq.css";
import URL from "../../../server";
import SingleOrders from "./SingleOrders";
import Loading from "../../../components/Loading/Loading";
import UserInfo from "./UserInfo";
import { UserContext } from "../../Context/context";
import UnAuth from "../../UnAuth/UnAuth";

const OrderReq = () => {
  const [orders, setOrders] = useState([]);
  const {user} = useContext(UserContext)
  const [info, setInfo] = useState({status:false});
  useEffect(() => {
    const FetchAllOrders = async () => {
      try {
        const results = await fetch(URL + "orders/all");
        const data = await results.json();
        if (data.length > 0) {
          setOrders(data);
        } else {
          console.log("Failed to fetch all orders");
        }
      } catch (err) {
        console.log("Error in fetching all orders", err);
      }
    };
    FetchAllOrders();
  }, []);

  if (!user) {
    return <UnAuth />;
  }
  if (!user.admin) {
    return <UnAuth />;
  }

  return (
    <div>
      <Header />
      {info.status && <UserInfo setInfo={setInfo} info={info}  />}

      <div className="order-req-parent">
        <table>
          <tbody>
            {orders.length > 0 && (
              <tr>
                <th>Order ID</th>
                <th>Info</th>
                <th>Customer Name</th>
                <th>Shipping Address</th>
                <th>Payment Method</th>
                <th>Order Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>set Status</th>
              </tr>
            )}
            {orders.length > 0 &&
              orders.map((order) => {
                return <SingleOrders key={order.order_id} {...order} setInfo={setInfo}/>;
              })}
          </tbody>
        </table>

        {orders.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default OrderReq;
