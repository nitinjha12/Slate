import React from "react";
import { ModelNavStyle } from "styles/model";

interface IProps {
  upload: boolean;
  setUpload(val: boolean): void;
}

function ModelNav({ upload, setUpload }: IProps) {
  return (
    <ModelNavStyle>
      <p
        className={`nav__option ${upload ? "nav--active" : ""}`}
        onClick={() => setUpload(true)}
      >
        Upload Image
      </p>
      <p
        className={`nav__option ${!upload ? "nav--active" : ""}`}
        onClick={() => setUpload(false)}
      >
        Unsplash
      </p>
    </ModelNavStyle>
  );
}

export default ModelNav;
