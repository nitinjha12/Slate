import { useState, useEffect } from "react";
import Image from "next/image";
import { CarouselItemStyle } from "styles/carousel";
import ImageWithLoader from "components/ImageWithLoader";

function CaraouselItem({ children, attributes, element }: any) {
  const [media, setMedia] = useState(
    window.matchMedia("(max-width: 900px)").matches
  );

  useEffect(() => {
    setMedia(window.matchMedia("(max-width: 900px)").matches);
  }, [window.matchMedia("(max-width: 900px)")]);

  return (
    <CarouselItemStyle
      style={{
        transform: `translateX(${element.index * 100}%)`,
      }}
      {...attributes}
      contentEditable={false}
    >
      <div
        className="caraousel__dataImg"
        style={
          media
            ? { height: element.width + "%", width: "100%" }
            : { width: element.width + "%", height: "80%" }
        }
      >
        <ImageWithLoader
          alt={element.detail}
          src={element.src}
          // layout="fill"
          width="100"
          height="100"
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>
      <div
        style={{
          // order: `${element.index % 2 !== 0 ? "-1" : ""}`,
          width: !media ? 100 - element.width + "%" : "100%",

          height: media ? element.width + "%" : "80%",
        }}
        className="caraousel__dataDetails"
        contentEditable={true}
        suppressContentEditableWarning
      >
        <div style={{ height: "100%", width: "100%" }}>{children}</div>
      </div>
    </CarouselItemStyle>
  );
}

export default CaraouselItem;
