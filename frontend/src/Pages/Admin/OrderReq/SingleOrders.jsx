import React, { useEffect, useState } from "react";


const SingleOrders = ({
  order_id,
  user_id,
  product_id,
  customer_name,
  order_date,
  total_amount,
  status,
  shipping_address,
  payment_method,
  setInfo,
}) => {
  const [dispatch, setDispatch] = useState(false);
  const [dateShow,setDateShow] = useState(order_date)
  useEffect(()=>{ 
    const dateFetch = () => {
        const dateObject = new Date(order_date);
        dateObject.setDate(dateObject.getDate() + 5);
        const formattedDate = dateObject.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        });
        setDateShow(formattedDate);
      };
      dateFetch();
  },[])

  return (
    <tr>

      <td>{order_id}</td>
      <td>
        <button onClick={() => setInfo({status:true,id:user_id,product_id:product_id})} className="btn btn-info bttn">
          user info
        </button>
      </td>
      <td>{customer_name}</td>
      <td>{shipping_address}</td>
      <td>{payment_method}</td>
      <td>{dateShow}</td>
      <td>{total_amount}</td>
      <td>{status}</td>
      <td>
        {dispatch ? (
          <button
            onClick={() => setDispatch(!dispatch)}
            className="btn btn-success"
          >
            Dispatched
          </button>
        ) : (
          <button
            onClick={() => setDispatch(!dispatch)}
            className="btn btn-danger"
          >
            Dispatch
          </button>
        )}
      </td>
    </tr>
  );
};

export default SingleOrders;
