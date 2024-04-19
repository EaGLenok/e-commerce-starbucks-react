import React, { useEffect } from "react";
import s from "./Basket.module.scss";
import { useAppSelector } from "../../store/hooks";
import BasketItem from "../BasketItem";
import CloseIcon from "@mui/icons-material/Close";
import sorrySvg from "../../assets/icons8-sad-smile-96.png";

interface BasketProps {
  isBasketOpen: boolean;
  setBasketOpen: (open: boolean) => void;
}

const Basket: React.FC<BasketProps> = ({ isBasketOpen, setBasketOpen }) => {
  const { itemsBasket } = useAppSelector((state) => state.basketSlice);

  const handlerStopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const onCloseFn = () => {
    setBasketOpen(!isBasketOpen);
  };

  return (
    <div
      onClick={(e) => handlerStopPropagation(e)}
      className={`${s.basket_container} ${isBasketOpen ? s.open : s.closed}`}
    >
      {itemsBasket.length === 0 && (
        <div className={s.empty_basket}>
          <img src={sorrySvg} alt={sorrySvg} />
          Sorry, but you don't have any drinks
        </div>
      )}
      <div className={s.basket_content}>
        <div className={s.basket_item}>
          {itemsBasket.length > 0 &&
            itemsBasket.map((el, index) => (
              <BasketItem
                id={el.id}
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
        <CloseIcon onClick={onCloseFn} color="action" />
      </div>
    </div>
  );
};

export default Basket;
