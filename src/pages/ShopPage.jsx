import HeadingPathSect from "../components/Reusable/HeadingPathSect";
import "rc-slider/assets/index.css";
import CatalogWithFilters from "../components/CatalogWithFilters/CatalogWithFilters";
import ShopProductCard from "../components/ShopProductCard/ShopProductCard";
import BenefitsBlock from "../components/BenefitsBlock/BenefitsBlock";
import ShopRowProductCard from "../components/ShopProductCard/ShopRowProductCard";

const Shop = () => {
  return (
    <>
      <HeadingPathSect />
      <CatalogWithFilters ProductCard={ShopProductCard} RowProductCard={ShopRowProductCard}></CatalogWithFilters>
      <BenefitsBlock />
    </>
  );
};

export default Shop;
