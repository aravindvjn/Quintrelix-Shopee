import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Orders from "./Pages/Orders/Orders";
import Fashion from "./Pages/Fashion/Fashion";
import Electronics from "./Pages/Electronics/Electronics";
import Admin from "./Pages/Admin/Admin";
import AddProducts from "./Pages/Admin/Add Products/AddProducts";
import ProductsOnCategory from "./Pages/Electronics/ProductsOnCategory";
import Auth from "./Pages/Auth/Auth";
import { UserProvider } from "./Pages/Context/context";
import Customize from "./Pages/Admin/Customize/Customize";
import Cart from "./Pages/Cart/Cart";
import SingleProduct from "./Pages/Electronics/SingleProduct/SingleProduct";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Address from "./Pages/Addresses/Address";
import AddAddress from "./Pages/Addresses/AddAddress";

function App() {
  const [count, setCount] = useState(0);

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
            <Route exact path="/admin/auth" element={<Admin />} />
            <Route exact path="/admin/add-products" element={<AddProducts />} />
            <Route exact path="/signup" element={<Auth page={"signup"} />} />
            <Route exact path="/login" element={<Auth page={"login"} />} />
            <Route exact path="/customize" element={<Customize />} />
            <Route exact path="/show-product" element={<SingleProduct />} />
            <Route exact path="/search-product" element={<SearchResult />} />
            <Route exact path="/account/addresses" element={<Address />} />
            <Route exact path="/account/addresses/add" element={<AddAddress />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
