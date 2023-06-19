import React, { useRef, useState } from "react";
import ButtonOutline from "../Reusable/BtnOutline";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayForgotPass, setDisplayForgotPass] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const forgotPassRef = useRef();
  const dispatch = useDispatch();

  const handleForgotPass = () => {
    if (displayForgotPass) {
      forgotPassRef.current.style.opacity = "0";
      forgotPassRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        forgotPassRef.current.style.display = "none";
      }, 300);
    } else {
      forgotPassRef.current.style.display = "flex";
      setTimeout(() => {
        forgotPassRef.current.style.pointerEvents = "auto";
        forgotPassRef.current.style.opacity = "1";
      }, 300);
    }

    setDisplayForgotPass(!displayForgotPass);
  };

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

  const handleLogin = () => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    if (!password) toast.error("Write down password please");
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => toast.success("Successfully signed in"))
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/wrong-password).")
            toast.error("Wrong password");
          if (error.message === "Firebase: Error (auth/user-not-found).")
            toast.error("User not found");
        });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="py-9 w-full relative flex flex-col gap-7 sm:w-1/2 lg:px-17 md:px-15 xl:px-20 max-w-xl md:pr-12 lg-sm:pr-14 lg:pr-16 xl:pr-24"
    >
      <div
        ref={forgotPassRef}
        className="absolute w-full opacity-0 hidden h-full  justify-center items-center top-0 left-0 transition-all duration-300"
      >
        <button
          onClick={handleForgotPass}
          type="button"
          className="!bg-[rgba(0,0,0,.3)] rounded-lg absolute w-full h-full"
        ></button>
        <div className="bg-white relative md:max-h-[516px] md:max-w-xl w-full gap-7 flex flex-col p-4 h-full md:h-[85%] rounded-lg md:!w-[75%] z-10">
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
            <h3 className="font-medium text-xl leading-normal">
              Email address
            </h3>
            <input
              type="email"
              onChange={(e) => setRecoveryEmail(e.target.value)}
              placeholder="Email"
              name="recoveryEmail"
              className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
            />
          </label>
          <p>
            We will send letter on specefied emal with link to reset password
          </p>
          <ButtonOutline
            type="button"
            onClick={handlePasswordRecovery}
            className="self-center mt-auto mb-5"
          >
            Send Mail
          </ButtonOutline>
        </div>
      </div>
      <h1 className="font-semibold text-4xl leading-normal">Sign In</h1>
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-5">
          <h3 className="font-medium text-2xl leading-normal">Email address</h3>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-5">
          <h3 className="font-medium text-2xl leading-normal">Password</h3>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
          />
        </label>
        <div className=" flex justify-center flex-wrap gap-8">
          <ButtonOutline type={"submit"}>Log In</ButtonOutline>
          <button
            type="button"
            onClick={handleForgotPass}
            className="font-light text-base"
          >
            Forgot Your Password?
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
