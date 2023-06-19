import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import getUserData from "./helpers/getUserData";
import { setUser } from "./store/slices/userSlice";

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
    })
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="chekout" element={<ChekoutPage />} />
        <Route path="contacts" element={<ContactPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile/:subpage?" element={<ProfilePage />} />
        <Route path="shop/:pageParam?" element={<ShopPage />} />
        <Route path="add-product" element={<AddNewProductPage />} />
        <Route path="product/:productID" element={<SingleProductPage />} />
        <Route path="edit-product/:productID" element={<EditProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
