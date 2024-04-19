import React from "react";
import s from "./TypeDrink.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSize } from "../../store/reducers/sizeSlice";

interface TypeDrinkProps {
  isDrinkPage?: boolean;
}

const TypeDrink: React.FC<TypeDrinkProps> = ({ isDrinkPage }) => {
  const sizes = ["SHORT", "TALL", "GRANDE", "VENTI"];
  const dispatch = useAppDispatch();
  const { selectedSize } = useAppSelector((state) => state.sizesSlice);

  const activeClass = isDrinkPage ? s.active_page : s.active;
  const noActiveSizeClass = isDrinkPage
    ? s.no_active_size_page
    : s.no_active_size;

  const onSelectSize = (
    size: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    dispatch(selectSize(size));
  };

  return (
    <div className={s.sizes_card}>
      {sizes.map((size, index) => (
        <div
          key={index}
          className={`${s.size} ${
            selectedSize === size ? activeClass : noActiveSizeClass
          }`}
          onClick={(event) => onSelectSize(size, event)}
        >
          <p>{size}</p>
        </div>
      ))}
    </div>
  );
};

export default TypeDrink;
