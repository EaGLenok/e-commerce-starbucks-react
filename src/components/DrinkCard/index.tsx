import React, { useState } from "react";
import s from "./DrinkCard.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { addToBasket } from "../../store/reducers/basketSlice";

interface DrinkCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  priceSize: {
    SHORT: number;
    TALL: number;
    GRANDE: number;
    VENTI: number;
  };
}

const DrinkCard: React.FC<DrinkCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  priceSize,
}) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(1);

  const handleAddToBasket = () => {
    const obj = {
      id,
      name,
      description,
      imageUrl,
      price: priceSize.SHORT,
      count,
      size: "SHORT",
    };
    dispatch(addToBasket(obj));
    console.log(obj);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className={s.drink_card}>
      <Link className={s.more_info} to={`/${id}`}>
        <div className={s.img_container}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={s.text_container}>
        <p className={s.title_card}>{name}</p>
        <p className={s.description_card}>{description}</p>
      </div>
      <div className={s.actions_card}>
        <button onClick={handleAddToBasket} className={s.add_to_basket}>
          Add to Basket
        </button>
        <div className={s.counter}>
          <svg
            onClick={handleDecrement}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 18.48C6.86402 18.48 3.52002 15.136 3.52002 11C3.52002 6.86402 6.86402 3.52002 11 3.52002C15.136 3.52002 18.48 6.86402 18.48 11C18.48 15.136 15.136 18.48 11 18.48ZM11 4.40002C7.34802 4.40002 4.40002 7.34802 4.40002 11C4.40002 14.652 7.34802 17.6 11 17.6C14.652 17.6 17.6 14.652 17.6 11C17.6 7.34802 14.652 4.40002 11 4.40002Z"
              fill="black"
            />
            <path
              d="M7.03998 10.5601H14.96V11.4401H7.03998V10.5601Z"
              fill="black"
            />
          </svg>

          <p>{count}</p>

          <svg
            onClick={handleIncrement}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 18.48C6.86402 18.48 3.52002 15.136 3.52002 11C3.52002 6.86402 6.86402 3.52002 11 3.52002C15.136 3.52002 18.48 6.86402 18.48 11C18.48 15.136 15.136 18.48 11 18.48ZM11 4.40002C7.34802 4.40002 4.40002 7.34802 4.40002 11C4.40002 14.652 7.34802 17.6 11 17.6C14.652 17.6 17.6 14.652 17.6 11C17.6 7.34802 14.652 4.40002 11 4.40002Z"
              fill="black"
            />
            <path
              d="M7.03998 10.5601H14.96V11.4401H7.03998V10.5601Z"
              fill="black"
            />
            <path d="M10.56 7.04004H11.44V14.96H10.56V7.04004Z" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
