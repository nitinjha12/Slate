import React from "react";
import Image from "next/image";
import { CarouselItemStyle } from "styles/carousel";

function CaraouselItem({
  src,
  thought,
  detail,
  fieldOfWork,
  wrap,
  index,
}: any) {
  return (
    <CarouselItemStyle
      style={{
        transform: `translateX(${index * 100}%)`,
      }}
    >
      <div className="caraousel__dataImg">
        <Image
          alt={detail}
          src={src}
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div
        style={{ order: `${wrap ? "-1" : undefined}` }}
        className="caraousel__dataDetails"
      >
        <h6>{fieldOfWork}</h6>
        <h1>{thought}</h1>
        <p>{detail}</p>
      </div>
    </CarouselItemStyle>
  );
}

export default CaraouselItem;
