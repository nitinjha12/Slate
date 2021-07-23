import React, { useState, useContext } from "react";
import { UnsplashStyle } from "styles/style";
import useSWR from "swr";
import ImageWithLoader from "components/ImageWithLoader";
import { ModelProps } from "types";
import Context from "context/context";

const fetcher = async function (url: string) {
  const res = await fetch(url);
  return await res.json();
};

function Unsplash({ imageClickHandler }: ModelProps) {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("nature");
  const dataCtx = useContext(Context);

  const { data, error } = useSWR(
    `https://api.unsplash.com/search/photos/?client_id=${process.env.NEXT_APP_UNSPLASH_API}&query=${query}&page=1&per_page=20`,
    fetcher
  );

  function submitHandler(e: React.MouseEvent) {
    e.preventDefault();

    setQuery(value);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function clickHandler(e: React.MouseEvent, img: string) {
    imageClickHandler(e, img);
    dataCtx.changeSetModel(false);
  }

  if (error) {
    return <p>Something Went Wrong</p>;
  }

  return (
    <UnsplashStyle>
      <form className="unsplash__form">
        <input
          value={value}
          className="unsplash__input"
          onChange={onChange}
          placeholder="Search"
        />
        <button className="unsplash__button" onClick={submitHandler}>
          Search
        </button>
      </form>
      <div className="unaplash__imageContainer">
        {data ? (
          data.results.map((img: any) => (
            <div
              className={`unsplash__image ${
                img.width < img.height ? "rowGrid" : ""
              }`}
              key={img.id}
              onClick={(e) => clickHandler(e, img.urls.regular)}
            >
              <ImageWithLoader
                src={img.urls.regular}
                alt={img.alt_description}
                width={50}
                height={50}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          ))
        ) : (
          <div className="unsplash__loader">
            <div className="lds-dual-ring"></div>
          </div>
        )}
      </div>
    </UnsplashStyle>
  );
}

export default Unsplash;
// NEXT_APP_UNSPLASH_API
