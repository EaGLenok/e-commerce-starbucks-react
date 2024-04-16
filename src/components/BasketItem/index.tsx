import React from "react";
import s from "./BasketItem.module.scss";

interface BasketItem {
  name: string;
  description: string;
  price: number;
  date_added: string;
  imageUrl: string;
  count: number;
}

const BasketItem: React.FC<BasketItem> = ({
  name,
  description,
  price,
  date_added,
  imageUrl,
  count,
}) => {
  return (
    <div className={s.basket_items}>
      <div className={s.basket_item}>
        <div className={s.image_container}>
          <img width={130} height={130} src={imageUrl} alt={imageUrl} />
        </div>
        <div className={s.item_details}>
          <p>{name}</p>
          <p>{price}</p>
          <p>{count}</p>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
