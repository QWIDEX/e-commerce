import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ChekoutPage from "./pages/ChekoutPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import SingleProductPage from "./pages/SingleProductPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import EditProductPage from "./pages/EditProductPage";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import getUserData from "./helpers/getUserData";
import { setUser } from "./store/slices/userSlice";
import ProfileSect from "./components/ProfileSect/ProfileSect";
import OrdersSect from "./components/OrdersSect/OrdersSect";
import FavoritesSect from "./components/FavoritesSect/FavoritesSect";
import AdminPage from "./pages/AdminPage";
import AdminProductsSect from "./components/AdminProductsSect/AdminProductsSect";
import AdminOrdersSect from "./components/AdminOrdersSect/AdminOrdersSect";
import AdminUsersSect from "./components/AdminUsersSect/AdminUsersSect";
import AdminContactRequests from "./components/AdminContactRequests/AdminContactRequests";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch((dispatch) => {
          getUserData(user).then((user) => {
            dispatch(setUser(user));
          });
        });
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<ChekoutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="shop/:pageParam?" element={<ShopPage />} />
        <Route path="product/:productID" element={<SingleProductPage />} />
        <Route path="admin" element={<AdminPage />}>
          <Route path="/admin" element={<AdminProductsSect />} />
          <Route path="orders" element={<AdminOrdersSect />} />
          <Route path="users" element={<AdminUsersSect />} />
          <Route path="messages" element={<AdminContactRequests />} />
        </Route>
        <Route path="profile" element={<ProfilePage />}>
          <Route path="/profile" element={<ProfileSect />} />
          <Route path="orders" element={<OrdersSect />} />
          <Route path="favorites/:pageParam?" element={<FavoritesSect />} />
        </Route>
        <Route path="edit-product/:productID" element={<EditProductPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
