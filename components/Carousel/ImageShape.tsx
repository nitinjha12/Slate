import { useRef } from "react";
import { ImageShapeStyle } from "styles/carousel";
import ImageWithLoader from "components/ImageWithLoader";
import { CarouselStateType } from "types";

function ImageShape({ setData }: { setData: Function }) {
  const squareRef = useRef<HTMLInputElement>(null);
  const roundedRef = useRef<HTMLInputElement>(null);

  return (
    <ImageShapeStyle>
      <p className="imageShape__text">Image Shape</p>
      <div className="imageShape__container">
        <div
          className="imageShape__btn"
          onClick={(e) => {
            squareRef.current!.checked = true;
            setData((data: CarouselStateType) => ({
              ...data,
              shape: "square",
            }));
          }}
        >
          <input type="radio" name="img" ref={squareRef} />
          <ImageWithLoader
            src="/lake.jpg"
            width="50"
            height="50"
            layout="responsive"
            className="imageShape__img"
            objectFit="contain"
            alt="People"
          />
        </div>
        <div
          className="imageShape__btn"
          onClick={() => {
            roundedRef.current!.checked = true;
            setData((data: CarouselStateType) => ({
              ...data,
              shape: "rounded",
            }));
          }}
        >
          <input type="radio" ref={roundedRef} name="img" />
          <ImageWithLoader
            src="/lake.jpg"
            width="50"
            height="50"
            layout="responsive"
            objectFit="contain"
            parentClassName="imageShape--round"
            className="imageShape__img "
            alt="People"
          />
        </div>
      </div>
    </ImageShapeStyle>
  );
}

export default ImageShape;
