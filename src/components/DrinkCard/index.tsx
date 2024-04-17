import React from "react";
import s from "./DrinkCard.module.scss";
import { Link } from "react-router-dom";

interface DrinkCardProps {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isSelected: boolean;
  onSelect: () => void;
  addToBasket: () => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  sizes: string[];
}

const DrinkCard: React.FC<DrinkCardProps> = ({
  name,
  description,
  imageUrl,
  price,
  isSelected,
  onSelect,
  addToBasket,
  selectedSize,
  onSelectSize,
  sizes,
}) => {
  return (
    <div
      className={isSelected ? s.drink_card_selected : s.drink_card}
      onClick={onSelect}
    >
      <img src={imageUrl} height={200} width={200} alt={name} />
      <div className={isSelected ? s.text_container_modify : s.text_container}>
        <p className={isSelected ? s.title_card_modify : s.title_card}>
          {name}
        </p>
        {isSelected ? undefined : (
          <p className={s.description_card}>{description}</p>
        )}
      </div>
      {isSelected && (
        <div className={s.sizes_card}>
          {sizes.map((size, index) => (
            <div
              key={index}
              className={selectedSize === size ? s.active : s.no_active_size}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation();
                onSelectSize(size);
              }}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      )}
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
        <Link to={`/${name}`}>
          <p className={s.more_info}>More information</p>
        </Link>
      </div>
    </div>
  );
};

export default DrinkCard;
