import React, { useRef, useEffect, useContext, useState } from "react";
import { EditorType } from "types";
import { toolbarButtonData } from "./data";
import { Plus } from "@styled-icons/bootstrap/Plus";
import { ReactEditor, useSlate } from "slate-react";
import Context from "context/context";
import { VideoEditor, TableView, GridLayout } from "./SelectEditor";
import { DragIndicator } from "@styled-icons/material-sharp/DragIndicator";
import { onMouseEnter, onMouseLeave } from "./Dragndrop";

function Toolbar() {
  const toolbar = document.querySelector<HTMLDivElement>(".toolbar__buttons");

  const toolbarRef = useRef<HTMLDivElement>(null);
  const editor = useSlate() as any;
  const modelCtx = useContext(Context);
  const setSelection = useRef({ rect: 0, top: 0 });
  const [activeNum, setActiveNum] = useState(0);
  const [isVideoEditor, setVideoEditor] = useState(false);
  const [isTable, setTable] = useState(false);
  const [layoutNum, setLayoutNum] = useState(false);
  const [toolbarBtn, setToolbarBtn] = useState(
    !!toolbar?.classList.contains("toolbar__buttons--hide")
  );
  const [draggableEle, setDraggableEle] = useState<HTMLElement | null>(null);
  const previousSelection = useRef<any>(null);

  useEffect(() => {
    if (editor && editor.selection) {
      previousSelection.current = editor.selection;
    }
    if (!editor.selection && previousSelection.current && isVideoEditor) {
      editor.selection = previousSelection.current;
    }
  }, [editor.selection, editor]);

  useEffect(() => {
    const el = toolbarRef.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (!selection || (!ReactEditor.isFocused(editor) && !isVideoEditor)) {
      el.style.display = "none";
      toolbar?.classList.add("toolbar__buttons--hide");
      return;
    } else {
      el.style.display = "inline-block";
      !isVideoEditor && toolbar?.classList.add("toolbar__buttons--hide");
    }

    const editorParent =
      document.querySelector<HTMLDivElement>(".editor__editable")!;

    const path = selection.anchor.path[0];
    const eleRect = editorParent.children[path];
    const rect = eleRect.getBoundingClientRect();

    let eleHeight = 0;
    const selected = editor.children[path];

    if (selected.type === "heading-1") {
      eleHeight = 11;
    } else if (selected.type === "heading-2") {
      eleHeight = 5;
    }

    if (
      (setSelection.current.rect !== rect.top ||
        selected.type.includes("list") ||
        !setSelection.current.top) &&
      !isVideoEditor
    ) {
      setSelection.current.rect = rect.top;
      setSelection.current.top =
        rect.top + window.pageYOffset + eleHeight - el.offsetHeight + 22;
    }

    el.style.top = `${setSelection.current.top}px`;
    el.style.left = `${10}px`;
  }, [editor.selection, isVideoEditor]);

  useEffect(() => {
    !isTable && toolbar?.classList.add("toolbar__buttons--hide");
  }, [isTable]);

  useEffect(() => {
    !layoutNum && toolbar?.classList.add("toolbar__buttons--hide");
  }, [layoutNum]);

  useEffect(() => {
    setToolbarBtn(!!toolbar?.classList.contains("toolbar__buttons--hide"));
  }, [editor.selection]);

  function elePosition(ref: HTMLElement) {
    const box = ref.getBoundingClientRect();

    console.log(box);
  }
  // toolbarRef.current && elePosition(toolbarRef.current);

  return (
    <section className={`toolbar `} ref={toolbarRef}>
      <button
        className="toolbar__addButton"
        style={{
          transform: !toolbarBtn ? "rotate(-90deg)" : "rotate(0deg)",
          transition: "all 0.4s",
          background: !toolbarBtn ? "#3884FF" : "white",
          border: !toolbarBtn
            ? "1px solid #3884FF "
            : "1px solid rgb(180, 180, 180)",
        }}
        onClick={() => {
          toolbar?.classList.toggle("toolbar__buttons--hide");
          setToolbarBtn(
            !!toolbar?.classList.contains("toolbar__buttons--hide")
          );
        }}
        title="edit block"
      >
        <Plus size="24" />
      </button>

      {/* drag and dropp   */}

      <button
        className="toolbar__dragndrop"
        onMouseEnter={() => onMouseEnter(editor, setDraggableEle)}
        onMouseLeave={() => onMouseLeave(draggableEle!)}
      >
        <DragIndicator
          className={`dragIndicator__icon ${
            modelCtx.isLight ? "mode--light" : "mode--dark"
          }`}
          size="20"
          color="black"
        />
      </button>
      {
        <div
          className={`toolbar__buttons ${
            modelCtx.isLight ? "mode--light" : "mode--dark"
          } toolbar__buttons--hide`}
        >
          <div
            className={`toolbar__buttonsTooltip  ${
              modelCtx.isLight ? " " : "dark"
            }`}
          ></div>
          <select
            className={`toolbar__dropdown toolbar__option ${
              modelCtx.isLight ? "light" : "dark"
            }`}
            onChange={(e) => {
              toolbarButtonData[Number(e.target.value)].onMouseDown(
                e as any,
                editor
              );
              ReactEditor.focus(editor);
            }}
            value={activeNum}
          >
            {toolbarButtonData.slice(0, 4).map((data, i) => (
              <option className="toolbar__dropdownContent" key={i} value={i}>
                {useEffect(() => {
                  data.isActive(editor) && setActiveNum(i);
                })}
                {data.children}
              </option>
            ))}
          </select>

          {toolbarButtonData.slice(4).map((data, i) => (
            <button
              key={i}
              onPointerDown={(e) => {
                if (data.name === "image") {
                  modelCtx.changeSetModel(true);
                  return;
                }

                if (data.name === "video") {
                  setVideoEditor(true);
                  return;
                }
                if (data.name === "table") {
                  setTable(true);
                  return;
                }
                if (data.name === "grid-layout") {
                  setLayoutNum(true);
                  return;
                }

                if (data.name === "carousel") {
                  modelCtx.setCarousel(true);
                  return;
                }
                data.onMouseDown(e, editor);
                toolbar?.classList.add("toolbar__buttons--hide");
                ReactEditor.focus(editor);
              }}
              className={`btn--toolbar   ${
                modelCtx.isLight ? "light" : "dark"
              } toolbar__option ${
                data.isActive(editor) ? "btn--toolbar__active" : ""
              }`}
              style={data.style}
              title={data.title}
            >
              {data.children}
            </button>
          ))}
          {isVideoEditor && (
            <VideoEditor editor={editor} setVideoEditor={setVideoEditor} />
          )}
          {isTable && <TableView setTable={setTable} editor={editor} />}
          {layoutNum && <GridLayout setLayout={setLayoutNum} editor={editor} />}
        </div>
      }
    </section>
  );
}

export default Toolbar;
