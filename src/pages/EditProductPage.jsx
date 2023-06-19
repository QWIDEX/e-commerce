import React from "react";
import DetailedDesc from "../components/EditingProduct/DetailedDesc";
import MainDesc from "../components/EditingProduct/MainDesc";
import useProduct from "../hooks/useProduct";
import ErrorIndicator from "../components/ErrorIndicator/ErrorIndicator";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import { useParams } from "react-router";
import MiniHeadingPathSect from "../components/Reusable/MiniHeadingPathSect";
import { uploadBytes, ref, listAll, deleteObject } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { storage } from "../firebase";
import { db } from "../firebase";

const EditProductPage = () => {
  const { productID } = useParams();
  const { loading, product, error } = useProduct(productID);

  function filterArr(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter((arg) => {
      if (Array.isArray(arg)) {
        return arg.length !== 0;
      }
      return arg !== undefined && arg !== null && arg !== "";
    });
  }

  const handleSubmit = () => {
    let slideImgs = [...document.querySelectorAll(".slideImg")];
    const descImgs = document.querySelectorAll(".deskImg");

    const mainImg = slideImgs[0].files[0];
    slideImgs = slideImgs.slice(1);

    const label = document.getElementById("label").value;
    const price = document.getElementById("price").value;
    const smallDesc = document.getElementById("smallDesc").value;
    const available = document.getElementById("available").value;
    const detailedDesc = document.getElementById("detailedDesc").value;
    const additionalInfo = document.getElementById("additionalInfo").value;

    uploadImages(slideImgs, product.label);
    uploadImages(descImgs, `${product.label}/desc`);

    if (mainImg) {
      const mainImgRef = ref(storage, `images/products/${product.label}`);
      uploadBytes(mainImgRef, mainImg).catch((err) => new Error(err));
    }

    getImgsIdxs().then((imgsIdxs) => {
      for (let i = slideImgs.length; i < imgsIdxs.length; i++) {
        const objectRef = ref(storage, `images/products/${product.label}/${i === 0 ? 1 : i}`);
        deleteObject(objectRef);
      }
    });

    updateDoc(doc(db, `/products/${product.id}`), {
      label,
      price: parseInt(price),
      smallDesc,
      available: parseInt(available),
      detailedDesc,
      additionalInfo,
    });
  };

  const getImgsIdxs = async () => {
    const imgsRefsList = (
      await listAll(ref(storage, `images/products/${product.label}/`))
    ).items;

    return imgsRefsList.map((img) => img.name);
  };

  const uploadImages = async (inputs, path) => {
    const imgs = [];
    inputs.forEach((input) => imgs.push(input.files[0]));

    const filteredImgs = filterArr(imgs);

    Promise.all(
      filteredImgs.forEach(async (img, idx) => {
        const imagesFolderRef = ref(
          storage,
          `images/products/${path}/${idx + 1}`
        );
        await uploadBytes(imagesFolderRef, img);
      })
    ).catch((err) => new Error(err));
  };

  return (
    <>
      {error ? (
        <ErrorIndicator />
      ) : loading ? (
        <LoadingIndicator className="py-9 h-[100vh]" />
      ) : (
        <div className="py-9">
          <MiniHeadingPathSect label={product.label} labels={["Shop"]} paths={["shop"]} />
          <MainDesc product={product} />
          <div className="border my-12 border-[#D9D9D9] w-full"></div>
          <DetailedDesc product={product} />
          <button
            onClick={handleSubmit}
            className="border fixed bottom-5 right-5 rounded-lg group transition-all duration-300 shadow-md hover:shadow-sm bg-white z-10 w-14 h-14 border-gray-200 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full "
              viewBox="0 0 16 16"
            >
              <path
                className="group-hover:stroke-green-500 transition-all duration-300 stroke-black"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m2.75 8.75l3.5 3.5l7-7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default EditProductPage;
