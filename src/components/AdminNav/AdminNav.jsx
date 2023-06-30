import React from "react";
import { NavLink } from "react-router-dom";
import { useHref } from "react-router";

const AdminNav = () => {
  const href = useHref()

  return (
    <nav className="sm:w-1/3 w-full min-w-[200px] self-start max-w-xs h-fit border-[2px] rounded-lg border-gray-200 px-7 py-4">
      <ul className=" text-xl">
        <li className="my-4">
          <NavLink
            to={"/admin"}
            style={href === "/admin" ? {} : {backgroundColor: "transparent"}}
            className="px-3 py-2 w-full transition-all duration-300 hover:!bg-[#fbebb5] rounded-lg"
          >
            Products
          </NavLink>
        </li>
        <li className="my-4">
          <NavLink
            to={"/admin/orders"}
            className="px-3 py-2 w-full transition-all hover:bg-[#fbebb5] duration-300 rounded-lg"
          >
            Orders
          </NavLink>
        </li>
        <li className="my-4">
          <NavLink
            to={"/admin/users"}
            className="px-3 py-2 w-full transition-all hover:bg-[#fbebb5] duration-300 rounded-lg"
          >
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
