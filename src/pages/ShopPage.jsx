import HeadingPathSect from "../components/Reusable/HeadingPathSect";
import "rc-slider/assets/index.css";
import CatalogWithFilters from "../components/CatalogWithFilters/CatalogWithFilters";
import ShopProductCard from "../components/ShopProductCard/ShopProductCard";

const Shop = () => {
  return (
    <>
      <HeadingPathSect />
      <CatalogWithFilters ProductCard={ShopProductCard}></CatalogWithFilters>
    </>
  );
};

export default Shop;
