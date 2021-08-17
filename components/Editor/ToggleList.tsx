import React, { useState, useRef, useEffect, useContext } from "react";
import { ToggleListStyle } from "styles/block";
import { Transforms, Editor } from "slate";
import { useSlate, useReadOnly, ReactEditor } from "slate-react";
import { Play } from "@styled-icons/boxicons-regular/Play";
import { Cross } from "@styled-icons/entypo/Cross";
import Context from "context/context";
import { v4 as uuidv4 } from "uuid";
import { findSlateNode } from "./findNode";

// interface ToggleListInterface {
//   title: string;
//   description: string;
// }

function ToggleList({ element, attributes, children }: any) {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState<string>(element.title || "");
  const editor = useSlate();
  const readonly = useReadOnly();
  const lightCtx = useContext(Context);
  const [node, path] = findSlateNode(editor.children, lightCtx.getKey.id);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    Transforms.setNodes(
      editor,
      {
        title: e.target.value,
        key: uuidv4(),
      } as any,
      {
        at: path,
      }
    );
  };

  function removeHandler(e: React.MouseEvent) {
    Transforms.removeNodes(editor, {
      at: path,
    });
  }

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
            <input
              value={title}
              onChange={titleChangeHandler}
              className="toggleList__input"
            />
          </>
        ) : (
          <p className="toggleList__input">{title}</p>
        )}

        <Cross
          size="22"
          className="toggleList__remove"
          onClick={removeHandler}
        />
      </div>

      {toggle && <div className={`toggleList__toggleChildren`}>{children}</div>}
    </ToggleListStyle>
  );
}

export default ToggleList;
