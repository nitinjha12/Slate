import { useEffect, useState, useContext, useRef } from "react";
import Context from "context/context";
import { ReactEditor, useSlate } from "slate-react";
import { toolbarButtonData } from "./data";
import { VideoEditor, TableView } from "./SelectEditor";
import { Transforms, Range } from "slate";
import { getRange, findSlateNode } from "./findNode";
import { dropToolbarDataArr } from "components/Editor/data";
import CustomEditor from "./Editor";

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
  // console.log(JSON.parse(JSON.stringify(editor.children)));
  const [node, path] = findSlateNode(
    editor.children,
    modelCtx.getKey.id,
    modelCtx.getKey.parentId
  );

  // console.log(node, path, modelCtx.getKey);
  // console.log(editor.children);

  const domNode =
    !modelCtx.isToolbar && !!node && ReactEditor.toDOMNode(editor, node);
  const { top, left, bottom, height } =
    domNode && (domNode.getBoundingClientRect() as any);
  const topDistance = modelCtx.isToolbar || top;
  const distance = window.innerHeight - topDistance;

  // console.log(topDistance, distance, domNode, node);

  function checkViewportDistance() {
    if (distance > topDistance) return true;
    return false;
  }

  // console.log(window.innerHeight, domNode.offsetTop, domNode.scrollTop);

  // console.log(top, bottom, left);

  useEffect(() => {
    if (modelCtx.isToolbar || modelCtx.selectedBlock) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }
  }, [modelCtx.isToolbar]);

  function removeToolbar() {
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
      toolbarOptionRef.current.style.left = "200%";
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
            top: checkViewportDistance() ? modelCtx.isToolbar || top : distance,
            // bottom:
            //   !checkViewportDistance() && top ? -distance - 180 : -distance,
            position: "relative",
            left: left || "30%",
          }}
          onMouseEnter={() => {
            // setToolbarOption(true);
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
                            if (modelCtx.selectedBlock) {
                              data.onMouseDown(e, editor!, path);
                            } else {
                              data.onMouseDown(e, editor!);
                            }
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
                ))}
              </div>
            )}
            {isVideoEditor && (
              <VideoEditor
                editor={editor}
                setVideoEditor={setVideoEditor}
                removeToolbar={removeToolbar}
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
                  <div className="toolbar__blockBtn--name">
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
    endNum: 16,
  },
  {
    blockName: "Grid",
    startNum: 16,
    // endNum: 16,
  },
];
