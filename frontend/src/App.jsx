import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Orders from "./Pages/Orders/Orders";
import Electronics from "./Pages/Electronics/Electronics";
import AddProducts from "./Pages/Admin/Add Products/AddProducts";
import ProductsOnCategory from "./Pages/Electronics/ProductsOnCategory";
import Auth from "./Pages/Auth/Auth";
import { UserProvider } from "./Pages/Context/context.jsx";
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

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/fashion" element={<Electronics />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/category" element={<ProductsOnCategory />} />
            <Route exact path="/admin/add-products" element={<AddProducts />} />
            <Route exact path="/signup" element={<Auth page={"signup"} />} />
            <Route exact path="/login" element={<Auth page={"login"} />} />
            <Route exact path="/customize" element={<Customize />} />
            <Route exact path="/show-product" element={<SingleProduct />} />
            <Route exact path="/buy-product" element={<Buying />} />
            <Route exact path="/search-product" element={<SearchResult />} />
            <Route exact path="/account/addresses" element={<AddressPage />} />
            <Route exact path="/account/user" element={<YourProfile />} />
            <Route exact path="/admin/orders" element={<OrderReq />} />
            <Route exact path="/buy-product/payment" element={<Payment />} />
            <Route exact path="/orders/more-info" element={<MoreInformation />} />
            <Route exact path="/orders/track-info" element={<TrackInfo />} />
            <Route path="*" element={<Home/>} />
            <Route
              exact
              path="/account/addresses/add"
              element={<AddAddress />}
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
