import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getUserData = async (uid) => {
  const userDocRef = doc(db, `/users/${uid}`);
  const user = (await getDoc(userDocRef)).data();

  const userAvatarRef = ref(storage, `images/users/${uid}`);
  let userAvatar;
  userAvatar = await getDownloadURL(userAvatarRef).catch(
    () => (userAvatar = undefined)
  );

  return { ...user, avatar: userAvatar };
};

export default getUserData;
