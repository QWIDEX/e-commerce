import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import AdminNav from "../components/AdminNav/AdminNav";

const AdminPage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const waitingForData = setTimeout(() => {
      if (!user) navigate("/auth")
    }, 5000)
    
    if (user?.accesLevel !== "admin" && user) navigate("/")

    return () => {
      clearTimeout(waitingForData)
    }
  }, [user]);

  return (
    <>
      <MiniHeadingPathSect label="Administration" />
      {!user ? (
        <LoadingIndicator className="h-[100dvh]" />
      ) : (
        <div className="md:px-20 xl:flex-row flex-col items-center px-2 sm-sm:px-8 gap-7 flex justify-between">
          <AdminNav />
          <div className="w-full relative shadow-md min-h-[75vh] border-[2px] rounded-lg border-gray-200 p-5">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
