/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Card from "./pages/Card";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_categorys } from "./store/reducers/homeReducer";
import CategoryShop from "./components/CategoryShop";
import SearchProducts from "./components/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectedUser from "./utils/ProtectedUser";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetails from "./components/dashboard/OrderDetails";
import Chat from "./components/dashboard/Chat";
import OrderConfirm from "./pages/OrderConfirm";
import NotFound from "./pages/NotFound";

// import About from "./pages/About";
// import Contact from "./pages/Contact";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categorys());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/order/confirm?" element={<OrderConfirm />} />
        <Route path="/product/search?" element={<SearchProducts />} />
        <Route path="/card" element={<Card />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/product/details/:slug" element={<ProductDetails />} />

        <Route path="/deshboard" element={<ProtectedUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
