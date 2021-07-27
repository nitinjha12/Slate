import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import { createEditor, Editor, Range } from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import { onKeyDown } from "./Editor";
import { fetcher } from "helper/taskClient";
import withLink from "./withLink";
import withImage from "./withImage";
import withTable from "./withTable";
import { useEditorConfig } from "./helper";
import Toolbar from "./Toolbar";
import { initialValue } from "./helper";
import HoveringToolbar from "./HoveringToolbar";
import Context from "context/context";
import ModelWindow from "./ModelWindow";
import { onDragover, onDrop } from "./Dragndrop";
import EditorNav from "./EditorNav";

function Create() {
  const [editor] = useState(
    withImage(
      withLink(withTable(withHistory(withReact(createEditor() as any))))
    )
  );

  const [value, setValue] = useState<any>(initialValue);
  const modelCtx = useContext(Context);
  const [dragEle, setDragEle] = useState<HTMLElement>();
  const [isWriting, setWriting] = useState(true);

  useEffect(() => {
    if (editor && editor.selection) {
      modelCtx.getEditor(editor);
    }
  }, [editor.selection]);

  // const [id, setId] = useState(localStorage.getItem("contentID") || "");

  // useEffect(() => {
  //   if (id) {
  //     localStorage.setItem("contentID", id);
  //   }
  //   setId(localStorage.getItem("contentID")!);

  //   (async function () {
  //     const res = await fetch(`/api/task?id=${id}`);
  //     const data = await res.json();

  //     setValue(JSON.parse(data.data.data));
  //   })();
  // }, [id]);

  const { renderElement, renderLeaf } = useEditorConfig();

  function onChange(value: any) {
    setValue(value);

    // const content = value;

    // if (id) {
    //   fetcher({ id, data: content });
    // } else {
    //   fetcher({ data: content }, setId);
    // }
  }

  function getDragAfterElement(container: any, y: number) {
    const draggableEle = [
      ...container.querySelectorAll(".my-2:not(.draggable--dragging)"),
    ];

    return draggableEle.reduce(
      (closest, child) => {
        const ele = child.getBoundingClientRect();
        const offset = y - ele.top - ele.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    ).element;
  }

  function replaceListItem() {
    const newValue = JSON.parse(JSON.stringify(value));
    for (let val of newValue) {
      if (val.type === "list-item") {
        val.type = "paragraph";
        setValue(newValue);
        break;
      }
    }
  }
  replaceListItem();

  function removeGridLayout() {
    const newValue = JSON.parse(JSON.stringify(value));
    for (let i = 0; i < newValue.length; i++) {
      if (newValue[i].type === "grid-layout") {
        for (let child of newValue[i].children) {
          if (child.type === "grid-layout-child") return;
        }

        newValue.splice(i, 1);

        setValue(newValue);
        break;
      }
    }
  }
  removeGridLayout();
  // ReactEditor.findPath
  // console.log(editor.selection);

  return (
    <>
      {modelCtx.isModel && <ModelWindow />}
      <section
        className="editor"
        style={{ position: modelCtx.isModel ? "fixed" : "relative" }}
      >
        <Slate editor={editor} value={value} onChange={onChange}>
          <div className="editor__container">
            {/* <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(e) => onKeyDown(e, editor)}
            /> */}
            <Toolbar />
            <EditorNav isWriting={isWriting} setWriting={setWriting} />

            <HoveringToolbar />
            {/* <h1 contentEditable={true} placeholder="Title..."></h1>
            <hr /> */}

            <Editable
              renderElement={useCallback(renderElement, [])}
              renderLeaf={useCallback(renderLeaf, [])}
              onKeyDown={(e) => onKeyDown(e, editor)}
              className="editor__editable"
              autoFocus={true}
              onDragOver={(e) => {
                onDragover(e, getDragAfterElement, dragEle, setDragEle, editor);
              }}
              onDrop={() => {
                onDrop(editor, dragEle, value, onChange);
              }}
              readOnly={!isWriting}
            />
          </div>
        </Slate>
      </section>
    </>
  );
}

export default Create;
