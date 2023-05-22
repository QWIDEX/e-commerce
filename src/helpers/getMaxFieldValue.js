const getMaxFieldValue = async (field, queryParams, orderProducts) => {
  const productsCollectionRef = collection(db, "products");

  const filteredParams = queryParams.filter((arg) => {
    if (Array.isArray(arg)) {
      return arg.length !== 0;
    }
    return arg !== undefined && arg !== null && arg !== "";
  });

  let product;
  
  try {
    const data = await getDocs(
      query(productsCollectionRef, ...filteredParams, orderProducts, limit(1))
    );
    const doc = data.docs[0];
    product = { ...doc.data(), id: doc.id };
  } catch (err) {
    console.error(err);
  }

  return product[field];
};

export default getMaxFieldValue;
