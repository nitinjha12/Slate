import React, { useState, useEffect, useRef, useMemo } from "react";
import { imageToolbarData } from "./data";
import { useSlate } from "slate-react";
import { LinkEditor } from "./SelectEditor";
import { Editor } from "slate";

function ImageToolbar() {
  const [activeNum, setActiveNum] = useState(3);
  const [activeLink, setActiveLink] = useState(false);
  const previousSelection = useRef<any>(null);
  const editor = useSlate();

  useEffect(() => {
    if (editor.selection) {
      previousSelection.current = editor.selection;
    }
  }, [editor.selection]);

  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === "image",
  }) as any;

  // console.log(match);

  imageToolbarData.slice(0, 4).map((data: any, i: number) => {
    {
      useEffect(() => {
        data.isActive(editor) && setActiveNum(i);
      }, [editor, i]);
    }
  });

  return (
    <section className="imageToolbar">
      {activeLink && (
        <>
          <LinkEditor
            selectionForLink={previousSelection.current}
            editor={editor}
            imageLink
            setActiveLink={setActiveLink}
          />
        </>
      )}
      {!activeLink && (
        <div className="imageToolbar__buttons">
          <select
            className="toolbar__dropdown toolbar__option"
            onChange={(e) => {
              imageToolbarData[Number(e.target.value)].onMouseDown(
                e as any,
                editor
              );
              setActiveNum(Number(e.target.value));
              //   ReactEditor.focus(editor);
            }}
            value={activeNum}
          >
            {imageToolbarData.slice(0, 4).map((data: any, i: number) => (
              <option className="toolbar__dropdownContent" key={i} value={i}>
                {data.children}
              </option>
            ))}
          </select>
          {imageToolbarData.slice(4).map((data: any, i: number) => (
            <button
              key={i}
              onPointerDown={(e) => {
                data.onMouseDown(e, editor);

                if (data.name === "link") {
                  setActiveLink(true);
                }
              }}
              className={`btn--toolbar toolbar__option hoveringToolbar__button ${
                data.isActive(editor) ||
                (match && match[0].url && data.name === "link")
                  ? "btn--toolbar__active"
                  : ""
              }`}
              style={data.style}
            >
              {data.children}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default ImageToolbar;
