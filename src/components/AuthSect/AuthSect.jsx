import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const AuthSect = () => {
  return (
    <div className="lg-sm:px-24 px-10 sm:flex-row flex-col sm:py-16 gap-7 flex justify-center sm:justify-between">
      <Login />
      <Register />
    </div>
  );
};

export default AuthSect;
