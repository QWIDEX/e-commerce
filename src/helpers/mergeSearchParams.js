const mergeSearchParams = (oldParams, newParams) => {
  const mergedParams = new URLSearchParams(oldParams);

  for (const [key, value] of Object.entries(newParams)) {
    if (value) {
      mergedParams.set(key, value);
    } else {
      mergedParams.delete(key);
    }
  }

  return mergedParams.toString();
};

export default mergeSearchParams