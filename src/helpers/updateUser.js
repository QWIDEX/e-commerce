import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { updateEmail } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

const updateUser = async (
  {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    street,
    zipCode,
    avatar,
  },
  user
) => {
  let error;
  const userDocRef = doc(db, `users/${user.uid}`);

  if (user.email !== email) {
    await updateEmail(auth.currentUser, email).catch((err) => {
      error = err;
      updateDoc(userDocRef, { email: user.email });
    });
  }

  if (!error) {
    await updateDoc(userDocRef, {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      city,
      street,
      zipCode,
    }).catch((err) => {
      error = err;
    });
  }

  const avatarRef = ref(storage, `images/users/avatars/${user.uid}`);

  if (!error && avatar) {
    await uploadBytes(avatarRef, avatar).catch((err) => {
      error = err;
    });
  }
  
  if (error) throw error;
};
export default updateUser;
