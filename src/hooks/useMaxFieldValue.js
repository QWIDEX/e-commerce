import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useMaxfieldValue = (field) => {
  const productsDocs = useSelector((state) => state.products.productsDocs);

  const [maxFieldProduct, setMaxFieldProduct] = useState(undefined);

  function orderByField(obj1, obj2, [field, direction = "asc"]) {
    const value1 = obj1[field];
    const value2 = obj2[field];

    let result;
    if (typeof value1 === "number" && typeof value2 === "number") {
      result = value1 - value2;
    } else if (typeof value1 === "string" && typeof value2 === "string") {
      const lowerValue1 = value1.toLowerCase();
      const lowerValue2 = value2.toLowerCase();
      result = lowerValue1.localeCompare(lowerValue2);
    } else {
      result = 0;
    }

    return direction === "desc" ? -result : result;
  }

  useEffect(() => {
    const productsDocsCopy = [...productsDocs];
    if (productsDocsCopy.length !== 0) {
      setMaxFieldProduct(
        productsDocsCopy.sort((a, b) => {
          return orderByField(a, b, [field, "desc"]);
        })[0][field]
      );
    }
  }, [productsDocs, field]);

  return maxFieldProduct;
};

export default useMaxfieldValue;
