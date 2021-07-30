import React, { useState } from "react";
import { CaraouselWidthStyle } from "styles/carousel";
import { CarouselStateType } from "types";

function CaraouselWidth({ setData }: { setData: Function }) {
  const [value, setValue] = useState(40);

  function validateValue(e: React.ChangeEvent<HTMLInputElement>) {
    const targetValue = Number(e.target.value);

    setValue(targetValue);

    if (targetValue < 10) {
      setData((data: CarouselStateType) => ({ ...data, width: 10 }));
    } else if (targetValue > 90) {
      setData((data: CarouselStateType) => ({ ...data, width: 90 }));
    } else {
      setData((data: CarouselStateType) => ({
        ...data,
        width: targetValue,
      }));
    }
  }

  return (
    <CaraouselWidthStyle>
      <p>Set Width of Image </p>
      <input
        value={value}
        className="carousel__imageWidth"
        onChange={validateValue}
        type="number"
        min="10"
        max="90"
      />
      <div className="carousel__widthContainer">
        <p>Image Width: {value}</p>
        <p>Written Width: {100 - value}</p>
      </div>
    </CaraouselWidthStyle>
  );
}

export default CaraouselWidth;
