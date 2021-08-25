import { useEffect, useState, useContext, useRef } from "react";
import Context from "context/context";
import { ReactEditor, useSlate } from "slate-react";
import { toolbarButtonData } from "./data";
import { VideoEditor, TableView } from "./SelectEditor";
import { Transforms, Range, Path, Editor } from "slate";
import { getRange, findSlateNode } from "./findNode";
import { dropToolbarDataArr } from "components/Editor/data";
import CustomEditor from "./Editor";
import Image from "next/image";

function Menu() {
  const modelCtx = useContext(Context);
  const [toolbarOption, setToolbarOption] = useState(false);
  const [isVideoEditor, setVideoEditor] = useState(false);
  const [isTable, setTable] = useState(false);
  const editor: any = useSlate();
  const previousSelection = useRef<Range | null>(null);
  const toolbarOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editor && editor.selection) {
      previousSelection.current = editor.selection;
    }
    if (!editor.selection) {
      editor.selection = previousSelection.current!;
    }
  }, [editor.selection]);
  const { body } = document;

  const [node, path]: any = findSlateNode(
    editor.children,
    modelCtx.getKey.id,
    modelCtx.getKey.parentId
  );

  const domNode =
    !modelCtx.isToolbar && !!node && ReactEditor.toDOMNode(editor, node);
  const { top, left, bottom, height } =
    domNode && (domNode.getBoundingClientRect() as any);
  const topDistance = modelCtx.isToolbar || top;
  const distance = window.innerHeight - topDistance;

  function checkViewportDistance() {
    if (distance > topDistance) return true;
    return false;
  }

  useEffect(() => {
    if (modelCtx.isToolbar || modelCtx.selectedBlock) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }
  }, [modelCtx.isToolbar]);

  function removeToolbar() {
    Transforms.setNodes(editor, { class: "editor__element--parent" } as any, {
      at: path,
    });

    editor.onChange();
    modelCtx.setSelectedBlock(false);
    modelCtx.setToolbar(0);

    if (!previousSelection.current && modelCtx.getKey) {
      const range = getRange(path);
      previousSelection.current = range;
    }
    editor.selection = previousSelection.current;
    Transforms.select(editor, editor.selection);
    body.style.overflow = "visible";
    ReactEditor.focus(editor);
  }

  function turnIntoHandler() {
    setToolbarOption(true);

    if (toolbarOptionRef.current) {
      toolbarOptionRef.current.style.left = "180%";
      if (!checkViewportDistance())
        toolbarOptionRef.current.style.bottom = "0%";
    }
  }

  return (
    <section
      className="activeToolbar"
      onClick={() => {
        removeToolbar();
      }}
    >
      <div
        className="activeToolbar__child"
        style={{
          position:
            modelCtx.isToolbar || modelCtx.selectedBlock ? "fixed" : "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          className="toolbarOption__container"
          style={{
            top: checkViewportDistance() && topDistance,
            bottom:
              !checkViewportDistance() &&
              ((modelCtx.selectedBlock ? distance : distance + 300) as any),
            position: "absolute",
            left: left || "30%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="addToolbar">
            {((!isVideoEditor && !isTable && !modelCtx.selectedBlock) ||
              toolbarOption) && (
              <div
                className="toolbar__options toolbar__options--hover "
                ref={toolbarOptionRef}
                onMouseEnter={() => {
                  setToolbarOption(true);
                }}
              >
                {blockInfoData.map((data, i) => (
                  <div className="toolbar__basicBlock" key={i}>
                    <p className="toolbar__basicBlock__title">
                      {data.blockName}
                    </p>

                    {toolbarButtonData
                      .slice(data.startNum, data.endNum)
                      .map((data, i) => (
                        <div
                          className={`toolbar__blockBtn ${
                            editor && data.isActive(editor)
                              ? "btn--toolbar__active"
                              : ""
                          }`}
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

                            if (data.name === "carousel") {
                              modelCtx.setCarousel(true);
                              return;
                            }

                            if (data.name === "grid-layout") {
                              CustomEditor.addGridLayout(
                                editor,
                                data.children.number,
                                path
                              );
                              removeToolbar();
                              return;
                            }

                            if (
                              node!.type.includes("grid") &&
                              (path.length > 1 || !editor.selection)
                            ) {
                              path.push(node.children.length - 1);
                            }

                            if (
                              modelCtx.selectedBlock &&
                              (path.length === 3 ||
                                !node!.type.includes("grid"))
                            ) {
                              data.onMouseDown(e, editor, path);
                            } else {
                              data.onMouseDown(e, editor);
                            }
                            Transforms.select(editor, getRange(path));
                            ReactEditor.focus(editor!);
                            removeToolbar();
                          }}
                          style={data.style}
                          title={data.title}
                        >
                          {typeof data.children.icon !== "string" ? (
                            <button className={`toolbar__blockBtn--icon  `}>
                              {data.children.icon}
                            </button>
                          ) : (
                            <Image
                              width="40"
                              height="40"
                              src={"/" + data.children.icon}
                              alt={data.children.name}
                            />
                          )}
                          <div className="toolbar__blockBtn--name">
                            {data.children.name}
                            <span className="toolbar__blockBtn--subname">
                              {data.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
            {isVideoEditor && (
              <VideoEditor
                editor={editor}
                setVideoEditor={setVideoEditor}
                removeToolbar={removeToolbar}
                path={path}
              />
            )}
            {isTable && (
              <TableView
                setTable={setTable}
                editor={editor}
                removeToolbar={removeToolbar}
              />
            )}
          </div>

          {modelCtx.selectedBlock && (
            <div className="dropClickToolbar">
              {dropToolbarDataArr.map((data: any, i: number) => (
                <div
                  className="toolbar__blockBtn"
                  key={i}
                  style={{ height: "40px" }}
                  onMouseEnter={() => {
                    if (data.children.name.toLowerCase() === "turn into") {
                      setTimeout(turnIntoHandler, 0.00001);

                      return;
                    }
                    setToolbarOption(false);
                  }}
                  onMouseLeave={() => {
                    if (data.children.name.toLowerCase() === "turn into")
                      return;
                    setToolbarOption(false);
                  }}
                  onPointerDown={() => {
                    data.onMouseDown(editor, path);
                    removeToolbar();
                  }}
                >
                  <button className={`toolbar__blockBtn--icon`}>
                    {data.children.icons}
                  </button>
                  <div className="toolbar__blockBtn--name justify-content-center align-items-center">
                    {data.children.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Menu;

const blockInfoData = [
  {
    blockName: "Basic Block",
    startNum: 0,
    endNum: 13,
  },
  {
    blockName: "Media",
    startNum: 13,
    endNum: 15,
  },
  {
    blockName: "Grid",
    startNum: 15,
    // endNum: 16,
  },
];
