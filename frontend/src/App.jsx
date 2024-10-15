import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Orders from "./Pages/Orders/Orders";
import Electronics from "./Pages/Electronics/Electronics";
import AddProducts from "./Pages/Admin/Add Products/AddProducts";
import ProductsOnCategory from "./Pages/Electronics/ProductsOnCategory";
import Auth from "./Pages/Auth/Auth";
import Customize from "./Pages/Admin/Customize/Customize";
import Cart from "./Pages/Cart/Cart";
import SingleProduct from "./Pages/Electronics/SingleProduct/SingleProduct";
import SearchResult from "./Pages/SearchResult/SearchResult";
import AddAddress from "./Pages/Addresses/AddAddress";
import Buying from "./Pages/Buying/Buying";
import AddressPage from "./Pages/Addresses/AddressPage";
import YourProfile from "./Pages/Profile/YourProfile/YourProfile";
import OrderReq from "./Pages/Admin/OrderReq/OrderReq";
import Payment from "./Pages/Payment/Payment";
import MoreInformation from "./Pages/MoreInformation/MoreInformation";
import TrackInfo from "./Pages/TrackInfo/TrackInfo";
import { UserContext } from "./Pages/Context/Context";
import { authURL } from "./server";

function App() {
  const { user, setUser } = useContext(UserContext);
  let admin = false;
  if (user) {
    admin = user.admin;
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await fetch(authURL + "api/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await result.json();
        if (data) {
          setUser(data);
        } else {
          setUser(false);
        }
      } catch (err) {
        console.error("Error in fetching User details");
      }
    };
    fetchUser();
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Auth page={"login"} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/fashion" element={<Electronics />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/category" element={<ProductsOnCategory />} />
        <Route exact path="/admin/add-products" element={<AddProducts />} />
        <Route path="/signup" element={<Auth page={"signup"} />} />
        <Route path="/login" element={<Auth page={"login"} />} />
        <Route
          exact
          path="/customize"
          element={admin ? <Customize /> : <Home />}
        />
        <Route path="/show-product" element={<SingleProduct />} />
        <Route
          path="/buy-product"
          element={user ? <Buying /> : <Auth page={"login"} />}
        />
        <Route path="/search-product" element={<SearchResult />} />
        <Route
          exact
          path="/account/addresses"
          element={user ? <AddressPage /> : <Auth page={"login"} />}
        />
        <Route
          exact
          path="/account/user"
          element={user ? <YourProfile /> : <Auth page={"login"} />}
        />
        <Route
          exact
          path="/admin/orders"
          element={admin ? <OrderReq /> : <Home />}
        />
        <Route
          exact
          path="/buy-product/payment"
          element={user ? <Payment /> : <Auth page={"login"} />}
        />
        <Route
          exact
          path="/orders/more-info"
          element={user ? <MoreInformation /> : <Auth page={"login"} />}
        />
        <Route
          exact
          path="/orders/track-info"
          element={user ? <TrackInfo /> : <Auth page={"login"} />}
        />
        <Route
          exact
          path="/account/addresses/add"
          element={user ? <AddAddress /> : <Auth page={"login"} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
