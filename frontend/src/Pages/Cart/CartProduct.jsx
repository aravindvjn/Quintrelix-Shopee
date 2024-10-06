import React, { useContext, useEffect, useRef, useState } from "react";
import Add from "@mui/icons-material/AddBoxOutlined";
import Minus from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import URL from "../../server";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../Context/context";
const CartProduct = ({ item, cart, setRefresh, setTotal}) => {
  const { id, name, category, image, price, description } = item;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const check = useRef();
  const { user } = useContext(UserContext);

  const removeFromCartHandler = async () => {
    try {
    
      const response = await fetch(URL + "cart/" + user.id + "/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setTotal((prev) => {
          return { ...prev, [cart.id]: 0 };
        });
        setRefresh((prev) => !prev);
      } else {
        alert("Failed to Remove");
      }
    } catch (err) {
      console.log("Error in add to Cart", err);
    }
  };

  const increaseQty = async () => {
    updateQty("increase");
  };
  const decreaseQty = () => {
    updateQty("decrease");
  };
  const updateQty = async (operation) => {
    try {
      const response = await fetch(URL + "cart/" + cart.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: operation,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setRefresh((prev) => !prev);
      } else {
        alert("Failed to update qty");
      }
    } catch (err) {
      console.log("err in updating", err);
    }
  };

  useEffect(() => {
    if (cart) {
      if (check.current.checked) {
        setTotal((prev) => {
          return { ...prev, [cart.id]: cart.quantity * price };
        });
      } else {
        setTotal((prev) => {
          return { ...prev, [cart.id]: 0 };
        });
      }
    }
  }, [cart, checked]);
  return (
    <div className="cart-product-parent">
      <div>
        <input
          ref={check}
          type="checkbox"
          defaultChecked
          onClick={() => setChecked(!checked)}
        />
      </div>
      <section
        onClick={() =>
          navigate("/show-product", {
            state: {
              id,
              name,
              category,
              image,
              price,
              description,
              cartItems: true,
            },
          })
        }
      >
        <div>
          <img src={image} alt={name} />
        </div>
        <div>
          {" "}
          {name.length < 60 ? (
            <p>{name}</p>
          ) : (
            <p>
              {name.slice(0, 100)}
              <strong>.....</strong>
            </p>
          )}
        </div>
      </section>
      <div>
        <div>
          <strong>Rs.{price}</strong>
        </div>
        <div>
          <Minus
            fontSize="small"
            onClick={decreaseQty}
            style={{ cursor: "pointer" }}
          />
          Qty:{cart && cart.quantity}
          <Add
            fontSize="small"
            onClick={increaseQty}
            style={{ cursor: "pointer" }}
          />
        </div>
        <CloseIcon id="cart-delete" onClick={() => removeFromCartHandler()} />
      </div>
    </div>
  );
};

export default CartProduct;
