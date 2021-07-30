import { useState } from "react";
import { CarouselStyle } from "styles/carousel";
import CaraouselWidth from "./CaraouselWidth";
import Count from "./Count";
import ImageShape from "./ImageShape";
import useSelection from "hook/useSelection";
import { CarouselStateType } from "types";
import CarouselContainer from "./Container";

function Caraousel() {
  const selection = useSelection();

  const [data, setData] = useState<CarouselStateType>({
    count: 1,
    width: 40,
    shape: "square",
    page: 1,
  });

  console.log(selection);
  console.log(data);

  return (
    <CarouselStyle onClick={(e) => e.stopPropagation()}>
      {data.page === 1 && (
        <>
          <Count setData={setData} />
          <CaraouselWidth setData={setData} />
          <ImageShape setData={setData} />
          <div className="carousel__page">
            <button
              className="carousel__btn"
              onClick={() => setData((data) => ({ ...data, page: 2 }))}
            >
              Next
            </button>
          </div>
        </>
      )}
      {data.page === 2 && (
        <>
          <div className="carousel__page">
            <button
              className="carousel__btn"
              onClick={() => setData((data) => ({ ...data, page: 1 }))}
              style={{ left: 0 }}
            >
              Prev
            </button>
          </div>
          <Count setData={setData} />
          <CaraouselWidth setData={setData} />
          <ImageShape setData={setData} />
        </>
      )}
      {data.page === 3 && (
        <>
          <CarouselContainer caraouselData={data} />
        </>
      )}
    </CarouselStyle>
  );
}

export default Caraousel;
