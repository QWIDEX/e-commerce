import React, { useEffect, useRef, useState } from "react";
import Filters from "../Filters/Filters";
import Catalog from "../Catalog/Catalog";
import { useNavigate, useParams } from "react-router";
import useTotalProductsCount from "../../hooks/useTotalProductsCount";
import useProducts from "../../hooks/useProducts";
import SwitchCatalogPage from "../../components/SwitchCatalogPage/SwitchCatalogPage";

const CatalogWithFilters = () => {
  const { pageParam } = useParams();
  const page = parseInt(pageParam || 1);


  // const filters = {
  //   typeFilters,
  //   priceFrom: minPriceFilter === 0 ? undefined : minPriceFilter,
  //   priceTo: maxPriceFilter === maxPrice ? undefined : maxPriceFilter,
  // };

  // const productsMaxFind = useTotalProductsCount(filters);

  // const products = useProducts(
  //   (page - 1) * showedCards,
  //   page * showedCards >= productsMaxFind
  //     ? productsMaxFind
  //     : page * showedCards,
  //   [sortMethod, typeFilters, minPriceFilter, maxPriceFilter],
  //   sortMethod,
  //   filters
  // );


  return (
    <section>
      <Filters ></Filters>
      {/* <Catalog products={products}></Catalog> */}
      {/* <div className="flex gap-2 justify-center mt-5 items-center">
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
      </div> */}
    </section>
  );
};


export default CatalogWithFilters