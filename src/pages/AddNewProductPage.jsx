import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import useProducts from "../hooks/useProducts";
import AddNewProductCard from "../components/AddNewProductCard/AddNewProductCard";

const AddNewProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [imageUpload, setImageUpload] = useState(undefined);
  const [productType, setProductType] = useState("noneSelected");
  const [productsTotal, setProductsTotal] = useState(100);

  const products = useProducts(0, 100, [productsTotal]);

  const uploadFields = async () => {
    const productsCollectionRef = collection(db, "products");
    try {
      addDoc(productsCollectionRef, {
        label: productName,
        price: productPrice,
        type: productType,
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const uploadImage = async () => {
    const imagesFolderRef = ref(storage, `images/products/${productName}`);
    try {
      await uploadBytes(imagesFolderRef, imageUpload);
      setImageUpload(undefined)
    } catch (err) {
      toast.error(err);
    }
  };

  const addProduct = async () => {
    if (
      productName !== "" &&
      productPrice !== 0 &&
      imageUpload !== null &&
      productType !== "noneSelected"
    ) {
      await uploadFields();
      await uploadImage();
      toast.success("File Uploaded");
      setImageUpload(null);
      setProductName("");
      setProductPrice(0);
      setProductType("noneSelected")
      setProductsTotal(productsTotal + 1);
    } else if (productName === "") {
      toast.error("Напиши ім'я продукту");
    } else if (productPrice === 0) {
      toast.error("Напиши ціну");
    } else if (productType === "noneSelected") {
      toast.error("Вибери тип");
    } else {
      toast.error("Додай картинку");
    }
  };

  return (
    <>
      <div className="pt-24 gap-5 flex justify-around flex-col items-center">
        <h1 className="font-bold text-2xl">Add new Product</h1>
        <label
          htmlFor="addProductImage"
          className="flex items-center flex-col justify-center"
        >
          <span className="py-2 px-5 block border-zinc-400 border-[1px] bg-[whiteSmoke] cursor-pointer rounded-lg">
            Upload Image
          </span>
        </label>
        {imageUpload ? (
          <img
            src={URL.createObjectURL(imageUpload)}
            className="w-[242px] h-[242px] border-zinc-400 border-[1px]"
            alt="selected"
          />
        ) : (
          <div className="w-[242px] h-[242px] border-zinc-400 border-[1px]"></div>
        )}

        <input
          id="addProductImage"
          type="file"
          placeholder="Add image"
          className="hidden"
          onChange={(e) => {
            console.log(e.target.files);
            setImageUpload(e.target.files[0]);
            e.target.value = ''
          }}
        />
        <input
          type="text"
          className="py-2 px-5 border-zinc-400 border-[1px] rounded-2xl"
          placeholder="Label of product"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="py-2 px-5 border-zinc-400 border-[1px] rounded-2xl min-w-[223px]"
        >
          <option value="noneSelected" disabled>
            Product type
          </option>
          <option value="Chair">Chair</option>
          <option value="Sofa">Sofa</option>
          <option value="Table">Table</option>
          <option value="Sideboard">Sideboard</option>
          <option value="Console">Console</option>
          <option value="CoffeTable">Coffe Table</option>
          <option value="SofaSet">Sofa Set</option>
          <option value="ChairTable">Chair Table Set</option>
        </select>
        <input
          type="number"
          className="py-2 px-5 border-zinc-400 border-[1px] rounded-2xl"
          placeholder="Price of Product"
          value={productPrice}
          onChange={(e) => setProductPrice(parseInt(e.target.value))}
        />
        <button
          className="py-1 px-5 block border-black bg-[whiteSmoke] cursor-pointer border-[1px] rounded-lg"
          onClick={addProduct}
        >
          Submit
        </button>
      </div>
      <div className="flex justify-center flex-wrap">
        {products.map((product, idx) => {
          return (
            <AddNewProductCard idx={idx} product={product} key={product.id} />
          );
        })}
      </div>
      <Toaster />
    </>
  );
};

export default AddNewProductPage;
