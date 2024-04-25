import React, { useState, useEffect, useRef } from "react";
import s from "./TypeDrink.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSize } from "../../store/reducers/templateDataSlice";

const TypeDrink: React.FC = () => {
  const sizes = ["SHORT", "TALL", "GRANDE", "VENTI"];
  const dispatch = useAppDispatch();
  const { selectedSize } = useAppSelector((state) => state.templateDataSlice);
  const [activeIndex, setActiveIndex] = useState(
    sizes.indexOf(selectedSize) >= 0 ? sizes.indexOf(selectedSize) : 0
  );
  const sizesCardRef = useRef<HTMLDivElement>(null);
  const [circleLeftPosition, setCircleLeftPosition] = useState("0px");
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [lineLeftPosition, setLineLeftPosition] = useState("0px");

  optionRefs.current = sizes.map((_, i) => optionRefs.current[i] ?? null);
  const updateCirclePosition = () => {
    const currentOption = optionRefs.current[activeIndex];
    if (currentOption && sizesCardRef.current) {
      const { left, width } = currentOption.getBoundingClientRect();
      const { left: parentLeft } = sizesCardRef.current.getBoundingClientRect();
      const circleOffset = 5 + 0.4;
      setCircleLeftPosition(
        `${left - parentLeft + width / 2 - circleOffset}px`
      );

      const additionalLeftOffset = 13;
      const lineOffset = circleOffset - width / 2 + additionalLeftOffset;
      setLineLeftPosition(`${left - parentLeft - lineOffset}px`);
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
      <h1 className={s.title}>Sizes Options</h1>
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
            <div className={s.size_option_container}>
              <p>{size}</p>
            </div>
          </div>
        ))}
        <div
          className={s.indicatorCircle}
          style={{ left: circleLeftPosition }}
        />
        <div
          className={s.movingLine}
          style={{
            left: lineLeftPosition,
            width: `${optionRefs.current[activeIndex]?.clientWidth}px`,
          }}
        />
      </div>
    </div>
  );
};

export default TypeDrink;
