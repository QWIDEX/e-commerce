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

export default separateThousands;
