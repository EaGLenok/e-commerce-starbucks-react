import React, { useState } from "react";
import s from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDrinks } from "../../store/reducers/drinkSlice";
import { addToBasket } from "../../store/reducers/basketSlice";
import DrinkCard from "../../components/DrinkCard";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.drinksSlice);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  React.useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  const handleSelectCard = (name: string) => {
    if (selectedCard === name) {
      setSelectedCard(null);
    } else {
      setSelectedCard(name);
    }
  };

  return (
    <div className={s.home}>
      <div className={s.title_container}>
        <h1 className={s.title}>
          The hottest hour <br />
          of the year
        </h1>
      </div>
      <div className={s.content_container}>
        <div className={s.content}>
          {items.map((el, index) => (
            <DrinkCard
              key={el.name + index}
              name={el.name}
              description={el.description}
              price={el.price}
              imageUrl={el.imageUrl}
              isSelected={selectedCard === el.name}
              onSelect={() => handleSelectCard(el.name)}
              addToBasket={() => dispatch(addToBasket({ ...el, count: 1 }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
