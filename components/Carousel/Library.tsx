import { useState } from "react";
import { UnsplashStyle } from "styles/model";
import { CaraouselLibraryStyle } from "styles/carousel";
import ImageWithLoader from "../ImageWithLoader";

function Library({ data }: { data: string[] }) {
  const [showLibrary, setLibrary] = useState(false);

  return (
    <CaraouselLibraryStyle>
      <div className="selected__img" onClick={(e) => setLibrary((set) => !set)}>
        <p>
          Library <span>{data.length}</span>
        </p>
        <ImageWithLoader
          src={data[data.length - 1]}
          alt="First Selected Image"
          width="50"
          height="50"
          objectFit="contain"
        />
      </div>

      {showLibrary && (
        <UnsplashStyle>
          {data.map((img: any, i: number) => (
            <div
              className={`unsplash__image  `}
              key={i}
              // onClick={(e) => {
              //   clickHandler(e, img.urls.raw);
              // }}
            >
              <ImageWithLoader
                src={img}
                alt={img}
                width={50}
                height={50}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          ))}
        </UnsplashStyle>
      )}
    </CaraouselLibraryStyle>
  );
}

export default Library;
