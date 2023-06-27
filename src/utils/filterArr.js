const filterArr = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr.filter((arg) => {
    if (Array.isArray(arg)) {
      return arg.length !== 0;
    }
    return arg !== undefined && arg !== null && arg !== "";
  });
}

export default filterArr;
