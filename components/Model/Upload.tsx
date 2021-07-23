import React, { useContext, useState, useRef, useEffect } from "react";
import { UploadStyle } from "styles/style";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { ModelProps } from "types";

function Upload({ imageClickHandler }: ModelProps) {
  const [value, setValue] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <UploadStyle>
      {/* <div className="upload__urlField">
        <form className="upload__form">
          <input
            value={value}
            onChange={onChange}
            className="upload__input input__style"
            placeholder="Paste Image Link"
          />
          <button
            className="link__btn link--blue"
            onClick={(e) => imageClickHandler(e, value)}
          >
            <Check size="20" />
          </button>
        </form>
      </div> */}
      <div className="upload__dragndrop"></div>
    </UploadStyle>
  );
}

export default Upload;
