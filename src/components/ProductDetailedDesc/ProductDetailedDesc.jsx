import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";
import ReviewBlock from "../ReviewBlock/ReviewBlock";

const ProductDetailedDesc = ({ product }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [swiper, setSwiper] = useState(null);
  const [slideSelected, setSlideSelected] = useState(parseInt(searchParams.get("slide")));

  const handleSlideSelector = (idx) => {
    setSearchParams(mergeSearchParams(searchParams, { slide: idx }));
    swiper?.enable();
    swiper?.slideTo(idx);
    setSlideSelected(idx);
    swiper?.disable();
  };

  useEffect(() => {
    swiper?.slideTo(slideSelected);
    swiper?.disable();
  }, [swiper]);

  return (
    <div>
      <div className="flex overflow-x-auto justify-around mx-auto md:w-1/2 ">
        <button
          onClick={() => handleSlideSelector(0)}
          style={slideSelected === 0 ? { color: "black" } : {}}
          className="text-2xl transition-all duration-300 hover:text-black text-[#9F9F9F]"
        >
          Description
        </button>
        <button
          onClick={() => handleSlideSelector(1)}
          style={slideSelected === 1 ? { color: "black" } : {}}
          className="text-2xl transition-all duration-300 hover:text-black text-[#9F9F9F]"
        >
          Additional Information
        </button>
        <button
          onClick={() => handleSlideSelector(2)}
          style={slideSelected === 2 ? { color: "black" } : {}}
          className="text-2xl transition-all duration-300 hover:text-black text-[#9F9F9F]"
        >
          Reviews
        </button>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(e) => setSlideSelected(e.activeIndex)}
      >
        <SwiperSlide>
          <div className="w-3/4 mx-auto">
            <p className="my-7">{product.detailedDesc}</p>
            <div className="flex w-full justify-center flex-col md:flex-row mt-7 gap-7">
              {product.descImgs.map((img) => (
                <img
                  key={img}
                  className="bg-[#fff9e5] w-full md:!w-1/2 rounded-lg"
                  src={img}
                  alt=""
                />
              ))}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-3/4 mx-auto">
            <p className="my-7">{product.additionalInfo}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <ReviewBlock reviews = {product?.reviews} productId={product.id} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductDetailedDesc;
