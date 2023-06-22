import React from "react";
import HeadingPathSect from "../components/Reusable/HeadingPathSect";
import BenefitsBlock from "../components/BenefitsBlock/BenefitsBlock";
import AuthSect from "../components/AuthSect/AuthSect";

const AuthPage = () => {
  return (
    <>
      <HeadingPathSect overrideDefaultPath={"My Account"} />
      <AuthSect />
      <BenefitsBlock />
    </>
  );
};

export default AuthPage;
