import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const createUser = async ({ email, uid }) => {
  const usersColRef = doc(db, `/users/${uid}`);
  await setDoc(usersColRef, { email });
  return { email, uid };
};

export default createUser;
