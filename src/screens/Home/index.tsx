import React, { useState } from "react";
import s from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDrinks } from "../../store/reducers/drinkSlice";
import DrinkCard from "../../components/DrinkCard";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.drinksSlice);
  const { category } = useAppSelector((state) => state.templateDataSlice);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    dispatch(
      fetchDrinks({ categoryParam: category, page: currentPage, limit: 7 })
    );
  }, [dispatch, category, currentPage]);

  return (
    <div className={s.home}>
      <div className={s.title_container}>
        <h1 className={s.title}>
          The hottest time <br />
          of the year
        </h1>
      </div>
      <div className={s.content_container}>
        <div className={s.content}>
          {items.map((el, index) => (
            <DrinkCard
              key={el.name + index}
              id={el.id}
              еу
              name={el.name}
              description={el.description}
              priceSize={el.priceSize}
              imageUrl={el.imageUrl}
              flavor={el.flavor}
              toppings={el.toppings}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
