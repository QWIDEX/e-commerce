import React, { useRef, useState } from "react";
import ButtonOutline from "../Reusable/BtnOutline";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passShowing, setPassShowing] = useState(false);

  const handleRegister = () => {
    if (!firstName)
      toast.error("You need to write your first name to continue");
    else if (!lastName)
      toast.error("You need to write your last name to continue");
    else if (password !== confirmPassword) toast.error("Passwords don't match");
    else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => toast.success("You successfully signed up"))
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/email-already-in-use).")
            toast.error("Email is already in use");
        });
    }
  };

  const confirmPassRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
      className="py-9 w-full relative flex flex-col gap-7 sm:w-1/2 lg:px-17 md:px-15 xl:px-20 max-w-xl md:pr-12 lg-sm:pr-14 lg:pr-16 xl:pr-24"
    >
      <h1 className="font-semibold text-4xl leading-normal">Sign up</h1>
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-5">
          <h3 className="font-medium text-2xl leading-normal">First name</h3>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstName"
            className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-5">
          <h3 className="font-medium text-2xl leading-normal">Last name</h3>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastName"
            className="border border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
          />
        </label>
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
        <label className="flex relative flex-col gap-5">
          <h3 className="font-medium text-2xl leading-normal">
            Confirm password
          </h3>
          <input
            ref={confirmPassRef}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
            className="border inline-block border-black border-solid text-lg w-full py-3 px-4 rounded-lg"
          />
          <button
            type="button"
            onClick={() => {
              if (passShowing) confirmPassRef.current.type = "password";
              else confirmPassRef.current.type = "text";
              setPassShowing(!passShowing);
            }}
            className="absolute bottom-[15px] right-3"
          >
            {passShowing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z"
                />
              </svg>
            )}
          </button>
        </label>
        <ButtonOutline className="self-center" type={"submit"}>
          Register
        </ButtonOutline>
      </div>
    </form>
  );
};

export default Register;
