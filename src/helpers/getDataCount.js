import { getCountFromServer } from "firebase/firestore";

const getDataCount = async (queryRef) => {
  try {
    const snapshot = await getCountFromServer(queryRef);
    return snapshot.data().count;
  } catch (error) {
    console.error(error);
  }
};

export default getDataCount