import React from "react";
import RateProduct from "../RateProduct/RateProduct";

const Review = ({ review }) => {
  return (
    <div className="bg-gray-100 w-11/12 mt-7 mx-auto flex gap-5 rounded-lg p-5">
      <img
        src={require("../../images/photo_2022-04-04_10-14-37.jpg")}
        alt=""
        className="rounded-full h-20"
      />
      <div>
        <h2 className="text-xl font-medium">Zhenia</h2>
        <RateProduct size={17} className="py-1" />
        <p className="text-lg">Nice Sofa!</p>
      </div>
    </div>
  );
};

export default Review;
