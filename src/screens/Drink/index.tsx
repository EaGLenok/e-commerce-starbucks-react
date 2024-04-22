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
  const { selectedSize } = useAppSelector((state) => state.sizeAndCountSlice);

  useEffect(() => {
    dispatch(fetchSingleDrink({ id: parseInt(id) }));
  }, [dispatch, id]);

  const { item: drinks, status } = useAppSelector(
    (state) => state.singleDrinkSlice
  );

  const addToBasketFn = () => {
    const drink = drinks[0];
    const selectedPrice = drink.priceSize[selectedSize];
    if (!selectedPrice) {
      console.error("Selected size price not found.");
      return;
    }
    const drinkItemToAdd = {
      id: drink.id,
      name: drink.name,
      description: drink.description,
      price: selectedPrice,
      imageUrl: drink.imageUrl,
      count: 1,
      size: selectedSize,
    };
    dispatch(addToBasket(drinkItemToAdd));
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
      <div className={s.drink_main_container}>
        <div className={s.drink_image_container}>
          <img
            src={drink.imageUrl}
            alt={drink.name}
            className={s.drink_image}
          />
        </div>
        <div className={s.drink_description_container}>
          <p>{drink.description}</p>
        </div>
        <div className={s.drink_size_current}></div>
      </div>
      <div className={s.drink_actions_container}>
        <div className={s.drink_size_container}>
          <div className={s.drink_sizes}>
            <TypeDrink />
            <div className={s.drink_add_container}>
              <button
                onClick={() => addToBasketFn()}
                className={s.add_to_basket_btn}
              >
                Add to Basket
              </button>
              <p>${drink.priceSize[selectedSize]}</p>
            </div>
          </div>
        </div>
        <div className={s.drink_choose_container}></div>
      </div>
    </div>
  );
};

export default Drink;
