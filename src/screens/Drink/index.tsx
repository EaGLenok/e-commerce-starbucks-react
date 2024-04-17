import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Drink: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  // ТЕБЕ НАДО СДЕЛАЙ РЕДЮСЕР, ЧТОБЫ ОН ФЕТЧИЛ ПО НЕЙМУ НАПИТОК, А ПОТОМ ЧЕРЕЗ СЕЛЕКТОР БРАТЬ ЕГО СЮДА
  const drinks = useAppSelector((state) => state.drinksSlice.items);

  const drink = drinks.find((item) => item.name === name);

  if (!drink) {
    return <div>N/A</div>;
  }

  return (
    <div>
      <h2>{drink.name}</h2>
      <p>{drink.description}</p>
      {/* Остальные данные о напитке */}
    </div>
  );
};

export default Drink;
