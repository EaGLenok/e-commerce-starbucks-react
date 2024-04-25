import React, { useEffect } from "react";
import s from "./Basket.module.scss";
import { useAppSelector } from "../../store/hooks";
import BasketItem from "../BasketItem";
import CloseIcon from "@mui/icons-material/Close";
import sorrySvg from "../../assets/icons8-sad-smile-96.png";
import { Link } from "react-router-dom";

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

  const reducedPrice = () => {
    return itemsBasket.reduce((acc, item) => acc + item.price * item.count, 0);
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
        {itemsBasket.length !== 0 && <h1>BASKET</h1>}
        <div className={s.basket_item}>
          {itemsBasket.length > 0 &&
            itemsBasket.map((el, index) => (
              <BasketItem
                id={el.id}
                name={el.name}
                description={el.description}
                price={el.price}
                imageUrl={el.imageUrl}
                count={el.count}
                selectedSize={el.size}
                currentIce={el.currentIce}
                currentPumps={el.currentPumps}
                flavor={el.flavor}
                currentTopping={el.currentTopping}
                key={index}
              />
            ))}
        </div>
      </div>

      {itemsBasket.length >= 1 && (
        <div className={s.basket_checkout}>
          <div className={s.information_container}>
            <div className={s.names_container}>
              <p>
                Products <span>({itemsBasket.length}) </span>
              </p>
              <p>Delivery</p>
            </div>
            <div className={s.values_container}>
              <p className={s.products_value}>{reducedPrice()}$</p>
              <p className={s.delivery_price}>Free</p>
            </div>
          </div>
          <div className={s.total_price_container}>
            <div className={s.price_name}>
              <p>Order price</p>
            </div>
            <div className={s.price_value}>
              {" "}
              <p>{reducedPrice()}$</p>
            </div>
          </div>

          <div className={s.button_container}>
            <Link to="/checkout">
              <button className={s.checkout_btn}>GO TO CHECKOUT</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
