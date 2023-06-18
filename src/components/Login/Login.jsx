import React, { useState } from "react";
import ButtonOutline from "../Reusable/BtnOutline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import getUserData from "../../helpers/getUserData";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    if (!password) toast.error("Write down password please");
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Successfully logged in");
          
          dispatch((dispatch) => {  
            getUserData(userCredential.user.uid).then((user) => {
              dispatch(setUser(user));
            });
          });
        })
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
      className="py-9 flex flex-col gap-7 w-1/2 px-20 max-w-xl pr-24"
    >
      <h1 className="font-semibold text-4xl leading-normal">Log In</h1>
      <label className="flex flex-col gap-5">
        <h3 className="font-medium text-2xl leading-normal">Email address</h3>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
        />
      </label>
      <label className="flex flex-col gap-5">
        <h3 className="font-medium text-2xl leading-normal">Password</h3>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
        />
      </label>
      <div className=" flex flex-wrap gap-8">
        <ButtonOutline type={"submit"}>Log In</ButtonOutline>
        <button className="font-light text-base">Forgot Your Password?</button>
      </div>
    </form>
  );
};

export default Login;
