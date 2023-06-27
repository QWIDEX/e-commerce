import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const createUser = async ({ uid, firstName, lastName }) => {
  const usersColRef = doc(db, `/users/${uid}`);
  await setDoc(usersColRef, { firstName, lastName });
};

export default createUser;
