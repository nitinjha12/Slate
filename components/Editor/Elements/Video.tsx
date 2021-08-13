import { useMemo } from "react";

function Video(props: any) {
  return useMemo(
    () => (
      <div
        {...props.attributes}
        className="slate__image"
        style={{ height: "100%" }}
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

          {props.children}
        </div>
      </div>
    ),
    []
  );
}

export default Video;
