import React, { useEffect, useState }from "react";
import useMaxfieldValue from "../../hooks/useMaxFieldValue";

const PriceFilter = () => {
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

  return (
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
            setSearchParams(mergeSearchParams(searchParams, { to: maxValue }));
          }}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
