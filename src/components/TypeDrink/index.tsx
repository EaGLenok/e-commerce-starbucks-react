import React, { useState } from "react";
import s from "./TypeDrink.module.scss";
import { Link } from "react-router-dom";

interface TypeDrinkProps {
  selectedSize: string;
  onSelectSize: (size: string, event: any) => void;
  sizes: string[];
}

const TypeDrink: React.FC<TypeDrinkProps> = ({
  selectedSize,
  onSelectSize,
  sizes,
}) => {
  return (
    <div className={s.sizes_card}>
      {sizes.map((size, index) => (
        <div
          key={index}
          className={selectedSize === size ? s.active : s.no_active_size}
          onClick={(event) => onSelectSize(size, event)}
        >
          <p>{size}</p>
        </div>
      ))}
    </div>
  );
};

export default TypeDrink;
