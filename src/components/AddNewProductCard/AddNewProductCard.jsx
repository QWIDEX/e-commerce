import React, {useState} from "react";
import { doc, getDoc, deleteDoc, updateDoc} from "firebase/firestore";
import { replaceProduct, deleteProduct } from "../../store/slices/productsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { db } from "../../firebase";


const AddNewProductCard = (props) => {
  const { id, label, price, imgUrl } = props.product;
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [newLabel, setNewLabel] = useState(label);
  const dispatch = useDispatch();
  const cardRef = doc(db, "products", id);

  const toggleEditing = () => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

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

  const editProduct = async () => {
    updateDoc(cardRef, {
      label: newLabel,
      price: newPrice,
    });
    try {
      getDoc(cardRef).then((doc) =>
        dispatch(
          replaceProduct({
            idx: props.idx,
            product: {
              ...doc.data(),
              id: doc.id,
            },
          })
        )
      );
      toast.success("Successfully changed");
    } catch (error) {
      toast.error(error);
    }
    setEditing(false);
  };

  const deleteProductFromDB = async () => {
    try {
      deleteDoc(cardRef).then(() => {
        toast.success("Successfully deleted");
        dispatch(deleteProduct(props.idx));
      });
    } catch (error) {
      toast.error(error);
    }
  };

  if (editing) {
    return (
      <div className="flex flex-col max-w-287px justify-center items-center">
        <img
          src={imgUrl}
          alt="Granite-square-side-table"
          className="max-w-242px w-full m-5 md:w-11/12"
        />
        <div className="w-[100%] flex ">
          <div className="w-[80%]">
            <textarea
              value={newLabel}
              type="text"
              size={label.length}
              onChange={(e) => setNewLabel(e.target.value)}
              className="font-normal break-words overflow-hidden block text-base leading-snug mb-3 text-center md:text-start max-w-74%"
            />
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              size={toString(price).length}
              className="font-medium w-[80%]  text-2xl leading-normal"
            />
            <span className="font-medium w-[80%] text-2xl leading-normal">
              $
            </span>
          </div>
          <div className="flex flex-col w-[10%] justify-between max-h-16">
            <button type="button" onClick={toggleEditing} className="group">
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
            </button>
            <button
              type="button"
              onClick={deleteProductFromDB}
              className="group"
            >
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
        <button
          type="button"
          onClick={editProduct}
          className="py-1 px-4 bg-[#fbebb5] rounded-xl border-slate-400 border-[1px]"
        >
          Submit
        </button>
      </div>
    );
  } else
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
            <button type="button" onClick={toggleEditing} className="group">
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
            </button>
            <button
              type="button"
              onClick={deleteProductFromDB}
              className="group"
            >
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

export default AddNewProductCard