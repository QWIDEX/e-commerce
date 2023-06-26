import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";
import { setFavorites } from "../../../store/slices/userSlice";
import "./AddToFavoritesBtn.css";

const AddToFavoritesBtn = ({ productId, className = '' }) => {
  const user = useSelector((state) => state.user.user);
  const favorites = user.favorites;

  const dispatch = useDispatch();
  const userRef = doc(db, `/users/${user.uid}`);

  const [liked, setLiked] = useState(
    user.favorites?.includes(productId) || false
  );
  const likedPrev = useRef(liked);
  
  const likeIconRef = useRef();

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else {
      if (likedPrev.current !== liked) {
        const debounceTimer = setTimeout(() => {
          updateDoc(userRef, { favorites });
        }, 500);

        likedPrev.current = liked;
        
        return () => {
          clearTimeout(debounceTimer);
        };
      }
    }
  }, [favorites]);

  const addToFavorites = () => {
    setLiked(true);
    likeIconRef.current.classList.remove("un-like");
    likeIconRef.current.classList.add("like");
    dispatch(setFavorites([...favorites, productId]));
  };

  const removeFromFavorites = () => {
    const favorites = user.favorites;
    if (favorites) {
      const idxInFavorites = favorites.findIndex((id) => id === productId) || 0;
      const updatedFavorites = [
        ...favorites?.slice(0, idxInFavorites),
        ...favorites?.slice(idxInFavorites + 1),
      ];

      dispatch(setFavorites([...updatedFavorites]));
    }

    setLiked(false);
    likeIconRef.current.classList.remove("like");
    likeIconRef.current.classList.add("un-like");
  };

  return (
    <button className={className} onClick={liked ? removeFromFavorites : addToFavorites}>
      <svg
        width="28"
        height="28"
        ref={likeIconRef}
        className="transition-all duration-1000"
        viewBox="0 0 28 28"
        fill={liked ? "red" : "transparent"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.16665 3.5C4.94548 3.5 2.33331 6.08533 2.33331 9.275C2.33331 11.8498 3.35415 17.9608 13.4026 24.1383C13.5826 24.2479 13.7893 24.3058 14 24.3058C14.2107 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6666 11.8498 25.6666 9.275C25.6666 6.08533 23.0545 3.5 19.8333 3.5C16.6121 3.5 14 7 14 7C14 7 11.3878 3.5 8.16665 3.5Z"
          stroke="black"
          strokeWidth={liked ? "0" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default AddToFavoritesBtn;
