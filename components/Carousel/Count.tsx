import { useState } from "react";
import { CountStyle } from "styles/carousel";
import { CarouselStateType } from "types";

function Count({ setData }: { setData: Function }) {
  const slideNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <CountStyle>
      <p>How Much Slide Do You Need?</p>

      <select
        onChange={(e) => {
          setData((data: CarouselStateType) => ({
            ...data,
            count: e.target.value,
          }));
        }}
      >
        {slideNums.map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
    </CountStyle>
  );
}

export default Count;
