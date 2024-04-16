import React from "react";
import s from "./Basket.module.scss";

const Basket = () => {
  return (
    <div className={s.basket_container}>
      <div className={s.basket_content}>Basket Items Here</div>
      <div className={s.basket_close}>Close</div>
    </div>
  );
};

export default Basket;
