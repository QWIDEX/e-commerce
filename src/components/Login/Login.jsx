import React, { useState } from "react";
import ButtonOutline from "../Reusable/BtnOutline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    else {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential);
            console.log(userCredential.user);
        }).catch((error) => {
            console.log(error.message)
            toast.error(error.message)
        })
    }
  };

  return (
    <div className="py-9 flex flex-col gap-7 w-1/2 px-20 max-w-xl pr-24">
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
        <ButtonOutline onClick={handleLogin}>Log In</ButtonOutline>
        <button className="font-light text-base">Forgot Your Password?</button>
      </div>
    </div>
  );
};

export default Login;
