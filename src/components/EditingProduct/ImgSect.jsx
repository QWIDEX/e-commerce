import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const ImgSect = ({ imgs }) => {
  const [swiper, setSwiper] = useState(null);
  const [slideSelected, setSlideSelected] = useState(0);
  const wrapperRef = useRef();
  const [swiperWidth, setSwiperWidth] = useState(500);

  const [editingImgs, setEditingImgs] = useState(imgs);

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

  const handleImgUpdate = (img, idx) => {
    setEditingImgs([
      ...editingImgs.slice(0, idx),
      img ? URL.createObjectURL(img) : undefined,
      ...editingImgs.slice(idx + 1),
    ]);
  };

  const handleDeleteImg = (idx) => {
    setEditingImgs([
      ...editingImgs.slice(0, idx),
      ...editingImgs.slice(idx + 1),
    ]);
  };

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col-reverse lg-sm:flex-row min-w-0 lg-sm:min-w-[445px] justify-center gap-8 w-full lg-sm:w-1/2 px-[auto] "
    >
      <div className="flex justify-center">
        <div className="flex flex-row lg-sm:flex-col lg-sm:justify-start min-w-[70px] lg-sm:max-w-[80px] gap-8 overflow-x-auto overflow-y-auto max-h-[500px]">
          {editingImgs.map((img, idx) => {
            return (
              <ImgSelector
                key={idx}
                selected={slideSelected === idx}
                img={img}
                idx={idx}
                handleImgSelector={handleImgSelector}
              />
            );
          })}

          <button
            onClick={() => handleImgUpdate(undefined, editingImgs.length + 1)}
            className="bg-[#fff9e5] p-1 flex transition-all border-[2px] border-transparent min-w-[64px] duration-300 justify-center items-center rounded-lg max-w-[72px] w-full aspect-square max-h-[72px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto lg-sm:mx-0" style={{ width: swiperWidth }}>
        <Swiper
          slidesPerView={1}
          width={swiperWidth}
          className="h-full"
          spaceBetween={50}
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(e) => setSlideSelected(e.activeIndex)}
        >
          {editingImgs.map((img, idx) => (
            <SwiperSlide key={idx}>
              <SlideImg
                img={img}
                idx={idx}
                handleImgUpdate={handleImgUpdate}
                handleDeleteImg={handleDeleteImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImgSect;

const ImgSelector = ({ img, idx, handleImgSelector, selected }) => {
  return (
    <div
      className="p-0.5 transition-all duration-300 rounded-lg"
      style={
        selected
          ? { border: "2px solid black" }
          : { border: "2px solid transparent" }
      }
    >
      <button
        onClick={() => handleImgSelector(idx)}
        className="bg-[#fff9e5] p-1 flex transition-all min-w-[64px] duration-300 justify-center items-center rounded-lg max-w-[72px] w-full aspect-square max-h-[72px]"
      >
        <img src={img} alt="" />
      </button>
    </div>
  );
};

const SlideImg = ({ img, idx, handleImgUpdate, handleDeleteImg }) => {
  return (
    <label className="bg-[#fff9e5] relative p-5 rounded-lg max-w-[480px] min-w-[50%] w-fit mx-auto flex justify-center items-center aspect-square">
      <input
        type="file"
        onChange={(e) => handleImgUpdate(e.target.files[0], idx)}
        name="img"
        files={[img]}
        id={`slideImg-${idx}`}
        accept=".png, .jpg"
        className="slideImg hidden"
      />
      {img ? (
        <img
          className="bg-[#fff9e5] rounded-lg w-full md:w-1/2"
          src={img}
          alt=""
        />
      ) : (
        <div className="bg-[#fff9e5] h-full rounded-lg w-full md:w-1/2 "></div>
      )}
      <button
        className="absolute top-5 right-5"
        onClick={() => handleDeleteImg(idx)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            className="hover:fill-red-500 transition-all duration-300"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
          />
        </svg>
      </button>
    </label>
  );
};
