import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import { Toaster } from "react-hot-toast";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

let firstRender = true;

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!firstRender && !user) navigate("/auth");
    else firstRender = false;
  }, [user]);

  return (
    <>
      <MiniHeadingPathSect label="Profile" />
      {!user ? (
        <LoadingIndicator className="h-[100dvh]" />
      ) : (
        <div className="md:px-20 xl:flex-row flex-col items-center px-2 sm-sm:px-8 gap-7 flex justify-between">
          <ProfileNav />
          <div className="w-full relative shadow-md min-h-[75vh] border-[2px] rounded-lg border-gray-200 p-5">
            <Outlet />
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
};

export default ProfilePage;
