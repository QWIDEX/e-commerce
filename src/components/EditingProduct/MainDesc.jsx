import React from "react";
import "swiper/css";
import ImgSect from "./ImgSect";
import ShortDescSect from "./ShortDescSect";

const MainDesc = ({ product }) => {
  return (
    <div className="sm-sm:px-6 lg-sm:flex-row  flex-col sm:px-12 px-4 md:px-16 flex gap-4 md:gap-8 lg:gap-20 justify-evenly">
      <ImgSect imgs={product.imgsList} />
      <ShortDescSect product={product} />
    </div>
  );
};

export default MainDesc;
