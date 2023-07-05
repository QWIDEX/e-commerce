import { updateDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import getUsers from "../../helpers/getUsers";
import UserCard from "../UserCard/UserCard";
import { useSearchParams } from "react-router-dom";
import getUserData from "../../helpers/getUserData";
import mergeSearchParams from "../../helpers/mergeSearchParams";

const AdminUsersSect = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const userId = searchParams.get("userId");

      if (!userId) {
        getUsers()
          .then((users) => {
            setLoading(false);
            setUsers(users);
          })
          .catch(() => {
            toast.error("Something went wrong");
            setError(true);
            setLoading(false);
          });
      } else {
        getUserData({ uid: userId })
          .then((user) => {
            if (user.email === undefined) toast.error("Not found");
            else {
              setUsers([user]);
            }
            setLoading(false);
          })
          .catch(() => {
            toast.error("Something went wrong");
            setError(true);
            setLoading(false);
          });
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchParams]);

  const handleAccesLevel = (uid, accesLevel) => {
    const userRef = doc(db, `/users/${uid}`);
    updateDoc(userRef, { accesLevel })
      .then(() => {
        const updatedUsers = [...users];
        const idx = users.findIndex((user) => user.uid === uid);
        updatedUsers[idx] = { ...users[idx], accesLevel };
        setUsers(updatedUsers);
        toast.success("Successfully updated");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  if (error) return <ErrorIndicator />;
  else if (loading) return <LoadingIndicator />;
  else
    return (
      <>
        <h1 className="text-3xl mb-5 font-semibold leading-normal text-center">
          Users
        </h1>
        <div className="flex gap-7 flex-wrap  mb-5">
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-base">User Id:</h1>
            <input
              type="text"
              value={searchParams.get("userId") || ""}
              onChange={(e) =>
                setSearchParams(
                  mergeSearchParams(searchParams, { userId: e.target.value })
                )
              }
              placeholder="User Id"
              name="userId"
              className={
                "border border-gray-300 border-solid text-base w-[26ch] py-3 px-4 rounded-lg"
              }
            />
          </div>
        </div>

        <div>
          {users.length === 0 ? (
            <div className="justify-center flex items-center w-full h-full">
              <h1 className="text-xl font-semibold">
                Seems like nobody registred yet
              </h1>
            </div>
          ) : (
            <></>
          )}
          {users.map((user) => (
            <UserCard
              handleAccesLevel={handleAccesLevel}
              user={user}
              key={user.uid}
            />
          ))}
        </div>
      </>
    );
};

export default AdminUsersSect;
