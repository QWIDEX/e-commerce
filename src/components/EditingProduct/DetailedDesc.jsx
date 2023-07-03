import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "../Review/Review";

const DetailedDesc = ({ product }) => {
  const [swiper, setSwiper] = useState(null);
  const [slideSelected, setSlideSelected] = useState(0);

  const handleSlideSelector = (idx) => {
    swiper.enable();
    swiper.slideTo(idx);
    setSlideSelected(idx);
    swiper.disable();
  };

  useEffect(() => {
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
          <DetailedDescSlide
            descImgs={product.descImgs}
            detailedDesc={product.detailedDesc}
          />
        </SwiperSlide>
        <SwiperSlide>
          <AdditionalInfoSlide additionalInfo={product.additionalInfo} />
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex gap-5">
            {product.reviews.map((review) => (
              <Review review={review} key={review.userId} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const DetailedDescSlide = ({ descImgs = [], detailedDesc }) => {
  const [firstImg, setFirstImg] = useState(descImgs[0]);
  const [secondImg, setSecondImg] = useState(descImgs[1]);
  const [desc, setDesc] = useState(detailedDesc);

  useEffect(() => {
    const textArea = document.getElementById("detailedDesc");
    textArea.style.height = `${textArea.scrollHeight + 10}px`;
  }, []);

  return (
    <>
      <div className="w-3/4 mx-auto">
        <textarea
          className="my-7 w-full border border-gray-200 rounded-lg"
          value={desc}
          id="detailedDesc"
          name="detailedDesc"
          onChange={(e) => {
            e.target.style.height = `${e.target.scrollHeight + 2}px`;

            setDesc(e.target.value);
          }}
        />
      </div>
      <div className="flex md:flex-row flex-col mt-7 gap-7 mx-24">
        <label className="w-1/2">
          <input
            type="file"
            onChange={(e) =>
              setFirstImg(URL.createObjectURL(e.target.files[0]))
            }
            name="firstDescImg"
            accept=".png, .jpg"
            className="hidden deskImg"
          />
          {firstImg ? (
            <img
              className="bg-[#fff9e5] rounded-lg w-full md:w-1/2 h-[400px]"
              src={firstImg}
              alt=""
            />
          ) : (
            <div className="bg-[#fff9e5] rounded-lg w-full md:w-1/2 h-[400px]"></div>
          )}
        </label>
        <label className="w-1/2">
          <input
            type="file"
            onChange={(e) =>
              setSecondImg(URL.createObjectURL(e.target.files[0]))
            }
            name="secondDescImg"
            accept=".png, .jpg"
            className="hidden deskImg"
          />
          {secondImg ? (
            <img
              className="bg-[#fff9e5] rounded-lg w-full md:w-1/2 h-[400px]"
              src={secondImg}
              alt=""
            />
          ) : (
            <div className="bg-[#fff9e5] rounded-lg w-full md:w-1/2 h-[400px]"></div>
          )}
        </label>
      </div>
    </>
  );
};

const AdditionalInfoSlide = ({ additionalInfo }) => {
  const [editngAdditionalInfo, setEditingAdditionalInfo] =
    useState(additionalInfo);

  useEffect(() => {
    const textArea = document.getElementById("additionalInfo");
    textArea.style.height = `${textArea.scrollHeight + 10}px`;
  }, []);

  return (
    <div className="w-3/4 mx-auto ">
      <textarea
        name="additionalInfo"
        id="additionalInfo"
        value={editngAdditionalInfo}
        onChange={(e) => {
          e.target.style.height = `${e.target.scrollHeight + 2}px`;
          setEditingAdditionalInfo(e.target.value);
        }}
        className="my-7 border border-gray-200 w-full rounded-lg"
      ></textarea>
    </div>
  );
};

export default DetailedDesc;
