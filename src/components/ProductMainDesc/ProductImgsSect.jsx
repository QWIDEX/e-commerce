import React, { useEffect, useRef, useState } from "react";
import img from "../../images/HomePage/Asgaard-sofa-1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductImgsSect = () => {
  const [swiper, setSwiper] = useState(null);
  const [slideSelected, setSlideSelected] = useState(1);
  const wrapperRef = useRef();
  const [swiperWidth, setSwiperWidth] = useState(500);

  const handleImgSelector = (idx) => {
    swiper.slideTo(idx);
  };

  useEffect(() => {
    const handleResize = () => {
      if (document.documentElement.offsetWidth < 930)
        setSwiperWidth(wrapperRef.current.offsetWidth);
      else setSwiperWidth(wrapperRef.current.offsetWidth - 112);
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col-reverse lg-sm:flex-row min-w-0 lg-sm:min-w-[445px] justify-center gap-8 w-full lg-sm:w-1/2 px-[auto] "
    >
      <div className="flex justify-center">
        <div className="flex flex-row lg-sm:flex-col min-w-[70px] lg-sm:max-w-[80px] gap-8 overflow-x-auto overflow-y-auto max-h-[500px]">
          <ImgSelector
            selected={true}
            img={img}
            idx={0}
            handleImgSelector={handleImgSelector}
          />
          <ImgSelector
            img={img}
            idx={1}
            handleImgSelector={handleImgSelector}
          />
          <ImgSelector
            img={img}
            idx={2}
            handleImgSelector={handleImgSelector}
          />
          <ImgSelector
            img={img}
            idx={3}
            handleImgSelector={handleImgSelector}
          />
        </div>
      </div>

      <div className="mx-auto lg-sm:mx-0" style={{ width: swiperWidth }}>
        <Swiper
          slidesPerView={1}
          width={swiperWidth}
          spaceBetween={50}
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(e) => setSlideSelected(e.activeIndex)}
        >
          <SwiperSlide>
            <SlideImg img={img} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImg img={img} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImg img={img} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImg img={img} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

const ImgSelector = ({ img, idx, handleImgSelector, selected }) => {
  return (
    <div
      className="p-0.5 rounded-lg m-auto"
      style={selected ? { border: "2px solid black" } : {}}
    >
      <button
        onClick={() => handleImgSelector(idx)}
        className="bg-[#fff9e5] p-1 flex transition-all min-w-[64px] duration-300 justify-center items-center rounded-lg max-w-[72px] aspect-square max-h-[72px]"
      >
        <img src={img} alt="" />
      </button>
    </div>
  );
};

export default ProductImgsSect;

const SlideImg = ({ img }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-[#fff9e5] p-5 rounded-lg max-w-[480px] flex justify-center items-center aspect-square">
        <img src={img} alt="" className="w-full " />
      </div>
    </div>
  );
};
