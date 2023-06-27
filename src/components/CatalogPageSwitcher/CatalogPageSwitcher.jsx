import React from "react";
import SwitchCatalogPage from "../SwitchCatalogPage/SwitchCatalogPage";

const CatalogPageSwitcher = ({ page, productsMaxFind, showedCards }) => {
  return (
    <div className="flex gap-2 justify-center mt-5 items-center">
      {page - 1 !== 0 ? <SwitchCatalogPage>{page - 1}</SwitchCatalogPage> : ""}
      <SwitchCatalogPage>{page}</SwitchCatalogPage>
      <SwitchCatalogPage disabled={productsMaxFind <= page * showedCards}>
        {page + 1}
      </SwitchCatalogPage>
      <SwitchCatalogPage disabled={productsMaxFind <= (page + 1) * showedCards}>
        {page + 2}
      </SwitchCatalogPage>
      <SwitchCatalogPage disabled={productsMaxFind <= page * showedCards}>
        {"Next"}
      </SwitchCatalogPage>
    </div>
  );
};

export default CatalogPageSwitcher;
