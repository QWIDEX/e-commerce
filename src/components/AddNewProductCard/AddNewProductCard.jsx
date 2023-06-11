import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, deleteObject, listAll } from "firebase/storage";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/slices/productsSlice";

const AddNewProductCard = (props) => {
  const { id, label, price, imgUrl } = props.product;
  const dispatch = useDispatch()

  const separateThousands = (number) => {
    const reversedNumber = String(number).split("").reverse();
    let result = "";

    for (let i = 0; i < reversedNumber.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        result += ",";
      }
      result += reversedNumber[i];
    }

    return result.split("").reverse().join("");
  };

  const deleteProductFromDB = async () => {
    let error = false;

    const cardRef = doc(db, "products", id);
    await deleteDoc(cardRef).catch((err) => (error = err));

    const mainImgRef = ref(storage, `images/products/${label}`);
    if (error === false)
      await deleteObject(mainImgRef).catch((err) => (error = err));

    if (error === false) {
      const imagesFolderRef = ref(storage, `images/products/${label}/`);
      const imgsRefsList = (await listAll(imagesFolderRef)).items;
      imgsRefsList.map(
        async (imgRef) => await deleteObject(ref(storage, imgRef.fullPath))
      );
      dispatch(deleteProduct(props.idx))
    }

    if (error) toast.error(error);
  };

  return (
    <div className="flex flex-col max-w-287px items-center md:!items-start ">
      <img
        src={imgUrl}
        alt="Granite-square-side-table"
        className="max-w-242px w-full m-5 md:w-11/12"
      />
      <div className="w-[100%] flex ">
        <div className="w-[80%]">
          <p className="font-normal  text-base leading-snug mb-3 text-center md:text-start max-w-74%">
            {label}
          </p>
          <h2 className="font-medium text-2xl leading-normal">
            {`${separateThousands(price)}$`}
          </h2>
        </div>
        <div className="flex flex-col w-[10%] justify-between max-h-16">
          <Link to={`/edit-product/${id}`} className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                className="group-hover:fill-blue-600 transition-colors duration-300"
                fill="currentColor"
                d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"
              />
            </svg>
          </Link>
          <button type="button" onClick={deleteProductFromDB} className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                className="group-hover:fill-red-500 transition-colors duration-300"
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductCard;
