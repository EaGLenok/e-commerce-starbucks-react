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
  imageUrl: string;
  count: number;
  price: number;
  selectedSize: string;
  flavor: string;
  currentIce: string;
  currentPumps: number;
  currentTopping: string;
}

const BasketItem: React.FC<BasketItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  selectedSize,
  flavor,
  currentIce,
  currentPumps,
  currentTopping,
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

  const objToPush = {
    id,
    name,
    description,
    price,
    imageUrl,
    count,
    size: selectedSize,
    currentIce,
    currentPumps,
    flavor,
    currentTopping,
  };

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(IncrementItem(objToPush));
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (count > 1) {
      dispatch(DecrementItem(objToPush));
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeFromBasket(objToPush));
  };

  return (
    <div className={s.basket_item}>
      <div className={s.upper_container}>
        <img src={imageUrl} alt={name} className={s.item_image} />
        <div className={s.item_info}>
          <h3 className={s.item_name}>{name}</h3>
          <p className={s.item_size}>{selectedSize}</p>
          <p className={s.item_currentIce}>{currentIce}</p>
          <p className={s.item_currentTopping}>{currentTopping}</p>
          <p className={s.item_currentPumps}>
            {" "}
            {flavor} (x{currentPumps})
          </p>
        </div>
      </div>
      <div className={s.down_container}>
        <div className={s.price_container}>{reducedPrice()} $</div>
        <div className={s.quantity_container}>
          <button onClick={handleDecrement}>-</button>
          <p className={s.item_count}>{count}</p>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </div>
  );
};
export default BasketItem;
