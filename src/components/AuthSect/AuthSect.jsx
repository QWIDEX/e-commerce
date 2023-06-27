import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const AuthSect = () => {
  return (
    <div className="lg-sm:px-24 px-10 sm:flex-row flex-col sm:py-16 xl:gap-40 gap-7 flex justify-center ">
      <Login />
      <Register />
    </div>
  );
};

export default AuthSect;
