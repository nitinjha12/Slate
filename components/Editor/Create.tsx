import React, {
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { createEditor, Editor, Range, Transforms } from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import { onKeyDown } from "./Editor";
import { fetcher } from "helper/taskClient";
import withLink from "./withLink";
import withImage from "./withImage";
import withTable from "./withTable";
import withList from "./withList";
import withKey from "./withKey";
import { useEditorConfig } from "./helper";
import Toolbar from "./Toolbar";
import { initialValue } from "./helper";
import HoveringToolbar from "./HoveringToolbar";
import Context from "context/context";
import ModelWindow from "./ModelWindow";
import { onDragover, onDrop } from "./Dragndrop";
import EditorNav from "./EditorNav";
import { CardImage } from "@styled-icons/bootstrap/CardImage";
import shouldMerge from "./shouldMerge";
import { v4 as uuidv4 } from "uuid";
import { setNewSelection } from "./findNode";
import Menu from "./Menu";

function Create() {
  const editor = useMemo(
    () =>
      withImage(
        withList(
          withKey(
            withLink(withTable(withHistory(withReact(createEditor() as any))))
          )
        )
      ),
    []
  );

  const [dropLine, setDropLine] = useState<"" | "top" | "bottom">("");
  const [gridLayout, setGridLayout] = useState(false);
  const [value, setValue] = useState<any>(initialValue);
  const modelCtx = useContext(Context);
  const [dropId, setDropId] = useState<string>();
  const [isWriting, setWriting] = useState(true);
  const [height, setHeight] = useState(40);

  const [id, setId] = useState(localStorage.getItem("contentID") || "");

  useEffect(() => {
    if (id) {
      localStorage.setItem("contentID", id);
    }
    setId(localStorage.getItem("contentID")!);

    (async function () {
      const res = await fetch(`/api/task?id=${id}`);
      const data = await res.json();

      setValue(JSON.parse(data.data.data));
    })();
  }, [id]);

  const { renderElement, renderLeaf } = useEditorConfig();

  function onChange(value: any) {
    setValue(value);

    const content = value;

    if (id) {
      fetcher({ id, data: content });
    } else {
      fetcher({ data: content }, setId);
    }
  }

  function getDragAfterElement(container: any, y: number) {
    const draggableEle = [
      ...container.querySelectorAll(
        ".editor__element--parent:not(.draggable--dragging)"
      ),
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

  useEffect(() => {
    const newValue = JSON.parse(JSON.stringify(value));

    for (let val of newValue) {
      val.class = "editor__element--parent";
    }
    setValue(newValue);

    // for (let i = 0; i < newValue.length; i++) {
    //   if (newValue[i].type === "grid-layout") {
    //     for (let child of newValue[i].children) {
    //       child.width = 100 / newValue[i].children.length;
    //     }
    //   }

    //   if (newValue[i].type === "grid-layout-child") {
    //     newValue[i] = { ...newValue[i].children[0] };
    //   }
    // }
    // setValue(newValue);
  }, [value.length]);

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

  // console.log(editor.children);

  function clickHandler(e: React.MouseEvent) {}

  return (
    <>
      {(modelCtx.isModel || modelCtx.isCarousel) && <ModelWindow />}

      <section
        className="editor"
        style={{
          position:
            modelCtx.isModel || modelCtx.isCarousel ? "fixed" : "relative",
        }}
      >
        <Slate editor={editor} value={value} onChange={onChange}>
          {modelCtx.isToolbar || modelCtx.selectedBlock ? <Menu /> : null}
          <div
            className={`editor__container ${
              modelCtx.isLight ? "light" : "dark"
            }`}
            onDragOver={(e) => {
              onDragover(
                e,
                getDragAfterElement,
                dropId,
                setDropId,
                setGridLayout,
                editor,
                modelCtx.dragPath
              );
            }}
            onDrop={(e) => {
              onDrop(e, editor, dropId, gridLayout, modelCtx.dragPath);
            }}
            onDragEnter={(e) => {
              if (dropId) {
                // setNewSelection(editor, dropId);
              }
            }}
            // onDragLeave={(e) => {
            //   console.log("leave");
            //   if (dropId) {
            //     setNewSelection(editor, dropId);
            //   }
            // }}
          >
            <section className="header__container">
              <nav className="editor__titleNav">
                <label
                  htmlFor="upload"
                  className="editor__navBtn"
                  onClick={clickHandler}
                >
                  <span>
                    <CardImage size="20" className="editor__navSvg" />
                  </span>
                  <span> Add cover photo</span>
                </label>
                <input type="file" id="upload" style={{ display: "none" }} />
              </nav>

              <section className="editor__title">
                <div className="editor__titleImage"></div>
                <textarea
                  readOnly={!isWriting}
                  className="editor__titleTextarea"
                  onChange={(e) => {
                    function calcHeight(value: any) {
                      const numberOfLineBreaks = (value.match(/\n/g) || [])
                        .length;
                      const newHeight = 30 + numberOfLineBreaks * 40 + 12 + 2;
                      return newHeight;
                    }

                    setHeight(calcHeight(e.target.value));
                  }}
                  style={{ height: height + "px" }}
                  placeholder="Title..."
                ></textarea>
              </section>
              <EditorNav isWriting={isWriting} setWriting={setWriting} />
            </section>

            <div
              className="element--dropLine"
              style={{ display: "none" }}
            ></div>
            <div
              className="element--dropLineVertical"
              style={{ display: "none" }}
            ></div>
            <HoveringToolbar />

            <Editable
              renderElement={useCallback(renderElement, [])}
              renderLeaf={useCallback(renderLeaf, [])}
              onKeyDown={(e) => onKeyDown(e, editor)}
              className="editor__editable"
              autoFocus={true}
              onError={() => {
                console.log("error");
              }}
              onMouseEnter={(e) => {
                // console.log(e.target);
                // const parent = nodeTraversal(e.target);
                // console.log(parent);
              }}
              readOnly={!isWriting}
              placeholder="Start writing from here..."
            />
          </div>
        </Slate>
      </section>
    </>
  );
}

export default Create;
