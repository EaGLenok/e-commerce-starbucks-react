import React from "react";

const DrinkCard = () => {
  const sizes = ["SHORT", "TAIL", "GRANDE", "VENTI"];
  return (
    <div className="drink_card">
      <div className="drink_card_inner">
        <img src="" alt="" />
        <p className="title_card"></p>
        <p className="description_card"></p>
        <div className="sizes_card"></div>
        <div className="actions_card">
          <button className="add_to_cart">Add to Basket</button>
          <p>More information</p>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
