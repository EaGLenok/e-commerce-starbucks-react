import React, { useState, useEffect, useRef } from "react";
import s from "./TypeDrink.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSize } from "../../store/reducers/sizeAndCountSlice";

const TypeDrink: React.FC = () => {
  const sizes = ["SHORT", "TALL", "GRANDE", "VENTI"];
  const dispatch = useAppDispatch();
  const { selectedSize } = useAppSelector((state) => state.sizeAndCountSlice);
  const [activeIndex, setActiveIndex] = useState(
    sizes.indexOf(selectedSize) >= 0 ? sizes.indexOf(selectedSize) : 0
  );
  const sizesCardRef = useRef<HTMLDivElement>(null);
  const [circleLeftPosition, setCircleLeftPosition] = useState("0px");
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  optionRefs.current = sizes.map((_, i) => optionRefs.current[i] ?? null);

  const updateCirclePosition = () => {
    const currentOption = optionRefs.current[activeIndex];
    if (currentOption) {
      const { left, width } = currentOption.getBoundingClientRect();
      const { left: parentLeft } =
        sizesCardRef.current!.getBoundingClientRect();
      setCircleLeftPosition(`${left - parentLeft + width / 2 - 5 - 0.3}px`);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateCirclePosition);
    return () => window.removeEventListener("resize", updateCirclePosition);
  }, []);

  useEffect(() => {
    updateCirclePosition();
  }, [activeIndex, sizes]);

  useEffect(() => {
    if (selectedSize === undefined || selectedSize === "") {
      dispatch(selectSize(sizes[0]));
    }
    setActiveIndex(sizes.indexOf(selectedSize));
  }, [selectedSize, dispatch, sizes]);

  const onSelectSize = (size: string) => {
    dispatch(selectSize(size));
  };

  const getImageSrc = (size: string) => "https://i.imgur.com/1UcyePM.png";

  return (
    <div className={s.container}>
      <h2 className={s.title}>Sizes Options</h2> {/* Добавлен заголовок */}
      <div ref={sizesCardRef} className={s.sizesCard}>
        {sizes.map((size, index) => (
          <div
            key={size}
            ref={(el) => (optionRefs.current[index] = el)}
            className={`${s.sizeOption} ${
              activeIndex === index ? s.active : ""
            }`}
            onClick={() => onSelectSize(size)}
          >
            <img
              src={getImageSrc(size)}
              alt={`${size} size drink`}
              className={s.drinkImage}
            />
            <p>{size}</p>
          </div>
        ))}
        <div
          className={s.indicatorCircle}
          style={{ left: circleLeftPosition }}
        />
      </div>
    </div>
  );
};

export default TypeDrink;
