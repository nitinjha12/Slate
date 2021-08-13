import { useEffect, useState, useContext, useRef } from "react";
import Context from "context/context";
import { ReactEditor, useSlate } from "slate-react";
import { toolbarButtonData } from "./data";
import { VideoEditor, TableView } from "./SelectEditor";
import { Transforms, Range } from "slate";
import { getRange, findSlateNode } from "./findNode";

function Menu() {
  const modelCtx = useContext(Context);
  const [activeNum, setActiveNum] = useState(0);
  const [isVideoEditor, setVideoEditor] = useState(false);
  const [isTable, setTable] = useState(false);
  const editor: any = useSlate();
  const previousSelection = useRef<Range | null>(null);

  useEffect(() => {
    if (editor && editor.selection) {
      previousSelection.current = editor.selection;
    }
    if (!editor.selection) {
      editor.selection = previousSelection.current!;
    }
  }, [editor.selection]);

  function removeToolbar() {
    modelCtx.setToolbar(0);

    if (!previousSelection.current && modelCtx.getKey) {
      const [, path] = findSlateNode(editor.children, modelCtx.getKey);
      const range = getRange(path);
      previousSelection.current = range;
    }
    editor.selection = previousSelection.current!;
    Transforms.select(editor, editor.selection);
    ReactEditor.focus(editor);
  }

  return (
    <section className="activeToolbar" onClick={() => removeToolbar()}>
      {/* <div
        className={`toolbar__buttons ${
          modelCtx.isLight ? "mode--light" : "mode--dark"
        } ${modelCtx.isToolbar ? "" : "toolbar__buttons--hide"}`}
        style={{ top: modelCtx.isToolbar }}
        onClick={(e) => e.stopPropagation()}
      ></div> */}

      <div
        className="toolbar__options "
        onClick={(e) => e.stopPropagation()}
        style={{ top: modelCtx.isToolbar }}
      >
        <div className="toolbar__basicBlock">
          <p>Basic Blocks</p>

          {toolbarButtonData.slice(0, 13).map((data, i) => (
            <div
              className={`toolbar__blockBtn ${
                editor && data.isActive(editor) ? "btn--toolbar__active" : ""
              }`}
              key={i}
              onPointerDown={(e) => {
                data.onMouseDown(e, editor!);
                ReactEditor.focus(editor!);
                removeToolbar();
              }}
              style={data.style}
              title={data.title}
            >
              <button className={`toolbar__blockBtn--icon  `}>
                {data.children.icon}
              </button>
              <div className="toolbar__blockBtn--name">
                {data.children.name}
              </div>
            </div>
          ))}
        </div>
        <div className="toolbar__basicBlock">
          <p>Media</p>

          {toolbarButtonData.slice(13).map((data, i) => (
            <div
              className={`toolbar__blockBtn ${
                editor && data.isActive(editor) ? "btn--toolbar__active" : ""
              }`}
              key={i}
              onPointerDown={(e) => {
                if (data.name === "video") {
                  setVideoEditor(true);
                }

                if (data.name === "image") {
                  modelCtx.changeSetModel(true);
                }

                if (data.name === "table") {
                  setTable(true);
                }

                removeToolbar();
              }}
              style={data.style}
              title={data.title}
            >
              <button className={`toolbar__blockBtn--icon  `}>
                {data.children.icon}
              </button>
              <div className="toolbar__blockBtn--name">
                {data.children.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isVideoEditor && (
        <VideoEditor editor={editor} setVideoEditor={setVideoEditor} />
      )}
      {isTable && <TableView setTable={setTable} editor={editor} />}
    </section>
  );
}

export default Menu;
