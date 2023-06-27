import React from "react";
import Catalog from "../Catalog/Catalog";
import ShopProductCard from "../ShopProductCard/ShopProductCard";
import { useParams } from "react-router";
import CatalogPageSwitcher from "../CatalogPageSwitcher/CatalogPageSwitcher";
import useFavorites from "../../hooks/useFavorites";

const FavoritesSect = () => {
  const { pageParam } = useParams();
  const page = parseInt(pageParam || 1);

  const products = useFavorites();

  const from = (page - 1) * 16;
  const to =
    page * 16 >= products.products.length
      ? products.products.length
      : page * 16;

  return (
    <div className="flex flex-col !min-h-[70vh] justify-between">
      <Catalog
        productsState={{
          ...products,
          products: products.products.slice(from, to),
        }}
        ProductCard={ShopProductCard}
      />
      <CatalogPageSwitcher
        page={page}
        showedCards={16}
        productsMaxFind={products.products.length}
      />
    </div>
  );
};

export default FavoritesSect;
