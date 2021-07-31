import { useRef } from "react";
import { CarouselContainerStyle, CaraouselStyle } from "styles/carousel";
import CaraouselItem from "./CaraouselItem";
import { useReadOnly } from "slate-react";

function CarouselContainer({ attributes, element, children }: any) {
  const caraouselRef = useRef<HTMLDivElement>(null);
  let currentSlide = 0;
  const readOnly = useReadOnly();

  if (readOnly) {
    const timer = setInterval(nextHandler, 3000);
  }

  // console.log(children, element);

  function goToSlide(slide: number) {
    caraouselRef.current!.childNodes.forEach((item: any, i) => {
      item.style.transform = `translateX(${100 * (i - slide)}%)`;
      item.style.transition = "all 1s";
    });
  }

  function activateDot(slide: number) {
    document.querySelectorAll(".caraousel__datadots").forEach((dot: any) => {
      dot.classList.remove("caraousel__datadots__active");

      if (dot.dataset.slide == slide) {
        dot.classList.add("caraousel__datadots__active");
      }
    });
  }

  function prevHandler() {
    currentSlide--;

    if (currentSlide < 0) currentSlide = children.length - 1;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function nextHandler() {
    currentSlide++;

    if (currentSlide >= children.length) currentSlide = 0;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function dothandler(e: any) {
    currentSlide = Number(e.target.dataset.slide);

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  return (
    <CarouselContainerStyle>
      <CaraouselStyle contentEditable={false}>
        <div
          className="caraousel__container"
          {...attributes}
          ref={caraouselRef}
        >
          {children}
        </div>
        <button className="btn__caraousel btn-prev" onClick={prevHandler}>
          ←
        </button>
        <button className="btn__caraousel btn-next" onClick={nextHandler}>
          →
        </button>

        <div className="caraousel__dots">
          {children.map((_: any, i: any) => (
            <button
              key={i}
              onClick={dothandler}
              className={`caraousel__datadots ${
                i === 0 ? "caraousel__datadots__active" : ""
              }`}
              data-slide={i}
            ></button>
          ))}
        </div>
      </CaraouselStyle>
    </CarouselContainerStyle>
  );
}

export default CarouselContainer;
