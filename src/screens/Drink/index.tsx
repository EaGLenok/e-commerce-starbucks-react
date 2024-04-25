import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchSingleDrink } from "../../store/reducers/singleDrinkSlice";
import { addToBasket } from "../../store/reducers/basketSlice";
import {
  decrementPumps,
  incrementPumps,
  selectIce,
  selectSize,
  selectTopping,
} from "../../store/reducers/templateDataSlice";
import TypeDrink from "../../components/TypeDrink";
import s from "./Drink.module.scss";
import DrinkCard from "../../components/DrinkCard";
import { fetchDrinks } from "../../store/reducers/drinkSlice";

const Drink: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<string>();
  const { items } = useAppSelector((state) => state.drinksSlice);
  const { selectedSize, currentIce, currentPumps, currentTopping, category } =
    useAppSelector((state) => state.templateDataSlice);

  useEffect(() => {
    dispatch(fetchSingleDrink({ id: parseInt(id) }));
    dispatch(fetchDrinks({ categoryParam: category }));
  }, [dispatch, id, category]);

  const { item: drinks, status } = useAppSelector(
    (state) => state.singleDrinkSlice
  );

  const addToBasketFn = () => {
    if (!fixedNumber) {
      console.error("Selected size price not found.");
      return;
    }
    const drinkItemToAdd = {
      id: drink.id,
      name: drink.name,
      description: drink.description,
      price: fixedNumber,
      imageUrl: drink.imageUrl,
      count: 1,
      flavor: drink.flavor,
      size: selectedSize,
      currentIce: currentIce,
      currentPumps: currentPumps,
      currentTopping:
        currentTopping === "None" ? drink.toppings[1] : currentTopping,
    };
    dispatch(addToBasket(drinkItemToAdd));
    dispatch(selectIce("Ice"));
    dispatch(selectTopping("None"));
    dispatch(selectSize("SHORT"));
  };

  const handleChangeIce = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectIce(e.target.value));
  };
  const handleChangeTopping = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectTopping(e.target.value));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || !drinks || drinks.length === 0) {
    return <div>N/A</div>;
  }

  const drink = drinks[0];
  const iceCheck = currentIce === "Extra Ice" ? 1.12 : 0;
  const priceCorrect =
    drink.priceSize[selectedSize] + currentPumps * 0.5 + iceCheck;
  const fixedNumber = parseFloat(priceCorrect.toFixed(2));

  return (
    <div className={s.drink}>
      <div className={s.drink_title_container}>
        <h1>{drink.name}</h1>
      </div>
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
              <p>${fixedNumber}</p>
            </div>
          </div>
        </div>
        <div className={s.drink_choose_container}>
          <h1>What's included</h1>
          <div className={s.flavor_container}>
            <div className={s.flavor}>{drink.flavor}</div>
            <div className={s.pumps}>
              <button onClick={() => dispatch(decrementPumps(1))}>-</button>
              <p>{currentPumps}</p>
              <button onClick={() => dispatch(incrementPumps(1))}>+</button>
            </div>
          </div>
          <label className={s.topping_label}>
            <p className={s.topping_p}>TOPPINGS</p>
            <select
              onChange={(e) => handleChangeTopping(e)}
              className={s.topping_select}
            >
              {drink.toppings.map((topping, index) => (
                <option key={index} value={topping}>
                  {topping}
                </option>
              ))}
            </select>
          </label>
          <label className={s.ice_label}>
            <p className={s.ice_p}>ADD ICE</p>
            <select
              onChange={(e) => handleChangeIce(e)}
              value={currentIce}
              className={s.ice_select}
            >
              <option value="Ice">Ice</option>
              <option value="Extra Ice">Extra Ice</option>
              <option value="No Ice">No Ice</option>
            </select>
          </label>
        </div>
      </div>
      <div className={s.drink_recc_container}>
        <h2>Recommended Drinks</h2>
        <div className={s.drink_items_content}>
          {items
            .map((el, index) => (
              <DrinkCard
                key={el.name + index}
                id={el.id}
                name={el.name}
                description={el.description}
                priceSize={el.priceSize}
                imageUrl={el.imageUrl}
                flavor={el.flavor}
                toppings={el.toppings}
              />
            ))
            .splice(0, 4)}
        </div>
      </div>
    </div>
  );
};

export default Drink;
