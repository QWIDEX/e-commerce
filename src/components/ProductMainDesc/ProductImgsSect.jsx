import React, { useEffect, useRef, useState } from "react";
import img from "../../images/HomePage/Asgaard-sofa-1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductImgsSect = () => {
  const [swiper, setSwiper] = useState(null);
  const [slideSelected, setSlideSelected] = useState(1);
  const wrapperRef = useRef()
  const [swiperWidth, setSwiperWidth] = useState(500)

  const handleImgSelector = (idx) => {
    swiper.slideTo(idx);
  };

  useEffect(() => {
    setSwiperWidth(wrapperRef.current.offsetWidth - 112 > 553 ? 553 : wrapperRef.current.offsetWidth - 112)
    const eventListener = window.addEventListener('resize',() => {
    setSwiperWidth(wrapperRef.current.offsetWidth - 112 > 553 ? 553 : wrapperRef.current.offsetWidth - 112)
    })
    return () => {
      window.removeEventListener("resize", eventListener)
    }
  }, [])


  return (
    <div ref={wrapperRef} className="flex justify-center min-w-[455px] gap-8 w-1/2 px-[auto] ">
      <div  className="flex flex-col min-w-[70px] max-w-[80px] gap-8 overflow-y-auto max-h-[500px]">
        <ImgSelector
          selected={true}
          img={img}
          idx={0}
          handleImgSelector={handleImgSelector}
        />
        <ImgSelector img={img} idx={1} handleImgSelector={handleImgSelector} />
        <ImgSelector img={img} idx={2} handleImgSelector={handleImgSelector} />
        <ImgSelector img={img} idx={3} handleImgSelector={handleImgSelector} />
      </div>
      <div style={{"width": swiperWidth} } >
        <Swiper
          slidesPerView={1}
          width={swiperWidth}
          // breakpoints={{
          //   1420: {
          //     width: 500,
          //   },
          // }}
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
      className="p-0.5 rounded-lg"
      style={selected ? { border: "2px solid black" } : {}}
    >
      <button
        onClick={() => handleImgSelector(idx)}
        className="bg-[#fff9e5] p-1 flex transition-all duration-300 justify-center items-center rounded-lg max-w-[72px] aspect-square max-h-[72px]"
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
