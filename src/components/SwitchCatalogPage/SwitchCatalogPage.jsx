import { NavLink, useParams } from "react-router-dom";
import "./SwitchCatalogPage.css";

const SwitchCatalogPage = ({ children }) => {
  const { pageParam } = useParams()
  let page = pageParam || 1
  const objectOfParams = {};

  if (children === "Next") {
    page = Number(page) + 1
  } else if (children === 1) {
    page = undefined
  } else {
    page = children
  }

  return (
    <NavLink
      to={`/shop/${page || ""}`}
      className={`py-4 px-6 bg-[#FFF9E6] w-min rounded-lg cursor-pointer font-normal text-xl`}
    >
      {children}
    </NavLink>
  );
};

export default SwitchCatalogPage;
