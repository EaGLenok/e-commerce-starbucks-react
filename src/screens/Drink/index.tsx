import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchSingleDrink } from "../../store/reducers/singleDrinkSlice";
import { addToBasket } from "../../store/reducers/basketSlice";
import TypeDrink from "../../components/TypeDrink";
import s from "./Drink.module.scss";

const Drink: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { selectedSize } = useAppSelector((state) => state.sizesSlice);

  useEffect(() => {
    dispatch(fetchSingleDrink({ id: parseInt(id) }));
  }, [dispatch, id]);

  const { item: drinks, status } = useAppSelector(
    (state) => state.singleDrinkSlice
  );

  const addToBasketFn = () => {
    dispatch(
      addToBasket({
        ...drink,
        count: 1,
        size: selectedSize,
      })
    );
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || !drinks || drinks.length === 0) {
    return <div>N/A</div>;
  }

  const drink = drinks[0];

  return (
    <div className={s.drink}>
      <div className={s.drink_container}>
        <div className={s.drink_main_container}>
          <div className={s.drink_description}>
            <div className={s.drink_description_container}>
              <h1 className={s.drink_title}>{drink.name}</h1>
              <p className={s.drink_description_text}>{drink.description}</p>
            </div>
            <div className={s.drink_small_img_container}>
              <img
                className={s.drink_small_img}
                height={60}
                width={60}
                src={drink.imageUrl}
                alt="Drink Image"
              />
            </div>
          </div>
          <div className={s.drink_circel_container}>
            <div className={s.drink_circel_info}>
              <img
                className={s.drink_medium_img}
                height={250}
                width={250}
                src={drink.imageUrl}
                alt="Drink Image"
              />
              <p className={s.drink_price}>$ {drink.price}</p>
            </div>
          </div>
          <div className={s.drink_actions_container}>
            <div className={s.drink_sizes}>
              <TypeDrink isDrinkPage={true} />
            </div>
            <div className={s.drink_add_button}>
              <button onClick={() => addToBasketFn()}>ADD TO BASKET</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drink;
