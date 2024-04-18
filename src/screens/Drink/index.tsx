import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchSingleDrink } from "../../store/reducers/singleDrinkSlice";

const Drink: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleDrink({ id: parseInt(id) }));
  }, [dispatch, id]);

  const { item: drinks, status } = useAppSelector(
    (state) => state.singleDrinkSlice
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" || !drinks || drinks.length === 0) {
    return <div>N/A</div>;
  }

  const drink = drinks[0];

  return <div>.</div>;
};

export default Drink;
