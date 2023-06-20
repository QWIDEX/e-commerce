import HeadingPathSect from "../components/Reusable/HeadingPathSect";
import "rc-slider/assets/index.css";
import CatalogWithFilters from "../components/CatalogWithFilters/CatalogWithFilters";
import ShopProductCard from "../components/ShopProductCard/ShopProductCard";
import BenefitsBlock from "../components/BenefitsBlock/BenefitsBlock";
import { Toaster } from "react-hot-toast";

const Shop = () => {
  return (
    <>
      <HeadingPathSect />
      <CatalogWithFilters ProductCard={ShopProductCard}></CatalogWithFilters>
      <BenefitsBlock />
      <Toaster />
    </>
  );
};

export default Shop;
