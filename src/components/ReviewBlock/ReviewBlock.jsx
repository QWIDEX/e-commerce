import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import getOrders from "../../helpers/getOrders";
import Review from "../Review/Review";
import RateProduct from "../RateProduct/RateProduct";
import ButtonOutline from "../Reusable/BtnOutline";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const ReviewBlock = ({ productId, reviews }) => {
  const user = useSelector((state) => state.user.user);

  const [review, setReview] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    setReview(reviews.find((review) => review.userId === user.uid));
    if (user) {
      getOrders(user).then((orders) => {
        setOrder(
          orders.find((order) =>
            order.products.find((product) => productId === product.id)
          )
        );
      });
    }
  }, [user]);

  if (order?.status === "Delivered" && !review) {
    return (
      <div className="flex w-11/12 mt-5 mx-auto flex-col gap-5">
        <label className="p-2 border border-gray-200 rounded-lg">
          <h1 className="text-center font-medium text-xl">Leave a reveiw</h1>
          <CreateReviewBlock reviews={reviews} productId={productId} />
        </label>
        {reviews.map((review, idx) => (
          <Review review={review} key={idx} />
        ))}
      </div>
    );
  } else if (review) {
    return (
      <div className="flex w-11/12 mt-5 mx-auto flex-col gap-5">
        <div className="p-2 border border-gray-200 rounded-lg">
          <h1 className="text-center font-medium text-xl">Your review</h1>
          <CreateReviewBlock
            reviews={reviews}
            review={review}
            change={true}
            productId={productId}
          />
        </div>
        {reviews.map((review, idx) => (
          <Review review={review} key={idx} />
        ))}
      </div>
    );
  } else {
    <div className="flex w-11/12 mt-5 mx-auto flex-col gap-5">
      {reviews.map((review, idx) => (
        <Review review={review} key={idx} />
      ))}
    </div>;
  }
};

export default ReviewBlock;

const CreateReviewBlock = ({
  productId,
  reviews,
  change = false,
  review = {},
}) => {
  const user = useSelector((state) => state.user.user);
  const [reviewText, setReviewText] = useState(review.reviewText || "");

  const currentRating = useRef(review.rating || 0);

  const postReview = () => {
    if (currentRating.current === 0) toast.error("You have to rate it");
    else {
      const productRef = doc(db, `/products/${productId}`);
      updateDoc(productRef, {
        reviews: [
          ...reviews,
          {
            reviewText,
            rating: currentRating.current,
            userId: user.uid,
          },
        ],
      }).then(() => toast.success("Successfully posted"));
    }
  };

  const navigate = useNavigate();

  const changeReview = () => {
    if (currentRating.current === 0) toast.error("You have to rate it");
    else {
      const productRef = doc(db, `/products/${productId}`);
      const reviewIdx = reviews.findIndex(
        (review) => review.userId === user.uid
      );
      updateDoc(productRef, {
        reviews: [
          ...reviews.slice(0, reviewIdx),
          {
            reviewText,
            rating: currentRating.current,
            userId: user.uid,
          },
          ...reviews.slice(reviewIdx + 1),
        ],
      }).then(() => {
        toast.success("Successfully changed");
      });
    }
  };

  return (
    <div className="bg-gray-100 w-full mt-7 flex gap-5 rounded-lg p-5">
      <img
        src={require("../../images/photo_2022-04-04_10-14-37.jpg")}
        alt=""
        className="rounded-full h-20"
      />
      <div className="w-full">
        <h2 className="text-xl font-medium">
          {user.firstName} {user.lastName}
        </h2>
        <RateProduct
          editing={true}
          initialRating={review.rating || 0}
          size={25}
          className="py-1"
          currentRating={currentRating}
        />
        <div className="flex items-center justify-between gap-5">
          <textarea
            name="review"
            id="review"
            value={reviewText}
            rows={3}
            className="border h-fit p-2 border-gray-200 w-full rounded-lg"
            onChange={(e) => {
              e.target.style.height = `${e.target.scrollHeight + 2}px`;
              setReviewText(e.target.value);
            }}
          ></textarea>
          {change ? (
            <ButtonOutline onClick={changeReview} className="w-full px-5 py-3">
              Change my Review
            </ButtonOutline>
          ) : (
            <ButtonOutline onClick={postReview} className="w-full px-5 py-3">
              Post a Review
            </ButtonOutline>
          )}
        </div>
      </div>
    </div>
  );
};
