import React from "react";
import s from "./BasketItem.module.scss";

interface BasketItemProps {
  name: string;
  description: string;
  price: number;
  date_added: string;
  imageUrl: string;
  count: number;
  selectedSize: string;
}

const BasketItem: React.FC<BasketItemProps> = ({
  name,
  description,
  price,
  date_added,
  imageUrl,
  count,
  selectedSize,
}) => {
  const [itemCount, setItemCount] = React.useState(count);

  const reducedPrice = (): number => {
    const result = price * itemCount;
    const fixedNumber = parseFloat(result.toFixed(2));
    return fixedNumber;
  };

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    setItemCount(itemCount + 1);
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <div className={s.basket_items}>
      <div className={s.basket_item}>
        <div className={s.image_container}>
          <img width={100} height={100} src={imageUrl} alt={imageUrl} />
        </div>
        <div className={s.item_details}>
          <h4>{name}</h4>
          <h5>${reducedPrice()}</h5>
          <p>{selectedSize}</p>
          <div className={s.quantity_container}>
            <button
              onClick={(e) => handleDecrement(e)}
              className={s.button_quantity}
            >
              -
            </button>
            <p className={s.item_count}>{itemCount}</p>
            <button
              onClick={(e) => handleIncrement(e)}
              className={s.button_quantity}
            >
              +
            </button>
          </div>

          <div className={s.remove_container}>
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
