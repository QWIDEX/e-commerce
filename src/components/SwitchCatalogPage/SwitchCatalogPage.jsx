import { NavLink, useParams } from "react-router-dom";
import "./SwitchCatalogPage.css";

const SwitchCatalogPage = ({ children, disabled }) => {
  const { pageParam } = useParams();

  let page = pageParam || 1;

  if (children === "Next") {
    page = Number(page) + 1;
  } else if (children === 1) {
    page = undefined;
  } else {
    page = children;
  }
  const handleNavLink = (e) => {
    if (disabled) e.preventDefault()
  }

  return (
    <NavLink
      onClick={handleNavLink}
      to={`/shop/${page || ""}${window.location.search}`}
      style={disabled ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : {}}
      className={`py-4 px-6 bg-[#FFF9E6] w-min rounded-lg cursor-pointer font-normal text-xl`}
    >
      {children}
    </NavLink>
  );
};

export default SwitchCatalogPage;
