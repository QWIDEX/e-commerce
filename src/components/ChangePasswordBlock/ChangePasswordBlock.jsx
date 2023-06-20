import React, { useState, useRef } from "react";
import ForgotPassBlock from "../ForgotPassBlock/ForgotPassBlock";
import ClasicInput from "../Reusable/ClassicInput";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import ButtonOutline from "../Reusable/BtnOutline";

const ChangePasswordBlock = ({
  toggleChangePassword,
  passwordChangeRef,
  user,
}) => {
  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [consfirmNewPassword, setConfirmNewPassword] = useState("");

  const ConfirmNewPassInputRef = useRef();
  const [newPassShowing, setNewPassShowing] = useState(false);

  const [displayForgotPass, setDisplayForgotPass] = useState(false);
  const forgotPassRef = useRef();

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

  const handleChangePassword = async () => {
    if (oldPassword !== "") {
      if (newPassword !== consfirmNewPassword)
        toast.error("Passwords don't match");
      else {
        const credential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );

        let errror;

        await reauthenticateWithCredential(auth.currentUser, credential).catch(
          (err) => {
            errror = err;
            if (err.message === "Firebase: Error (auth/wrong-password).")
              toast.error("Wrong password");
            else if (
              err.message ===
              "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
            )
              toast.error(
                "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
                { duration: 7000 }
              );
          }
        );
        if (!errror) {
          updatePassword(auth.currentUser, newPassword)
            .then(() => toast.success("Password changed"))
            .catch((error) => {
              if (
                error.message ===
                "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
              )
                toast.error("Password has to be at least 6 characters long");
              else toast.error("Something went wrong, try again later");
            });
        }
      }
    } else toast.error("Write current password");
  };

  return (
    <div
      ref={passwordChangeRef}
      className="absolute w-full transition-all duration-300 hidden opacity-0 h-full top-0 left-0 justify-center items-center"
    >
      <button
        onClick={toggleChangePassword}
        className="absolute rounded-lg transition-all duration-300 bg-[rgba(0,0,0,0.3)] w-full h-full"
      ></button>
      <ForgotPassBlock
        forgotPassRef={forgotPassRef}
        handleForgotPass={handleForgotPass}
        initialEmail={user.email}
      />
      <form className="w-4/5 h-4/5 flex relative flex-col gap-7 p-5 z-10 rounded-lg bg-white">
        <button
          type="button"
          className="absolute top-[14px] left-2"
          onClick={toggleChangePassword}
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
        <h1 className="text-2xl font-semibold leading-normal text-center">
          Change Password
        </h1>
        <ClasicInput
          label="Old password"
          type="password"
          value={oldPassword}
          name="password"
          onChange={setOldPassword}
        />
        <ClasicInput
          label="New password"
          type="password"
          value={newPassword}
          name="newPassword"
          onChange={setNewPassword}
        />
        <label className="flex w-full flex-col gap-5 max-w-sm relative">
          <h3 className="font-medium text-[20px] leading-normal">
            Confirm new password
          </h3>
          <input
            ref={ConfirmNewPassInputRef}
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Password"
            name="confirmNewPassword"
            className="border border-black border-solid text-base w-full py-3 px-4 rounded-lg"
          />
          <button
            type="button"
            onClick={() => {
              if (newPassShowing)
                ConfirmNewPassInputRef.current.type = "password";
              else ConfirmNewPassInputRef.current.type = "text";
              setNewPassShowing(!newPassShowing);
            }}
            className="absolute bottom-[13px] right-3"
          >
            {newPassShowing ? (
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
        <div className="flex justify-around">
          <button
            type="button"
            onClick={handleForgotPass}
            className="font-light text-base"
          >
            Forgot Your Password?
          </button>
          <ButtonOutline
            type="button"
            className="self-center"
            onClick={handleChangePassword}
          >
            Update Password
          </ButtonOutline>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordBlock;
