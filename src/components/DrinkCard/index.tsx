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
  isSelected: boolean;
  onSelect: () => void;
  addToBasket: () => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  price,
  isSelected,
  onSelect,
  addToBasket,
}) => {
  return (
    <div
      className={isSelected ? s.drink_card_selected : s.drink_card}
      onClick={onSelect}
    >
      <img src={imageUrl} alt={name} />
      <div className={isSelected ? s.text_container_modify : s.text_container}>
        <p className={isSelected ? s.title_card_modify : s.title_card}>
          {name}
        </p>
        {isSelected ? undefined : (
          <p className={s.description_card}>{description}</p>
        )}
      </div>
      {isSelected && <TypeDrink />}
      <div className={s.actions_card}>
        {isSelected && (
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              addToBasket();
            }}
            className={s.add_to_cart}
          >
            Add to Basket
          </button>
        )}
        <Link className={s.more_info} to={`/${id}`}>
          <p className={s.more_info}>More information</p>
        </Link>
      </div>
    </div>
  );
};

export default DrinkCard;
