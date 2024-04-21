import React from "react";
import s from "./BasketItem.module.scss";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  removeFromBasket,
  IncrementItem,
  DecrementItem,
} from "../../store/reducers/basketSlice";

interface BasketItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  count: number;
  selectedSize: string;
}

const BasketItem: React.FC<BasketItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  selectedSize,
}) => {
  const { count } = useAppSelector((state) =>
    state.basketSlice.itemsBasket.find((item) => item.id === id)
  );
  const dispatch = useAppDispatch();

  const reducedPrice = (): number => {
    const result = price * count;
    const fixedNumber = parseFloat(result.toFixed(2));
    return fixedNumber;
  };

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      IncrementItem({
        id,
        name,
        description,
        price,
        imageUrl,
        count,
        size: selectedSize,
      })
    );
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (count > 1) {
      dispatch(
        DecrementItem({
          id,
          name,
          description,
          price,
          imageUrl,
          count,
          size: selectedSize,
        })
      );
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      removeFromBasket({
        id,
        name,
        description,
        price,
        imageUrl,
        count,
        size: selectedSize,
      })
    );
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
            <p className={s.item_count}>{count}</p>
            <button
              onClick={(e) => handleIncrement(e)}
              className={s.button_quantity}
            >
              +
            </button>
          </div>

          <div className={s.remove_container}>
            <button onClick={(e) => handleRemove(e)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
