import React, { useState, useRef, useEffect, useContext } from "react";
import { ToggleListStyle } from "styles/block";
import { Transforms, Editor } from "slate";
import { useSlate, useReadOnly, ReactEditor } from "slate-react";
import { Play } from "@styled-icons/boxicons-regular/Play";
import { Cross } from "@styled-icons/entypo/Cross";
import Context from "context/context";

// interface ToggleListInterface {
//   title: string;
//   description: string;
// }

function ToggleList({ element, attributes, children }: any) {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState<string>(element.title || "");
  const [height, setHeight] = useState(element.height || "40");
  const [path, setPath] = useState([0]);
  const editor = useSlate();
  const readonly = useReadOnly();
  const lightCtx = useContext(Context);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);

    Transforms.setNodes(
      editor,
      {
        title: e.target.value,
        height: height,
      } as any,
      {
        at: path,
      }
    );
  };

  function removeHandler(e: React.MouseEvent) {
    pathHandler(e as any);

    Transforms.removeNodes(editor, {
      at: path,
    });
  }

  const pathHandler = (e: React.FocusEvent) => {
    const editorParent =
      document.querySelector<HTMLDivElement>(".editor__editable")!;

    let i = 0;
    for (let child of editorParent.childNodes as any) {
      if (child === e.currentTarget.parentElement?.parentElement) {
        break;
      }

      i++;
    }

    setPath([i]);
  };

  return (
    <ToggleListStyle
      className={`toggleListStyle ${toggle ? "pb-3" : ""} ${
        lightCtx.isLight ? "light" : "dark"
      } `}
      {...attributes}
    >
      <div className="toggleList__title" contentEditable={false}>
        <Play
          size="28"
          style={
            toggle
              ? { transform: "rotate(-90deg)", transition: "all 0.2s" }
              : { transform: "rotate(0deg)", transition: "all 0.2s" }
          }
          className="toggleList__downArrow"
          onClick={() => setToggle((tog) => !tog)}
        />
        {!readonly ? (
          <>
            <textarea
              value={title}
              onChange={titleChangeHandler}
              onFocus={pathHandler}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setHeight(
                    Number.parseFloat(e.currentTarget.style.height) + 19
                  );
                }
                if (e.key === "Backspace") {
                  setHeight(
                    Number.parseFloat(e.currentTarget.style.height) - 19
                  );
                }
              }}
              className="toggleList__input"
              style={{ height: height + "px" }}
            />
          </>
        ) : (
          <textarea
            value={title}
            readOnly
            style={{ height: height + "px" }}
            className="toggleList__input"
          />
        )}

        <Cross
          size="22"
          className="toggleList__remove"
          onClick={removeHandler}
          onMouseEnter={pathHandler as any}
        />
      </div>

      {toggle && <div className={`toggleList__toggleChildren`}>{children}</div>}
    </ToggleListStyle>
  );
}

export default ToggleList;
