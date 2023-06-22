import React from 'react'

const ChekoutProductCard = ({ product }) => {
    const { label, quantity, price } = product;
  
    const separateThousands = (number) => {
      const reversedNumber = String(number).split("").reverse();
      let result = "";
  
      for (let i = 0; i < reversedNumber.length; i++) {
        if (i % 3 === 0 && i !== 0) {
          result += ",";
        }
        result += reversedNumber[i];
      }
  
      return result.split("").reverse().join("");
    };
  
    return (
      <>
        <div className="flex items-center gap-2">
          <h6>{label}</h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z"
            />
          </svg>
          <p className="text-base">{quantity}</p>
        </div>
        <p className="text-end font-medium">{separateThousands(price * quantity)}</p>
      </>
    );
  };
  

export default ChekoutProductCard
