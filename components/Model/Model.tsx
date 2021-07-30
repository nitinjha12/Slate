import { useState } from "react";
import { ModelStyle } from "styles/model";
import ModelNav from "./ModelNav";
import Upload from "./Upload";
import Unsplash from "./ModelUnsplash";
import useImageHandler from "hook/useImageHandler";

function Model() {
  const [upload, setUpload] = useState(true);
  const data = useImageHandler();

  return (
    <ModelStyle onClick={(e) => e.stopPropagation()}>
      <ModelNav upload={upload} setUpload={setUpload} />
      {upload ? <Upload {...data} /> : <Unsplash {...data} />}
    </ModelStyle>
  );
}

export default Model;
