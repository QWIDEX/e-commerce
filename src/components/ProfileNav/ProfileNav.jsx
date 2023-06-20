import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

const ProfileNav = () => {
  const { subpage } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="sm:w-1/3 w-full min-w-[200px] max-w-xs h-fit border-[2px] rounded-lg border-gray-200 px-7 py-4">
      <ul className=" text-xl">
        <li className="my-4">
          <NavLink
            to={"/profile"}
            style={subpage ? { backgroundColor: "transparent" } : {}}
            className="px-3 py-2 w-full transition-all duration-300 hover:bg-[#f7e7b3] rounded-lg"
          >
            Profile
          </NavLink>
        </li>
        <li className="my-4">
          <NavLink
            to={"/profile/orders"}
            className="px-3 py-2 w-full transition-all duration-300 rounded-lg"
          >
            My Orders
          </NavLink>
        </li>
        <li className="my-4">
          <NavLink
            to={"/profile/favorites"}
            className="px-3 py-2 w-full transition-all duration-300 rounded-lg"
          >
            Favorites
          </NavLink>
        </li>
        <li className="my-4">
          <button
            onClick={() => {
              signOut(auth);
              dispatch(setUser(undefined));
              navigate("/auth");
            }}
            className="px-3 py-2 w-full transition-all duration-300 hover:bg-red-300 bg-red-200 rounded-lg"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNav;
