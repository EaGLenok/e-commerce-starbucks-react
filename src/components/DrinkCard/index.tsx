import React from "react";
import s from "./DrinkCard.module.scss";

interface DrinkCardProps {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isSelected: boolean;
  onSelect: () => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({
  name,
  description,
  imageUrl,
  price,
  isSelected,
  onSelect,
}) => {
  const sizes = ["SHORT", "TALL", "GRANDE", "VENTI"];
  const [selectedSize, setSelectedSize] = React.useState<string>(sizes[0]);

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
              onClick={(event) => {
                event.stopPropagation();
                setSelectedSize(size);
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
            onClick={(event) => event.stopPropagation()}
            className={s.add_to_cart}
          >
            Add to Basket
          </button>
        )}

        <p className={s.more_info}>More information</p>
      </div>
    </div>
  );
};

export default DrinkCard;
