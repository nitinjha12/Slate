import { useContext } from "react";
import { ModelWindowStyle } from "styles/model";
import Context from "context/context";
import Model from "components/Model/Model";
import Caraousel from "components/Carousel/Caraousel";

function ModelWindow() {
  const modelCtx = useContext(Context);

  function clickHandler() {
    modelCtx.changeSetModel(false);
    modelCtx.setCarousel(false);
  }

  return (
    <ModelWindowStyle onClick={clickHandler}>
      {modelCtx.isModel && <Model />}
      {modelCtx.isCarousel && <Caraousel />}
    </ModelWindowStyle>
  );
}

export default ModelWindow;
