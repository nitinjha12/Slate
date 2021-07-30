import React, { useState, useContext } from "react";
import { UnsplashStyle } from "styles/model";
import useSWR from "swr";
import ImageWithLoader from "components/ImageWithLoader";
import { ModelProps } from "types";
import Context from "context/context";
import Unsplash from "./Unsplash";

function ModelUnsplash({ imageClickHandler }: ModelProps) {
  const dataCtx = useContext(Context);

  function clickHandler(e: React.MouseEvent, img: string) {
    imageClickHandler(e, img);
    dataCtx.changeSetModel(false);
  }

  return (
    <Unsplash clickHandler={(e, img) => clickHandler(e, img.urls.regular)} />
  );
}

export default ModelUnsplash;
// NEXT_APP_UNSPLASH_API
