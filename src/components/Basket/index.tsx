import React from "react";
import s from "./Basket.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BasketItem from "../BasketItem";

const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const { itemsBasket } = useAppSelector((state) => state.basketSlice);

  return (
    <div className={s.basket_container}>
      <div className={s.basket_content}>
        <div className={s.basket_item}>
          {itemsBasket.map((el: BasketItem, index) => (
            <BasketItem
              name={el.name}
              description={el.description}
              price={el.price}
              date_added={el.date_added}
              imageUrl={el.imageUrl}
              count={el.count}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className={s.basket_close}></div>
    </div>
  );
};

export default Basket;
