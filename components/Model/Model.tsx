import { useState } from "react";
import { ModelStyle } from "styles/style";
import ModelNav from "./ModelNav";
import Upload from "./Upload";
import Unsplash from "./Unsplash";
import useImageHandler from "helper/useImageHandler";

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
