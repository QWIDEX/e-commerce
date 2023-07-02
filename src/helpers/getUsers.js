import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";

const getUsers = async () => {
  const usersCollRef = collection(db, "/users");
  const users = (await getDocs(usersCollRef)).docs;

  const usersFull = await Promise.all(
    users.map(async (user) => {
      const userAvatarRef = ref(storage, `images/users/avatars/${user.id}`);
      let userAvatar;
      userAvatar = await getDownloadURL(userAvatarRef).catch(
        () => (userAvatar = undefined)
      );

      return { ...user.data(), avatar: userAvatar, uid: user.id };
    })
  );

  return usersFull;
};

export default getUsers;
