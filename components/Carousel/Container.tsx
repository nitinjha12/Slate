import { useRef } from "react";
import { CareerAboutSection, CaraouselStyle } from "styles/carousel";
import CaraouselItem from "./CaraouselItem";

function CarouselContainer({ caraouselData }: any) {
  const caraouselRef = useRef<HTMLElement>(null);
  let currentSlide = 0;

  const timer = setInterval(nextHandler, 3000);

  function goToSlide(slide: number) {
    caraouselRef.current!.childNodes.forEach((item: any, i) => {
      item.style.transform = `translateX(${100 * (i - slide)}%)`;
      item.style.transition = "all 1s";
    });
  }

  function activateDot(slide: number) {
    document.querySelectorAll(".caraousel__datadots").forEach((dot) => {
      dot.classList.remove("caraousel__datadots__active");

      if (dot.dataset.slide == slide) {
        dot.classList.add("caraousel__datadots__active");
      }
    });
  }

  function prevHandler() {
    currentSlide--;

    if (currentSlide < 0) currentSlide = caraouselData.length - 1;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function nextHandler() {
    currentSlide++;

    if (currentSlide >= caraouselData.length) currentSlide = 0;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function dothandler(e: React.MouseEvent<HTMLButtonElement>) {
    currentSlide = Number(e.target.dataset.slide);

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  return (
    // <CareerAboutSection>
    <CaraouselStyle>
      <div className="caraousel__container" ref={caraouselRef}>
        {caraouselData.map((data, i) => (
          <CaraouselItem
            key={i}
            index={i}
            src={data.src}
            // thought={data.thought}
            // fieldOfWork={data.fieldOfWork}
            // detail={data.detail}
            wrap={i % 2 !== 0 ? true : false}
          />
        ))}
      </div>
      <button className="btn__caraousel btn-prev" onClick={prevHandler}>
        ←
      </button>
      <button className="btn__caraousel btn-next" onClick={nextHandler}>
        →
      </button>

      <div className="caraousel__dots">
        {caraouselData.map((_, i) => (
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
    // </CareerAboutSection>
  );
}

export default CarouselContainer;
