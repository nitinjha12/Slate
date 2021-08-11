import React, { useState, useCallback, useEffect, useContext } from "react";
import { Transforms, Editor } from "slate";
import { useSlate, useReadOnly, useSelected, useFocused } from "slate-react";
import ImageToolbar from "../ImageToolbar";
import ImageWithLoader from "components/ImageWithLoader";
import Arrow from "../Arrow";
import Context from "context/context";

function ImageCompo(props: any) {
  const [isEditingCaption, setEditingCaption] = useState(false);
  const [caption, setCaption] = useState(props.element.caption);
  const [isSelected, setSelected] = useState(false);
  const [isImgCaption, setImgCaption] = useState(false);
  const [isHover, setHover] = useState(false);
  const editor = useSlate();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const focused = useFocused();
  const lightCtx = useContext(Context);

  useEffect(() => {
    if (editor && editor.selection) {
      const img: any = editor.children[editor.selection?.anchor.path[0]];
      if (img && img.type !== "image") {
        setSelected(false);
      }
    }
  }, [editor.selection]);

  const applyCaptionChange = useCallback(
    (newCaption) => {
      const imageNodeEntry = Editor.above(editor, {
        match: (n: any) => n.type === "image",
      });

      if (!imageNodeEntry) return;

      if (!newCaption) {
        setCaption(newCaption);
      }

      Transforms.setNodes(
        editor,
        {
          caption: newCaption,
        } as any,
        { at: imageNodeEntry[1] }
      );
    },
    [editor]
  );

  const onCaptioChange = useCallback(
    (e) => {
      setCaption(e.target.value);
    },
    [editor.selection]
  );

  const onKeyDown = useCallback((e) => {
    if (e.key !== "Enter") return;

    applyCaptionChange(e.target.value);
    setEditingCaption(false);
  }, []);

  const onToggleEditMode = function () {
    setEditingCaption((mode) => !mode);

    if (isSelected) {
      setSelected(false);
    }
  };

  function imageClickHandler(e: React.MouseEvent) {
    setSelected(true);
  }

  return (
    <div
      style={{ justifyContent: props.element.style?.justifyContent }}
      className="slate__imgContainer my-2"
    >
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`slate__image ${
          isSelected && selected && !readOnly ? "slate__image--outline" : ""
        }`}
        style={{
          ...props.element.style,
          userSelect: "none",
          cursor: "default",
        }}
        {...props.attributes}
        contentEditable={false}
      >
        {isSelected && selected && !readOnly && <ImageToolbar />}
        {props.element.url && readOnly ? (
          <a href={props.element.url}>
            <img
              alt={caption}
              src={props.element.src}
              onClick={imageClickHandler}
              // width="100"
              // height="100"
              // layout="responsive"
              // parentClassName="parentElement__image"
              className="element__image"
              // objectFit="contain"
            />
          </a>
        ) : (
          <img
            alt={caption}
            src={props.element.src}
            onClick={imageClickHandler}
            // width="100"
            // height="100"
            // layout="responsive"
            // parentClassName="parentElement__image"
            // objectFit="contain"
            className="element__image"
          />
        )}

        {!isImgCaption && !caption && !readOnly && (
          <div
            className="elementImage__optionCaption"
            onClick={() => setImgCaption(true)}
          >
            Enter Image Caption
          </div>
        )}

        <Arrow
          isSelected={focused && !readOnly}
          isHover={isHover}
          id={props.element.key}
        />

        {(isImgCaption || !!caption) &&
          (isEditingCaption ? (
            <input
              value={caption}
              onKeyDown={onKeyDown}
              onChange={onCaptioChange}
              onBlur={onToggleEditMode}
              className={`image__caption image__caption--write ${
                lightCtx.isLight ? "light" : "dark"
              }`}
            />
          ) : (
            <input
              onClick={onToggleEditMode}
              className={`image__caption  image__caption--read ${
                lightCtx.isLight ? "light" : "dark"
              }`}
              value={caption}
              readOnly
            />
          ))}

        {props.children}
      </div>
    </div>
  );
}

export default ImageCompo;
