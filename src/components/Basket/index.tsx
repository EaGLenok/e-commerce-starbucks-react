import React from "react";
import s from "./Basket.module.scss";
import { useAppSelector } from "../../store/hooks";
import BasketItem from "../BasketItem";
import CloseIcon from "@mui/icons-material/Close";

interface BasketProps {
  isBasketOpen: boolean;
  setBasketOpen: (open: boolean) => void;
}

const Basket: React.FC<BasketProps> = ({ isBasketOpen, setBasketOpen }) => {
  const { itemsBasket } = useAppSelector((state) => state.basketSlice);

  const handlerStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={(e) => handlerStopPropagation(e)}
      className={s.basket_container}
    >
      <div className={s.basket_content}>
        <div className={s.basket_item}>
          {itemsBasket.map((el, index) => (
            <BasketItem
              name={el.name}
              description={el.description}
              price={el.price}
              date_added={el.date_added}
              imageUrl={el.imageUrl}
              count={el.count}
              selectedSize={el.size}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className={s.basket_close}>
        <CloseIcon
          onClick={() => setBasketOpen(!isBasketOpen)}
          color="action"
        />
      </div>
    </div>
  );
};

export default Basket;
