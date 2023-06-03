import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";

const SortBy = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [sortMethod, setSortMethod] = useState(
    searchParams.get("sortMethod") || "ordered"
  );

  function handleSortMethod(e) {
    const sortMethod = e.target.value;
    setSortMethod(sortMethod)
    navigate(
      `/shop/?${mergeSearchParams(searchParams, { sortMethod: sortMethod })}`,
      { replace: true }
    );
  }

  return (
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
  );
};

export default SortBy;
