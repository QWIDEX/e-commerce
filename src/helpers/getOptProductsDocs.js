const filterProductsDocs = (productsDocs, queryParams, orderProducts) => {
  function convertSortMethod(sortMethod) {
    if (sortMethod === "priceUp") {
      return ["price", "asc"];
    } else if (sortMethod === "priceDown") {
      return ["price", "desc"];
    } else if (sortMethod === "ordered") {
      return ["ordered", 'desc']
    } else if (sortMethod) {
      return [sortMethod, "asc"];
    }
  }

  function filterArr(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    });
  }

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

  const typeFiltersArr = filterArr(queryParams.typeFilters);

  const filteredProducts = productsDocs.filter(
    (product) =>
      product.price >= (queryParams.priceFrom || 0) &&
      product.price <= (queryParams.priceTo || 300000) &&
      (typeFiltersArr.length === 0
        ? true
        : typeFiltersArr.includes(product.type))
  );

  return filteredProducts.sort((a, b) =>
    orderByField(a, b, convertSortMethod(orderProducts))
  );
};

export default filterProductsDocs