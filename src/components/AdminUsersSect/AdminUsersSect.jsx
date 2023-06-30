import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const AdminUsersSect = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((orders) => {
        setLoading(false);
        setUsers(orders);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleAccesLevel = (uid, accesLevel) => {
    const userRef = doc(db, `/users/${uid}`);
    updateDoc(userRef, { accesLevel })
      .then(() => {
        const updatedUsers = [...users]
        const idx = users.findIndex((user) => user.uid === uid)
        updatedUsers[idx] = {...users[idx], accesLevel}
        setUsers(updatedUsers)
        toast.success("Successfully updated");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  if (error) return <ErrorIndicator />;
  else if (loading) return <LoadingIndicator />;
  else
    return (
      <div>
        {users.map((user) => (
          <UserCard handleAccesLevel={handleAccesLevel} user={user} key={user.uid} />
        ))}
      </div>
    );
};

export default AdminUsersSect;

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
          <div className="flex gap-2">
            <h1 className="font-medium text-base">User: </h1>
            {firstName} {lastName}
          </div>
          <div className="flex gap-2">
            <h1 className="font-medium text-base">User Id: </h1>
            {uid}
          </div>
          <div className="flex items-center gap-2">
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
            <img
              src={avatar}
              alt="avatar"
              className="rounded-full aspect-square w-14"
            />
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

const getUsers = async () => {
  const usersCollRef = collection(db, "/users");
  const users = (await getDocs(usersCollRef)).docs;

  const usersFull = await Promise.all(
    users.map(async (user) => {
      const userAvatarRef = ref(storage, `images/users/avatars/${user.id}`);
      let userAvatar;
      userAvatar = await getDownloadURL(userAvatarRef).catch(
        () => (userAvatar = undefined)
      );

      return { ...user.data(), avatar: userAvatar, uid: user.id };
    })
  );

  return usersFull;
};
