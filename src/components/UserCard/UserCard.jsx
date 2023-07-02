import React, { useState, useRef } from "react";

const UserCard = ({ user, handleAccesLevel }) => {
  const {
    firstName,
    lastName,
    uid,
    accesLevel,
    city,
    country,
    street,
    zipCode,
    phoneNumber,
    email,
    avatar,
  } = user;

  const [displayedFullInfo, setDisplayedFullInfo] = useState(false);

  const fullInfoRef = useRef();

  const handleShowFullInfo = () => {
    if (displayedFullInfo) {
      fullInfoRef.current.style.height = "0px";
      fullInfoRef.current.style.paddingBottom = "0px";
    } else {
      fullInfoRef.current.style.height = `${
        fullInfoRef.current.scrollHeight + 20
      }px`;
      fullInfoRef.current.style.paddingBottom = "20px";
    }

    setDisplayedFullInfo(!displayedFullInfo);
  };

  return (
    <div className="border border-gray-300 overflow-hidden rounded-lg shadow-md">
      <div
        onClick={handleShowFullInfo}
        className="flex px-10 py-5 justify-between items-center"
      >
        <div className="flex gap-7 items-center flex-wrap">
          <div className="flex flex-wrap gap-2">
            <h1 className="font-medium text-base">User: </h1>
            {firstName} {lastName}
          </div>
          <div className="flex flex-wrap gap-2">
            <h1 className="font-medium text-base">User Id: </h1>
            {uid}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-medium text-base">Acces Level:</h1>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              onClick={(e) => e.stopPropagation()}
              value={accesLevel}
              onChange={(e) => handleAccesLevel(user.uid, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button>
          {displayedFullInfo ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1024 1024"
            >
              <g transform="rotate(180 512 512)">
                <path
                  fill="currentColor"
                  d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
                />
              </g>
            </svg>
          )}
        </button>
      </div>
      <div
        className="h-0 px-5 md:px-10 flex-col flex gap-5 overflow-y-hidden transition-all duration-300 w-full"
        ref={fullInfoRef}
      >
        <div>
          <div className="w-fit mb-5">
            <h3 className="font-medium text-lg ">User</h3>
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="rounded-full aspect-square w-14"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
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
            )}

            <div>
              <h4 className="w-fit inline-block font-medium">Name:</h4>{" "}
              <span>{`${lastName} ${firstName}`}</span>
            </div>
            <div>
              <h4 className="w-fit inline-block font-medium">Email:</h4>{" "}
              <span>{email}</span>
            </div>
            <div>
              <h4 className="w-fit inline-block font-medium">Phone number:</h4>{" "}
              <span>{phoneNumber}</span>
            </div>
          </div>
          <div className="w-fit mb-5">
            <h3 className="font-medium text-lg ">Living Place</h3>
            <div>
              <h4 className="w-fit inline-block font-medium">Place:</h4>{" "}
              <span>{`${country}, ${city}, ${street}`}</span>
            </div>
            <div>
              <h4 className="w-fit inline-block font-medium">ZIP Code:</h4>{" "}
              <span>{zipCode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
