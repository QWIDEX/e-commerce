import React, { useEffect, useState } from "react";
import RateProduct from "../RateProduct/RateProduct";
import getUserData from "../../helpers/getUserData";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

const Review = ({ review }) => {
  const { userId, reviewText, rating } = review;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserData({ uid: userId })
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="flex min-h-[500px] w-full justify-center items-center max-w-[90%] mx-auto ">
        <ErrorIndicator />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] w-full justify-center items-center max-w-[90%] mx-auto ">
        <LoadingIndicator />
      </div>
    );
  } else if (reviewText?.length > 0) {
    return (
      <div className="bg-gray-100 w-full mt-7 flex-col sm-sm:flex-row flex gap-5 rounded-lg p-5">
        <img src={user.avatar} alt="" className="float-right w-fit aspect-square rounded-full h-20" />
        <div>
          <h2 className="text-xl font-medium">
            {user.firstName} {user.lastName}
          </h2>
          <RateProduct size={17} initialRating={rating} className="py-1" />
          <p className="text-lg">{reviewText}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="bg-gray-100 flex-col sm-sm:flex-row w-full mt-7 flex gap-5 rounded-lg p-5">
        <img src={user.avatar} alt="" className="rounded-full aspect-square w-fit h-20" />
        <div className=" h-full flex flex-col justify-center">
          <h2 className="text-xl font-medium">
            {user.firstName} {user.lastName}
          </h2>
          <RateProduct size={17} initialRating={rating} className="py-1" />
        </div>
      </div>
    );
};

export default Review;
