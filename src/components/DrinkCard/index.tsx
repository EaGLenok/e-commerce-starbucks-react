import React from "react";
import s from "./DrinkCard.module.scss";
import { Link } from "react-router-dom";
import TypeDrink from "../TypeDrink";

interface DrinkCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  addToBasket: () => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  price,
  addToBasket,
}) => {
  return (
    <div className={s.drink_card}>
      <Link className={s.more_info} to={`/${id}`}>
        <div className={s.img_container}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={s.text_container}>
        <p className={s.title_card}>{name}</p>
        <p className={s.description_card}>{description}</p>
      </div>
      <div className={s.actions_card}>
        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            addToBasket();
          }}
          className={s.add_to_cart}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default DrinkCard;
