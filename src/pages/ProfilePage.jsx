import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import ProfileSect from "../components/ProfileSect/ProfileSect";
import { Toaster } from "react-hot-toast";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

let firstRender = true;

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const { subpage } = useParams();

  useEffect(() => {
    if (!firstRender && !user) navigate("/auth");
    else firstRender = false;
  }, [user]);

  return (
    <>
      <MiniHeadingPathSect label="Profile" />
      {!user ? (
        <LoadingIndicator className='h-[100dvh]' />
      ) : (
        <div className="px-20 gap-10 flex justify-between">
          <ProfileNav />
          <div className="w-full relative shadow-md border-[2px] rounded-lg border-gray-200 p-5">
            {subpage === undefined ? <ProfileSect /> : <></>}
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
};

export default ProfilePage;
