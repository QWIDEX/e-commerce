import React from "react";
import HeadingPathSect from "../components/Reusable/HeadingPathSect";
import BenefitsBlock from "../components/BenefitsBlock/BenefitsBlock";
import AuthSect from "../components/AuthSect/AuthSect";
import { Toaster } from "react-hot-toast";

const AuthPage = () => {
  return (
    <>
      <HeadingPathSect overrideDefaultPath={"My Account"} />
      <AuthSect />
      <BenefitsBlock />
      <Toaster />
    </>
  );
};

export default AuthPage;
