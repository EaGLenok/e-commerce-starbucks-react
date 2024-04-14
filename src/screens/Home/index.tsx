import React from "react";
import s from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDrinks } from "../../store/reducers/drinkSlice";

const Home = () => {
  const { items } = useAppSelector((state) => state.drinksSlice);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  return (
    <div className="home">
      <div className={s.circle_absolute}> </div>
      <div className={s.title_container}>
        <h1 className={s.title}>
          The hottest hour <br />
          of the year
        </h1>
        <div className="content">
          {items.map((el, index) => (
            <div key={el.imageUrl} className="cart_item">
              <img src={el.imageUrl} alt={el.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
