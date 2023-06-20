import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonOutline from "../Reusable/BtnOutline";
import ButtonOutlineBtm from "../Reusable/BtnOutlineBtm";
import { toast } from "react-hot-toast";
import updateUser from "../../helpers/updateUser";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import getUserData from "../../helpers/getUserData";
import { setUser } from "../../store/slices/userSlice";
import ClasicInput from "../Reusable/ClassicInput";
import ChangePasswordBlock from "../ChangePasswordBlock/ChangePasswordBlock";

const ProfileSect = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [passwordChangeToggled, setPasswordChangeToggled] = useState(false);
  const [emailVerified, setEmailVerified] = useState(user.emailVerified);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [street, setStreet] = useState(user?.street || "");
  const [zipCode, setZipConde] = useState(user?.zipCode || "");
  const [avatar, setAvatar] = useState([user?.avatar, undefined]);

  const handleSubmit = () => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm))
      toast.error("Email isn't valid");
    else {
      updateUser(
        {
          firstName,
          lastName,
          phoneNumber,
          city,
          country,
          street,
          zipCode,
          email,
          avatar: avatar[1],
        },
        user
      )
        .then(() => {
          toast.success("Successfully updated");
          dispatch((dispatch) => {
            getUserData(auth.currentUser).then((user) => {
              dispatch(setUser(user));
            });
          });
        })
        .catch((error) => {
          toast.error("Something went wrong, try again later");
          console.error(error);
        });
    }
  };

  const handleVerifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("Mail sent");
        setEmailVerified(true);
      })
      .catch(() => toast.error("Something went wrong, try again later"));
  };

  const passwordChangeRef = useRef();

  const toggleChangePassword = () => {
    if (passwordChangeToggled) {
      passwordChangeRef.current.style.opacity = "0";
      passwordChangeRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        passwordChangeRef.current.style.display = "none";
      }, 300);
    } else {
      passwordChangeRef.current.style.display = "flex";
      setTimeout(() => {
        passwordChangeRef.current.style.pointerEvents = "auto";
        passwordChangeRef.current.style.opacity = "1";
      }, 300);
    }
    setPasswordChangeToggled(!passwordChangeToggled);
  };

  return (
    <>
      {!emailVerified ? (
        <div className="flex bg-[#faf4f4] items-center mb-5 justify-between px-5 py-4 rounded-lg">
          <h1 className="w-fit">
            We need to verify your email before you can buy something
          </h1>
          <button
            onClick={handleVerifyEmail}
            className="bg-green-300 hover:bg-green-400 transition-all duration-300 py-2 px-3 rounded-lg"
          >
            Verify Email
          </button>
        </div>
      ) : (
        <></>
      )}
      <ChangePasswordBlock
        passwordChangeRef={passwordChangeRef}
        toggleChangePassword={toggleChangePassword}
        user={user}
      />
      <h1 className="text-2xl font-semibold leading-normal text-center">
        Profile Settings
      </h1>
      <label className="block w-fit mx-auto mt-2 mb-5">
        <input
          type="file"
          onChange={(e) =>
            setAvatar([
              URL.createObjectURL(e.target.files[0]),
              e.target.files[0],
            ])
          }
          name="avatar"
          className="hidden"
        />
        {avatar[0] ? (
          <img
            src={avatar[0]}
            className="rounded-full mx-auto block h-[70px] w-[70px]"
            alt=""
          />
        ) : (
          <div className="rounded-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z" />
                <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
              </g>
            </svg>
          </div>
        )}
      </label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-5 items-center"
      >
        <div className="flex gap-7 w-full justify-center">
          <ClasicInput
            label={"First name"}
            onChange={setFirstName}
            value={firstName}
            name={"firstName"}
          />
          <ClasicInput
            label={"Last name"}
            onChange={setLastName}
            value={lastName}
            name={"lastName"}
          />
        </div>
        <div className="flex gap-7 justify-center w-full">
          <ClasicInput
            label={"Email adress"}
            onChange={setEmail}
            type="email"
            value={email}
            name={"email"}
          />
          <ClasicInput
            label={"Phone number"}
            onChange={setPhoneNumber}
            type="tel"
            value={phoneNumber}
            name={"phoneNumber"}
          />
        </div>
        <div className="flex gap-7 justify-center w-full">
          <ClasicInput
            label={"Country"}
            onChange={setCountry}
            value={country}
            name={"country"}
          />
          <ClasicInput
            label={"City"}
            onChange={setCity}
            value={city}
            name={"city"}
          />
        </div>
        <div className="flex gap-7 justify-center w-full">
          <ClasicInput
            label={"Street address"}
            onChange={setStreet}
            value={street}
            name={"street"}
          />
          <ClasicInput
            label={"ZIP code"}
            onChange={setZipConde}
            value={zipCode}
            name={"zipCode"}
          />
        </div>
        <div className="flex w-4/5 justify-between mx-auto">
          <ButtonOutlineBtm
            className="text-xl pb-0"
            onClick={toggleChangePassword}
            type="button"
          >
            Change Password
          </ButtonOutlineBtm>
          <ButtonOutline type="submit">Save Changes</ButtonOutline>
        </div>
      </form>
    </>
  );
};

export default ProfileSect;
