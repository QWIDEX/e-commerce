import React, { useEffect, useRef, useState } from "react";
import HeadingPathSect from "../components/Reusable/HeadingPathSect";
import SwitchCatalogPage from "../components/SwitchCatalogPage/SwitchCatalogPage";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Reusable/ProductCard";
import useProducts from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import mergeSearchParams from "../helpers/mergeSearchParams";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useMaxfieldValue from "../hooks/useMaxFieldValue";
import useTotalProductsCount from "../hooks/useTotalProductsCount";

const Shop = () => {
  const { pageParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(pageParam || 1);
  const navigate = useNavigate();

  const [filtersOpened, setFilters] = useState(false);
  const dispatch = useDispatch();

  const [cardStyle, setCardStyle] = useState(
    searchParams.get("cardStyle") || "blocks"
  );
  const [sortMethod, setSortMethod] = useState(
    searchParams.get("sortMethod") || "ordered"
  );
  const [showedCards, setShowedCards] = useState(
    searchParams.get("showedCards") || "16"
  );
  const [typeFilters, setTypeFilters] = useState(
    searchParams.get("typeFilters")?.split(",") || []
  );

  const maxPrice = useMaxfieldValue("price");
  const [minPriceFilter, setMinPriceFilter] = useState(
    parseInt(searchParams.get("from")) || 0
  );
  const [maxPriceFilter, setMaxPriceFilter] = useState(
    parseInt(searchParams.get("to")) || 300000
  );

  useEffect(() => {
    if (
      maxPriceFilter === 300000 &&
      300000 !== searchParams.get("to") &&
      maxPrice
    ) {
      setMaxPriceFilter(maxPrice);
    }
  }, [maxPrice]);

  const filters = {
    typeFilters,
    priceFrom: minPriceFilter === 0 ? undefined : minPriceFilter,
    priceTo: maxPriceFilter === maxPrice ? undefined : maxPriceFilter,
  };

  const productsMaxFind = useTotalProductsCount(filters);

  const products = useProducts(
    (page - 1) * showedCards,
    page * showedCards >= productsMaxFind
      ? productsMaxFind
      : page * showedCards,
    [sortMethod, typeFilters, minPriceFilter, maxPriceFilter],
    sortMethod,
    filters
  );

  // const page = page - 1 === 0 ? page + 1 : page;

  function toggleFilters() {
    if (filtersOpened) {
      setFilters(false);
      filtersBlock.current.style.left = `-${filtersBlock.current.offsetWidth}px`;
      hideFilters.current.style.transitionDelay = "0ms";
      hideFilters.current.style.opacity = "0";
      hideFilters.current.style.zIndex = "-1";
    } else {
      hideFilters.current.style.transitionDelay = "300ms";
      hideFilters.current.style.opacity = "1";
      filtersBlock.current.style.left = "0";
      hideFilters.current.style.zIndex = "2";
      setFilters(true);
    }
  }

  function handleSortMethod(e) {
    const sortMethod = e.target.value;
    setSortMethod(sortMethod);
    navigate(
      `/shop/?${mergeSearchParams(searchParams, { sortMethod: sortMethod })}`,
      { replace: true }
    );
  }

  function handleShowedCards(e) {
    const showedCards = e.target.value;
    if (showedCards >= 20) {
      setShowedCards(20);
      setSearchParams(mergeSearchParams(searchParams, { showedCards: 20 }));
    } else {
      setShowedCards(showedCards);
      navigate(
        `/shop/?${mergeSearchParams(searchParams, {
          showedCards: showedCards,
        })}`,
        { replace: true }
      );
    }
  }

  function handleTypeFilter(e) {
    const type = e.target.name;
    const typesParam = searchParams.get("typeFilters")
      ? searchParams.get("typeFilters").split(",")
      : [];
    let typesUpdated;

    if (e.target.checked) {
      typesUpdated = [...typesParam, type];
    } else {
      const typeIdx = typesParam.indexOf(type);
      typesUpdated = [
        ...typesParam.slice(0, typeIdx),
        ...typesParam.slice(typeIdx + 1),
      ];
    }

    setTypeFilters(typesUpdated);

    if (typesUpdated.length === 0) typesUpdated = undefined;

    navigate(
      `/shop/?${mergeSearchParams(searchParams, {
        typeFilters: typesUpdated,
      })}`,
      { replace: true }
    );
  }

  const filtersBlock = useRef(null);
  const hideFilters = useRef(null);

  const handleRangeChange = (values) => {
    setMinPriceFilter(values[0]);
    setMaxPriceFilter(values[1]);
    setSearchParams(
      mergeSearchParams(searchParams, {
        from: values[0],
        to: values[1] === maxPrice ? undefined : values[1],
      })
    );
  };
  return (
    <>
      <HeadingPathSect />
      <section>
        <div className="bg-[#FAF4F4] w-full flex justify-between py-5 px-[10%]">
          <div className="flex items-center flex-wrap">
            <div className="pl-5 flex justify-around gap-6 after:bg-[transparent] after:w-0.5 sm-sm:after:bg-[#9f9f9f] ">
              <button
                type="button"
                onClick={toggleFilters}
                className="flex items-center h-7 font-normal text-xl"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 25 25"
                  className="pr-2 inline"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.0238 7.14286H8.92858M6.54763 7.14286H2.9762M22.0238 19.0476H8.92858M6.54763 19.0476H2.9762M16.0714 13.0952H2.9762M22.0238 13.0952H18.4524M7.7381 4.76191C8.05384 4.76191 8.35664 4.88733 8.5799 5.11059C8.80315 5.33385 8.92858 5.63665 8.92858 5.95238V8.33333C8.92858 8.64907 8.80315 8.95187 8.5799 9.17513C8.35664 9.39839 8.05384 9.52381 7.7381 9.52381C7.42237 9.52381 7.11957 9.39839 6.89631 9.17513C6.67305 8.95187 6.54763 8.64907 6.54763 8.33333V5.95238C6.54763 5.63665 6.67305 5.33385 6.89631 5.11059C7.11957 4.88733 7.42237 4.76191 7.7381 4.76191ZM7.7381 16.6667C8.05384 16.6667 8.35664 16.7921 8.5799 17.0153C8.80315 17.2386 8.92858 17.5414 8.92858 17.8571V20.2381C8.92858 20.5538 8.80315 20.8566 8.5799 21.0799C8.35664 21.3031 8.05384 21.4286 7.7381 21.4286C7.42237 21.4286 7.11957 21.3031 6.89631 21.0799C6.67305 20.8566 6.54763 20.5538 6.54763 20.2381V17.8571C6.54763 17.5414 6.67305 17.2386 6.89631 17.0153C7.11957 16.7921 7.42237 16.6667 7.7381 16.6667ZM17.2619 10.7143C17.5776 10.7143 17.8804 10.8397 18.1037 11.063C18.327 11.2862 18.4524 11.589 18.4524 11.9048V14.2857C18.4524 14.6014 18.327 14.9043 18.1037 15.1275C17.8804 15.3508 17.5776 15.4762 17.2619 15.4762C16.9462 15.4762 16.6434 15.3508 16.4201 15.1275C16.1969 14.9043 16.0714 14.6014 16.0714 14.2857V11.9048C16.0714 11.589 16.1969 11.2862 16.4201 11.063C16.6434 10.8397 16.9462 10.7143 17.2619 10.7143Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Filters
              </button>
              <button type="button">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6666 22.1667C17.7384 22.1667 16.8482 21.7979 16.1918 21.1415C15.5354 20.4852 15.1666 19.5949 15.1666 18.6667C15.1666 17.7384 15.5354 16.8482 16.1918 16.1918C16.8482 15.5354 17.7384 15.1667 18.6666 15.1667C19.5949 15.1667 20.4851 15.5354 21.1415 16.1918C21.7979 16.8482 22.1666 17.7384 22.1666 18.6667C22.1666 19.5949 21.7979 20.4852 21.1415 21.1415C20.4851 21.7979 19.5949 22.1667 18.6666 22.1667ZM9.33331 22.1667C8.40506 22.1667 7.51482 21.7979 6.85844 21.1415C6.20206 20.4852 5.83331 19.5949 5.83331 18.6667C5.83331 17.7384 6.20206 16.8482 6.85844 16.1918C7.51482 15.5354 8.40506 15.1667 9.33331 15.1667C10.2616 15.1667 11.1518 15.5354 11.8082 16.1918C12.4646 16.8482 12.8333 17.7384 12.8333 18.6667C12.8333 19.5949 12.4646 20.4852 11.8082 21.1415C11.1518 21.7979 10.2616 22.1667 9.33331 22.1667ZM18.6666 12.8333C17.7384 12.8333 16.8482 12.4646 16.1918 11.8082C15.5354 11.1518 15.1666 10.2616 15.1666 9.33333C15.1666 8.40508 15.5354 7.51484 16.1918 6.85846C16.8482 6.20208 17.7384 5.83333 18.6666 5.83333C19.5949 5.83333 20.4851 6.20208 21.1415 6.85846C21.7979 7.51484 22.1666 8.40508 22.1666 9.33333C22.1666 10.2616 21.7979 11.1518 21.1415 11.8082C20.4851 12.4646 19.5949 12.8333 18.6666 12.8333ZM9.33331 12.8333C8.40506 12.8333 7.51482 12.4646 6.85844 11.8082C6.20206 11.1518 5.83331 10.2616 5.83331 9.33333C5.83331 8.40508 6.20206 7.51484 6.85844 6.85846C7.51482 6.20208 8.40506 5.83333 9.33331 5.83333C10.2616 5.83333 11.1518 6.20208 11.8082 6.85846C12.4646 7.51484 12.8333 8.40508 12.8333 9.33333C12.8333 10.2616 12.4646 11.1518 11.8082 11.8082C11.1518 12.4646 10.2616 12.8333 9.33331 12.8333Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button type="button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 6.75H19.5C20.2956 6.75 21.0587 7.06607 21.6213 7.62868C22.1839 8.19129 22.5 8.95435 22.5 9.75V14.25C22.5 15.0456 22.1839 15.8087 21.6213 16.3713C21.0587 16.9339 20.2956 17.25 19.5 17.25H4.5C3.70435 17.25 2.94129 16.9339 2.37868 16.3713C1.81607 15.8087 1.5 15.0456 1.5 14.25V9.75C1.5 8.95435 1.81607 8.19129 2.37868 7.62868C2.94129 7.06607 3.70435 6.75 4.5 6.75ZM4.5 8.25C4.10218 8.25 3.72064 8.40804 3.43934 8.68934C3.15804 8.97064 3 9.35218 3 9.75V14.25C3 14.6478 3.15804 15.0294 3.43934 15.3107C3.72064 15.592 4.10218 15.75 4.5 15.75H19.5C19.8978 15.75 20.2794 15.592 20.5607 15.3107C20.842 15.0294 21 14.6478 21 14.25V9.75C21 9.35218 20.842 8.97064 20.5607 8.68934C20.2794 8.40804 19.8978 8.25 19.5 8.25H4.5ZM1.5 3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H21.75C21.9489 2.25 22.1397 2.32902 22.2803 2.46967C22.421 2.61032 22.5 2.80109 22.5 3C22.5 3.19891 22.421 3.38968 22.2803 3.53033C22.1397 3.67098 21.9489 3.75 21.75 3.75H2.25C2.05109 3.75 1.86032 3.67098 1.71967 3.53033C1.57902 3.38968 1.5 3.19891 1.5 3ZM1.5 21C1.5 20.8011 1.57902 20.6103 1.71967 20.4697C1.86032 20.329 2.05109 20.25 2.25 20.25H21.75C21.9489 20.25 22.1397 20.329 22.2803 20.4697C22.421 20.6103 22.5 20.8011 22.5 21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H2.25C2.05109 21.75 1.86032 21.671 1.71967 21.5303C1.57902 21.3897 1.5 21.1989 1.5 21Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <div className="text-lg pl-5">
              Showing {(page - 1) * showedCards + 1}–
              {(page - 1) * showedCards + products?.length} of{" "}
              {productsMaxFind ? productsMaxFind : "many"} results
            </div>
          </div>
          <div className="flex">
            <label className="text-xl mr-2">
              Show
              <input
                type="number"
                min={0}
                max={20}
                value={showedCards}
                onInput={(e) => handleShowedCards(e)}
                className="ml-2 min-w-[4ch] text-[#9f9f9f] px-3 text-lg py-1"
                style={{ width: `${3 + showedCards.length}ch` }}
              />
            </label>
            <label className="text-xl">
              Sort by
              <select
                onChange={(e) => handleSortMethod(e)}
                value={sortMethod}
                className="text-[#9f9f9f] ml-2 px-3 text-lg py-1"
              >
                <option value="ordered">Popularity</option>
                <option value="label">Name</option>
                <option value="priceUp">Price Up</option>
                <option value="priceDown">Price Down</option>
              </select>
            </label>
          </div>
        </div>
        <div className="relative">
          <div className="absolute flex w-full h-full  ">
            <div
              className="m-0 w-1/3 h-full flex p-5 gap-2 flex-col relative bg-[#faf4f4] transition-all duration-300 -left-1/3"
              ref={filtersBlock}
            >
              <div>
                <button
                  className="absolute top-5 right-5"
                  onClick={toggleFilters}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12l3.005-3.005Z"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl font-semibold">Types</h2>
                <label className="cursor-pointer block mt-3 text-lg ml-4">
                  <input
                    type="checkbox"
                    onChange={(e) => handleTypeFilter(e)}
                    name="Table"
                    checked={typeFilters.includes("Table")}
                    className="mr-1"
                  />
                  <span>Table</span>
                </label>
                <label className="cursor-pointer block mt-2 text-lg ml-4">
                  <input
                    type="checkbox"
                    name="CoffeTable"
                    className="mr-1"
                    checked={typeFilters.includes("CoffeTable")}
                    onChange={(e) => handleTypeFilter(e)}
                  />
                  <span>Coffe Table</span>
                </label>
                <label className="cursor-pointer block mt-2 text-lg ml-4">
                  <input
                    type="checkbox"
                    name="Console"
                    className="mr-1"
                    checked={typeFilters.includes("Console")}
                    onChange={(e) => handleTypeFilter(e)}
                  />
                  <span>Console</span>
                </label>
                <label className="cursor-pointer block mt-2 text-lg ml-4">
                  <input
                    type="checkbox"
                    name="Sofa"
                    checked={typeFilters.includes("Sofa")}
                    className="mr-1"
                    onChange={(e) => handleTypeFilter(e)}
                  />
                  <span>Sofa</span>
                </label>
                <label className="cursor-pointer block mt-2 text-lg ml-4">
                  <input
                    type="checkbox"
                    name="ChairTable"
                    className="mr-1"
                    checked={typeFilters.includes("ChairTable")}
                    onChange={(e) => handleTypeFilter(e)}
                  />
                  <span>Chair & Table</span>
                </label>
                <label className="cursor-pointer block mt-2 text-lg ml-4">
                  <input
                    type="checkbox"
                    name="SofaSet"
                    className="mr-1"
                    checked={typeFilters.includes("SofaSet")}
                    onChange={(e) => handleTypeFilter(e)}
                  />
                  <span>Sofa Set</span>
                </label>
                <label className="cursor-pointer block mt-2 text-lg ml-4">
                  <input
                    type="checkbox"
                    name="Sideboard"
                    className="mr-1"
                    checked={typeFilters.includes("Sideboard")}
                    onChange={(e) => handleTypeFilter(e)}
                  />
                  <span>Sideboard</span>
                </label>
              </div>
              <div className="">
                <h2 className="text-2xl font-semibold">Price</h2>
                <div className="mt-3">
                  <Slider
                    className="!w-4/5 !mx-auto"
                    value={[minPriceFilter, maxPriceFilter]}
                    min={0}
                    max={maxPrice}
                    range
                    allowCross={false}
                    onChange={handleRangeChange}
                  />
                  <div className="flex justify-around mt-2">
                    <input
                      type="number"
                      className="block w-2/6 px-4 py-2 rounded-md"
                      name="priceFrom"
                      value={minPriceFilter}
                      min={0}
                      max={maxPriceFilter}
                      onChange={(e) => {
                        const minValue =
                          parseInt(e.target.value) > maxPriceFilter
                            ? maxPriceFilter - 1
                            : parseInt(e.target.value);

                        setMinPriceFilter(minValue);
                        setSearchParams(
                          mergeSearchParams(searchParams, { from: minValue })
                        );
                      }}
                    />
                    <input
                      type="number"
                      className="block w-2/6 px-4 py-2 rounded-md"
                      name="priceFrom"
                      min={minPriceFilter}
                      value={maxPriceFilter}
                      onChange={(e) => {
                        const maxValue =
                          parseInt(e.target.value) < minPriceFilter
                            ? minPriceFilter + 1
                            : parseInt(e.target.value);

                        setMaxPriceFilter(maxValue);
                        setSearchParams(
                          mergeSearchParams(searchParams, { to: maxValue })
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-[rgba(0,0,0,0.3)] opacity-0 w-2/3 h-full z-[-1] transition-all duration-300"
              ref={hideFilters}
              onClick={toggleFilters}
            ></button>
          </div>
          <div className="flex flex-wrap gap-x-7 min-h-[1000px] gap-y-4 w-fit justify-center max-w-[90%] mx-auto ">
            {products.map((product) => {
              return (
                <ProductCard product={product} key={product.id}>
                  <div className="flex flex-col w-[10%] justify-center">
                    <button
                      type="button"
                      className="group"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-hover:fill-slate-400 transition-colors duration-300"
                          d="M12.8333 10.5V6.99999H9.33329V4.66666H12.8333V1.16666H15.1666V4.66666H18.6666V6.99999H15.1666V10.5H12.8333ZM8.16663 25.6667C7.52496 25.6667 6.97546 25.438 6.51813 24.9807C6.06079 24.5233 5.83251 23.9742 5.83329 23.3333C5.83329 22.6917 6.06196 22.1422 6.51929 21.6848C6.97663 21.2275 7.52574 20.9992 8.16663 21C8.80829 21 9.35779 21.2287 9.81513 21.686C10.2725 22.1433 10.5007 22.6924 10.5 23.3333C10.5 23.975 10.2713 24.5245 9.81396 24.9818C9.35663 25.4392 8.80751 25.6674 8.16663 25.6667ZM19.8333 25.6667C19.1916 25.6667 18.6421 25.438 18.1848 24.9807C17.7275 24.5233 17.4992 23.9742 17.5 23.3333C17.5 22.6917 17.7286 22.1422 18.186 21.6848C18.6433 21.2275 19.1924 20.9992 19.8333 21C20.475 21 21.0245 21.2287 21.4818 21.686C21.9391 22.1433 22.1674 22.6924 22.1666 23.3333C22.1666 23.975 21.938 24.5245 21.4806 24.9818C21.0233 25.4392 20.4742 25.6674 19.8333 25.6667ZM8.16663 19.8333C7.29163 19.8333 6.62079 19.4491 6.15413 18.6807C5.68746 17.9122 5.67774 17.1492 6.12496 16.3917L7.69996 13.5333L3.49996 4.66666H1.16663V2.33332H4.98746L9.94579 12.8333H18.1416L22.6625 4.66666L24.7041 5.77499L20.1833 13.9417C19.9694 14.3305 19.6875 14.6319 19.3375 14.8458C18.9875 15.0597 18.5888 15.1667 18.1416 15.1667H9.44996L8.16663 17.5H22.1666V19.8333H8.16663Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                </ProductCard>
              );
            })}
          </div>
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
    </>
  );
};

export default Shop;
