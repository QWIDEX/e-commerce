import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MiniCart from "../MiniCart/MiniCart";

const Layout = () => {
  const [miniCartActive, setMiniCartActive] = useState(false);
  const closeBtnRef = useRef();
  const miniCartRef = useRef();

  const navigate = useNavigate();

  const toggleMiniCart = () => {
    if (document.documentElement.scrollWidth < 768) {
      navigate("/cart")
      setMiniCartActive(false);
    } else {
      if (miniCartActive) {
        closeBtnRef.current.style.opacity = "0";
        miniCartRef.current.style.top = "-730px";
        closeBtnRef.current.style.pointerEvents = "none";
        setTimeout(() => {
          closeBtnRef.current.style.display = "none";
        }, 300);
      } else {
        closeBtnRef.current.style.display = "block";
        setTimeout(() => {
          miniCartRef.current.style.top = "0px";
          closeBtnRef.current.style.pointerEvents = "auto";
          closeBtnRef.current.style.opacity = "1";
        }, 300);
      }
    }

    setMiniCartActive(!miniCartActive);
  };

  return (
    <>
      <Header toggleMiniCart={toggleMiniCart} />
      <MiniCart
        toggleMiniCart={toggleMiniCart}
        miniCartRef={miniCartRef}
        closeBtnRef={closeBtnRef}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
