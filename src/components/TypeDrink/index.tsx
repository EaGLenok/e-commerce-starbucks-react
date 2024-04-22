import React, { useState } from "react";
import s from "./TypeDrink.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSize } from "../../store/reducers/sizeAndCountSlice";

const TypeDrink: React.FC = () => {
  const sizes = ["SHORT", "TALL", "GRANDE", "VENTI"];
  const dispatch = useAppDispatch();
  const { selectedSize } = useAppSelector((state) => state.sizeAndCountSlice);
  const [activeIndex, setActiveIndex] = useState(sizes.indexOf(selectedSize));

  const onSelectSize = (index: number) => {
    dispatch(selectSize(sizes[index]));
    setActiveIndex(index);
  };

  const getCircleSize = (index: number) => {
    const circleSizes = [60, 90, 70, 90]; // Размеры шарика для каждого размера
    return circleSizes[index];
  };

  const getCirclePosition = (index: number) => {
    const imageWidths = [32, 10, 51, 59]; // Ширины изображений для каждого размера
    const spacing = 30; // Промежуток между изображениями
    let position = 28; // Начальное положение для SHORT
    for (let i = 0; i < index; i++) {
      position += imageWidths[i] + spacing;
    }
    return position;
  };

  const getImageSrc = (size: string) => {
    switch (size) {
      case "SHORT":
        return "https://i.imgur.com/b01OcrP.png";
      case "TALL":
        return "https://i.imgur.com/woDH6MH.png";
      case "GRANDE":
        return "https://i.imgur.com/p7XE5FO.png";
      case "VENTI":
        return "https://i.imgur.com/jx4nuve.png";
      default:
        return "";
    }
  };

  return (
    <div className={s.sizes_card}>
      {sizes.map((size, index) => (
        <div
          key={index}
          className={`${s.size_option} ${
            activeIndex === index ? s.active : s.no_active_size
          }`}
          onClick={() => onSelectSize(index)}
        >
          <img
            src={getImageSrc(size)}
            alt={`${size} drink`}
            className={s.drink_image}
          />
          <p>{size}</p>
        </div>
      ))}
      <div
        className={s.circle}
        style={{
          width: `${getCircleSize(activeIndex)}px`,
          height: `${getCircleSize(activeIndex)}px`,
          left: `${getCirclePosition(activeIndex)}px`,
          transition: "left 0.3s cubic-bezier(1, 0, 0, 1)",
        }}
      />
    </div>
  );
};

export default TypeDrink;
