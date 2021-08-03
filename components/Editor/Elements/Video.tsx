import { useState } from "react";
import { useReadOnly, useFocused, useSelected } from "slate-react";
import Arrow from "../Arrow";

function Video(props: any) {
  const [isHover, setHover] = useState(false);
  const readOnly = useReadOnly();
  const focused = useFocused();
  const selected = useSelected();

  return (
    <div
      {...props.attributes}
      className="my-2 slate__image"
      style={{ height: "100%" }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        contentEditable={false}
        style={{
          position: "relative",
          paddingTop: "40%",
          display: "block",
        }}
        className="videoContainer"
      >
        <iframe
          src={props.element.src}
          style={{
            position: "absolute",
            top: 0,
          }}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <Arrow isSelected={!readOnly} isHover={isHover} />
        {props.children}
      </div>
    </div>
  );
}

export default Video;
