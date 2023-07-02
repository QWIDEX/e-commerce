import React, { useState, useRef } from "react";


const MessageCard = ({ contactReq, handleMessageStatus }) => {
  const { message, name, subject, user, answered, email, messageId } =
    contactReq;

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
        <div className="flex gap-7 relative items-center flex-wrap">
          <div
            style={
              answered
                ? { backgroundColor: "#22c55e" }
                : { backgroundColor: "yellow" }
            }
            className="absolute transition-all duration-300 h-[110%] top-1/2 -translate-y-1/2 -left-4 w-2 rounded-full"
          ></div>
          <div>
            <div className="flex flex-wrap gap-2">
              <h1 className="font-medium text-base">Subject: </h1>
              {subject}
            </div>
            <p className="text-[#9F9F9F]">
              Answered: {answered ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <h1 className="font-medium text-base">Name: </h1>
            {name}
          </div>
          <div className="flex flex-wrap gap-2">
            <h1 className="font-medium text-base">Email: </h1>
            {email}
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-base">Answered:</h1>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              onClick={(e) => e.stopPropagation()}
              value={answered ? "true" : "false"}
              onChange={(e) => handleMessageStatus(messageId, e.target.value)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
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
        <div className=" flex flex-col gap-5">
          <div>
            <h3 className="font-medium text-lg ">Message:</h3>
            <p className="p-2 w-full border-gray-300 border rounded-lg">
              {message}
            </p>
          </div>
          <div className="w-fit mb-5">
            <h3 className="font-medium text-lg ">User</h3>
            <div>
              <h4 className="w-fit inline-block font-medium">Name:</h4>{" "}
              <span>{name}</span>
            </div>
            <div>
              <h4 className="w-fit inline-block font-medium">Email:</h4>{" "}
              <span>{email}</span>
            </div>
            <div>
              <h4 className="w-fit inline-block font-medium">User Id:</h4>{" "}
              <span>{user.uid}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageCard;
