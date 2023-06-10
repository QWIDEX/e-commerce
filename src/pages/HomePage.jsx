import React from "react";
import ButtonOutlineBtm from "../components/Reusable/BtnOutlineBtm";
import ButtonOutline from "../components/Reusable/BtnOutline";
import TopPicksForU from "../components/topPicksForU/TopPicksForU";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="pt-24 h-1000px bg-slightly-yellow">
        <div className=" flex justify-center items-center flex-col-reverse max-w-laptop h-full w-full mx-auto md:px-5 md:flex-row">
          <div className="flex justify-center flex-col items-center md:!items-start sm:min-w-361px">
            <h1 className="font-semibold leading-normal text-6xl max-w-md mb-10 text-center md:text-start">
              Rocket single seater
            </h1>
            <Link to='/shop'>
              <ButtonOutlineBtm>Shop Now</ButtonOutlineBtm>{" "}
            </Link>
          </div>
          <img
            src={require("../images/HomePage/Rocket-single-seater-1.png")}
            alt="Rocket-single-seater-1"
            className="w-11/12 max-w-445px md:w-6/12 lg:max-w-681px lg:w-50%"
          />
        </div>
      </section>
      <section className="bg-pink-50 h-1000px md:h-672px">
        <div className="max-w-laptop mx-auto px-5 flex flex-col justify-evenly h-full w-full items-center md:flex-row">
          <div className="flex flex-col md:w-5/12 max-w-md items-center md:!items-start ">
            <img
              src={require("../images/HomePage/Granite-square-side-table-1.png")}
              alt="Granite-square-side-table"
              className="max-w-sm w-full md:w-11/12 md:ml-6 m-0"
            />
            <h2 className="font-medium text-4xl leading-snug mb-6">
              Side Table
            </h2>
            <ButtonOutlineBtm>View More</ButtonOutlineBtm>
          </div>
          <div className="flex flex-col md:w-5/12  max-w-md items-center md:!items-start">
            <img
              src={require("../images/HomePage/Cloud-sofa-three-seater-ottoman_3.png")}
              alt="Granite-square-side-table"
              className="max-w-sm w-full md:w-11/12 md:ml-6 m-0"
            />
            <h2 className="font-medium text-4xl leading-snug mb-6">Sofa</h2>
            <ButtonOutlineBtm>View More</ButtonOutlineBtm>
          </div>
        </div>
      </section>
      <TopPicksForU />
      <section className="bg-yellow-50">
        <div className="max-w-laptop px-5 flex justify-center items-center mx-auto flex-col sm-md:flex-row">
          <img
            src={require("../images/HomePage/Asgaard-sofa-1.png")}
            alt="Asgaard-sofa-1"
            className="block max-w-4xl w-full sm-md:!w-2/3"
          />
          <div className="w-full my-10 sm-md:m-0 sm-ms:!w-1/3 flex justify-center items-center flex-col">
            <h3 className="text-2xl font-medium">New Arrivals</h3>
            <h1 className="text-5xl leading-normal font-bold mb-8 md">
              Asgard sofa
            </h1>
            <ButtonOutline>Order Now</ButtonOutline>
          </div>
        </div>
      </section>
      <section className="bg-no-repeat bg-center bg-cover bg-[url(images/HomePage/Instagram-bg.png)]">
        <div className="max-w-laptop mx-auto flex flex-col items-center py-32">
          <h1 className="leading-normal font-bold text-6xl text-center">
            Our Instagram
          </h1>
          <p className="font-normal leading-normal text-xl pb-4">
            Follow our store on Instagram
          </p>
          <button className="px-20 shadow-xl py-4 leading-normal text-xl font-normal tex rounded-full bg-FAF4F4">
            Follow Us
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
