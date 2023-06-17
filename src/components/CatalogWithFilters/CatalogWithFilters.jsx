import React from "react";
import Filters from "../Filters/Filters";
import Catalog from "../Catalog/Catalog";
import { useParams } from "react-router";
import useTotalProductsCount from "../../hooks/useTotalProductsCount";
import useProducts from "../../hooks/useProducts";
import SwitchCatalogPage from "../../components/SwitchCatalogPage/SwitchCatalogPage";
import { useSearchParams } from "react-router-dom";

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
      <div className="relative h-full">
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

      <div className="flex gap-2 justify-center mt-5 items-center">
        {page - 1 !== 0 ? (
          <SwitchCatalogPage>{page - 1}</SwitchCatalogPage>
        ) : (
          ""
        )}
        <SwitchCatalogPage>{page}</SwitchCatalogPage>
        <SwitchCatalogPage disabled={productsMaxFind <= page * showedCards}>
          {page + 1}
        </SwitchCatalogPage>
        <SwitchCatalogPage
          disabled={productsMaxFind <= (page + 1) * showedCards}
        >
          {page + 2}
        </SwitchCatalogPage>
        <SwitchCatalogPage disabled={productsMaxFind <= page * showedCards}>
          {"Next"}
        </SwitchCatalogPage>
      </div>
    </section>
  );
};

export default CatalogWithFilters;
