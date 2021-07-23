import { useContext } from "react";
import { ModelWindowStyle } from "styles/style";
import Context from "context/context";
import Model from "components/Model/Model";

function ModelWindow() {
  const modelCtx = useContext(Context);

  function clickHandler() {
    modelCtx.changeSetModel(false);
  }

  return (
    <ModelWindowStyle onClick={clickHandler}>
      <Model />
    </ModelWindowStyle>
  );
}

export default ModelWindow;
