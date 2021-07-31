import { useState, useContext } from "react";
import { CarouselStyle } from "styles/carousel";
import CaraouselWidth from "./CaraouselWidth";
import Count from "./Count";
import ImageShape from "./ImageShape";
import useSelection from "hook/useSelection";
import { CarouselStateType } from "types";
import CarouselContainer from "./Container";
import Unsplash from "components/Model/Unsplash";
import Library from "./Library";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import Context from "context/context";

function Caraousel() {
  const selection = useSelection();
  const [srcData, setSrcData] = useState<string[]>([]);
  const editorCtx = useContext(Context);

  const [data, setData] = useState<CarouselStateType>({
    count: 1,
    width: 40,
    shape: "square",
    page: 1,
  });

  // console.log(selection, editorCtx);
  // console.log(data);

  function clickHandler(e: React.MouseEvent, img: string) {
    setSrcData((data) => [...data, img]);
  }

  const caraouselData = [];

  for (let i = 0; i < srcData.length; i++) {
    caraouselData.push({
      type: "carousel-item",
      ...data,
      src: srcData[i],
      detail: "",
      index: i,
      children: [{ text: "" }],
    });
  }

  // const carouselList = [];

  const block = {
    type: "carousel",
    children: caraouselData,
  };

  // console.log(block);

  // console.log(caraouselData);

  function insertBlock() {
    console.log(editorCtx.data.editor);
    Transforms.insertNodes(editorCtx.data.editor!, block as any);
    console.log("set");

    // ReactEditor.focus(selection);
    editorCtx.setCarousel(false);
  }

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

            <button
              className="carousel__btn"
              onClick={() => setData((data) => ({ ...data, page: 3 }))}
              // style={{ left: 0 }}
            >
              Next
            </button>
          </div>
          {!!srcData.length && <Library data={srcData} />}
          <Unsplash clickHandler={clickHandler} />
        </>
      )}
      {data.page === 3 && insertBlock()}
    </CarouselStyle>
  );
}

export default Caraousel;
