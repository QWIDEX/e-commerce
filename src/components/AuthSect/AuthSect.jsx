import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const AuthSect = () => {
  return (
    <div className="px-24 py-16 gap-7 flex justify-between">
      <Login />
      <Register />
    </div>
  );
};

export default AuthSect;
