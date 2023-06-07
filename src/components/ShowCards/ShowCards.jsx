import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import mergeSearchParams from "../../helpers/mergeSearchParams";

const ShowCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [showedCards, setShowedCards] = useState(
    parseInt(searchParams.get("showedCards")) || 16
  );

  function handleShowedCards(e) {
    const showedCards = e.target.value;
    if (showedCards >= 20) {
      setShowedCards(20);
      setSearchParams(mergeSearchParams(searchParams, { showedCards: 20 }));
    } else {
      setShowedCards(showedCards);
      navigate(
        `/shop/?${mergeSearchParams(searchParams, {
          showedCards: showedCards,
        })}`,
        { replace: true }
      );
    }
  }

  return (
    <label className="text-xl mr-2">
      Show
      <input
        type="number"
        min={0}
        max={20}
        value={showedCards}
        onInput={(e) => handleShowedCards(e)}
        className="ml-2 w-[4.5ch] text-[#9f9f9f] px-3 text-lg py-1"
      />
    </label>
  );
};

export default ShowCards;
