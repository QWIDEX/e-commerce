import React from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";

const TypeFilter = ({ children, name }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeFilters = searchParams.get("typeFilters")?.split(",") || [];

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

    if (typesUpdated.length === 0) typesUpdated = undefined;

    navigate(
      `/shop/?${mergeSearchParams(searchParams, {
        typeFilters: typesUpdated,
      })}`,
      { replace: true }
    );
  }

  return (
    <label className="cursor-pointer block mt-3 text-lg ml-4">
      <input
        type="checkbox"
        onChange={(e) => handleTypeFilter(e)}
        name={name}
        checked={typeFilters.includes(name)}
        className="mr-1"
      />
      <span>{children}</span>
    </label>
  );
};

export default TypeFilter;
