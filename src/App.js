import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ChekoutPage from "./pages/ChekoutPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import AddNewProductPage from "./pages/AddNewProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import EditProductPage from "./pages/EditProductPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="chekout" element={<ChekoutPage />} />
        <Route path="contacts" element={<ContactPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="shop/:pageParam?" element={<ShopPage />} />
        <Route path="add-product" element={<AddNewProductPage />} />
        <Route path="product/:productID" element={<SingleProductPage />} />
        <Route path="edit-product/:productID" element={<EditProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
