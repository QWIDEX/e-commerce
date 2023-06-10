import React from "react";

const BenefitsBlock = () => {
  return (
    <div className="flex my-10 px-[10%] gap-10 flex-wrap py-24 w-full bg-[#FAF4F4] justify-around">
      <div className="max-w-xs">
        <h2 className="text-3xl font-medium leading-normal">Free Delivery</h2>
        <p className="text-[#9F9F9F] text-xl">
          For all oders over $50, consectetur adipim scing elit.
        </p>
      </div>
      <div className="max-w-xs">
        <h2 className="text-3xl font-medium leading-normal">90 Days Return</h2>
        <p className="text-[#9F9F9F] text-xl">
          If goods have problems, consectetur adipim scing elit.
        </p>
      </div>
      <div className="max-w-xs">
        <h2 className="text-3xl font-medium leading-normal">Secure Payment</h2>
        <p className="text-[#9F9F9F] text-xl">
          100% secure payment, consectetur adipim scing elit.
        </p>
      </div>
    </div>
  );
};

export default BenefitsBlock;
