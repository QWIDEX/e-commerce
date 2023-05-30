import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ChekoutPage from "./pages/ChekoutPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import AddNewProductPage from "./pages/AddNewProductPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="chekout" element={<ChekoutPage />} />
        <Route path="contacts" element={<ContactPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="shop/:pageParam?" element={<ShopPage />} />
        <Route path="add-product" element={<AddNewProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
