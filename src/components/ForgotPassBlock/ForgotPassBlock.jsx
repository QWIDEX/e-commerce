import React, { useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import ButtonOutline from "../Reusable/BtnOutline";

const ForgotPassBlock = ({
  className = "",
  forgotPassRef,
  handleForgotPass,
  initialEmail = "",
}) => {
  const [recoveryEmail, setRecoveryEmail] = useState(initialEmail);

  const handlePasswordRecovery = () => {
    if (
      !recoveryEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm)
    )
      toast.error("Email isn't valid");
    else {
      sendPasswordResetEmail(auth, recoveryEmail)
        .then(() => {
          toast.success("Mail sent");
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/user-not-found).")
            toast.error("User not found");
        });
    }
  };

  return (
    <div
      ref={forgotPassRef}
      className="absolute w-full opacity-0 z-20 hidden h-full  justify-center items-center top-0 left-0 transition-all duration-300"
    >
      <button
        onClick={handleForgotPass}
        type="button"
        className="!bg-[rgba(0,0,0,.3)] rounded-lg absolute w-full h-full"
      ></button>
      <div className={`bg-white relative max-h-[516px] md:max-w-xl w-full gap-7 flex flex-col p-4 h-full md:h-[85%] rounded-lg md:!w-[75%] z-10 ${className}`}>
        <button
          type="button"
          className="absolute top-[14px] left-2"
          onClick={handleForgotPass}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M244 400L100 256l144-144M120 256h292"
            />
          </svg>
        </button>
        <h1 className="font-semibold w-1/2 mx-auto text-3xl text-center leading-normal">
          Password recovery
        </h1>
        <label className="flex flex-col gap-5">
          <h3 className="font-medium text-xl leading-normal">Email address</h3>
          <input
            type="email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            placeholder="Email"
            name="recoveryEmail"
            className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
          />
        </label>
        <p>We will send letter on specefied emal with link to reset password</p>
        <ButtonOutline
          type="button"
          onClick={handlePasswordRecovery}
          className="self-center mt-auto mb-5"
        >
          Send Mail
        </ButtonOutline>
      </div>
    </div>
  );
};

export default ForgotPassBlock;
