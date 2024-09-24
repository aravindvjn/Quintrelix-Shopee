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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/profile" element={<Profile />} />
          <Route  path="/orders" element={<Orders />} />
          <Route  path="/fashion" element={<Fashion />} />
          <Route  path="/electronics" element={<Electronics />} />
          <Route  path="/category" element={<ProductsOnCategory/>} />
          <Route  exact path="/admin/auth" element={<Admin />} />
          <Route  exact path="/admin/add-products" element={<AddProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
