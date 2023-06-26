import React from "react";
import Catalog from "../Catalog/Catalog";
import ShopProductCard from "../ShopProductCard/ShopProductCard";
import { useParams } from "react-router";
import SwitchCatalogPage from "../../components/SwitchCatalogPage/SwitchCatalogPage";
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
      <div className="flex gap-2 justify-center mt-5 items-center">
        {page - 1 !== 0 ? (
          <SwitchCatalogPage>{page - 1}</SwitchCatalogPage>
        ) : (
          ""
        )}
        <SwitchCatalogPage>{page}</SwitchCatalogPage>
        <SwitchCatalogPage disabled={products.products.length <= page * 16}>
          {page + 1}
        </SwitchCatalogPage>
        <SwitchCatalogPage
          disabled={products.products.length <= (page + 1) * 16}
        >
          {page + 2}
        </SwitchCatalogPage>
        <SwitchCatalogPage disabled={products.products.length <= page * 16}>
          {"Next"}
        </SwitchCatalogPage>
      </div>
    </div>
  );
};

export default FavoritesSect;
