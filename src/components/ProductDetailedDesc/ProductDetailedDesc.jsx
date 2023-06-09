import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "../Review/Review";

const ProductDetailedDesc = ({ product }) => {
  const [swiper, setSwiper] = useState(null);
  const [slideSelected, setSlideSelected] = useState(0);

  const handleSlideSelector = (idx) => {
    swiper.enable();
    swiper.slideTo(idx);
    setSlideSelected(idx);
    swiper.disable();
  };

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
            <p className="my-7">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam ipsa voluptate deserunt amet numquam et eligendi
              quisquam dicta impedit, ex sit incidunt, magnam dolorum quia quas
              accusantium nam libero repellat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              iure, est esse aspernatur fuga tempora quae assumenda quibusdam
              repellendus placeat ullam voluptate iusto, nam totam. Autem
              deserunt ut assumenda reiciendis?
            </p>
          </div>
          <div className="flex md:flex-row flex-col mt-7 gap-7 mx-24">
            <img
              className="bg-[#fff9e5] w-full md:w-1/2 h-[400px]"
              src=""
              alt=""
            />
            <img
              className="bg-[#fff9e5] w-full md:w-1/2 h-[400px]"
              src=""
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-3/4 mx-auto">
            <p className="py-7">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam ipsa voluptate deserunt amet numquam et eligendi
              quisquam dicta impedit, ex sit incidunt, magnam dolorum quia quas
              accusantium nam libero repellat! Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Quibusdam ipsa voluptate deserunt
              amet numquam et eligendi quisquam dicta impedit, ex sit incidunt,
              magnam dolorum quia quas accusantium nam libero repellat! Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam ipsa
              voluptate deserunt amet numquam et eligendi quisquam dicta
              impedit, ex sit incidunt, magnam dolorum quia quas accusantium nam
              libero repellat! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Quibusdam ipsa voluptate deserunt amet numquam
              et eligendi quisquam dicta impedit, ex sit incidunt, magnam
              dolorum quia quas accusantium nam libero repellat! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Quibusdam ipsa
              voluptate deserunt amet numquam et eligendi quisquam dicta
              impedit, ex sit incidunt, magnam dolorum quia quas accusantium nam
              libero repellat! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Quibusdam ipsa voluptate deserunt amet numquam
              et eligendi quisquam dicta impedit, ex sit incidunt, magnam
              dolorum quia quas accusantium nam libero repellat!
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="flex gap-5">
                <Review />
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductDetailedDesc;
