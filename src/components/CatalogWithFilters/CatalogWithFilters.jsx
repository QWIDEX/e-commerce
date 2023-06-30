import React from "react";
import Filters from "../Filters/Filters";
import Catalog from "../Catalog/Catalog";
import { useParams } from "react-router";
import useTotalProductsCount from "../../hooks/useTotalProductsCount";
import useProducts from "../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import CatalogPageSwitcher from "../CatalogPageSwitcher/CatalogPageSwitcher";

const CatalogWithFilters = ({ ProductCard, additionalDeps }) => {
  const { pageParam } = useParams();
  const page = parseInt(pageParam || 1);
  const [searchParams] = useSearchParams();

  const showedCards = searchParams.get("showedCards") || 16;
  const sortMethod = searchParams.get("sortMethod") || "ordered";
  const typeFilters = searchParams.get("typeFilters")?.split(",") || [];
  const minPriceFilter = searchParams.get("from");
  const maxPriceFilter = searchParams.get("to");

  const filters = {
    typeFilters,
    priceFrom: minPriceFilter,
    priceTo: maxPriceFilter,
  };

  const productsMaxFind = useTotalProductsCount(filters);

  const from = (page - 1) * showedCards;
  const to =
    page * showedCards >= productsMaxFind
      ? productsMaxFind
      : page * showedCards;

  const productsState = useProducts(
    from,
    to,
    [sortMethod, typeFilters, minPriceFilter, maxPriceFilter, additionalDeps],
    sortMethod,
    filters
  );

  return (
    <section>
      <div className="relative  overflow-hidden h-full">
        <Filters
          productsLength={productsState.products.length}
          productsMaxFind={productsMaxFind}
          showedCards={showedCards}
        ></Filters>
        <Catalog
          productsState={productsState}
          ProductCard={ProductCard}
        ></Catalog>
      </div>
      <CatalogPageSwitcher
        page={page}
        productsMaxFind={productsMaxFind}
        showedCards={showedCards}
      />
    </section>
  );
};

export default CatalogWithFilters;
