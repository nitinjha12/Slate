import { EditorType } from "types";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms, Location, Range, Editor, Path, Node, Span } from "slate";
import CustomEditor from "./Editor";
import Context from "context/context";
import { findSlateNode } from "./findNode";

export const onMouseEnter = (
  e: React.MouseEvent<HTMLElement>,
  editor: EditorType,
  setDragPath: Function
) => {
  const { id } = e.currentTarget.dataset;
  const node = id && findSlateNode(editor.children, id);
  const nodePath = node && ReactEditor.findPath(editor, node);

  console.log(node, nodePath);

  setDragPath(nodePath);
};

let count = 0;

export const onDragover = (
  e: React.DragEvent,
  getDragAfterElement: Function,
  dropId: string | undefined,
  setDropId: Function,
  setLayout: Function,
  editor: EditorType,
  dragPath: Path
) => {
  e.preventDefault();
  e.stopPropagation();

  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  const afterEle: HTMLElement = getDragAfterElement(editorParent, e.clientY);
  const child = afterEle && (afterEle.childNodes[1] as HTMLElement);

  if (count === 0) {
    const range: Range = {
      anchor: { path: dragPath, offset: 0 },
      focus: { path: dragPath, offset: 0 },
    };

    try {
      Transforms.setSelection(editor, range);
    } catch (err) {
      console.log(err);
    }
    count++;
  }

  const dropLine: HTMLElement = document.querySelector(".element--dropLine")!;
  const verticalLine: HTMLElement = document.querySelector(
    ".element--dropLineVertical"
  )!;
  dropLine.style.display = "block";

  const box = afterEle.getBoundingClientRect();

  if (child && e.clientX - box.x < 45) {
    dropLine.style.display = "none";
    verticalLine.style.display = "block";
    child.insertAdjacentElement("beforebegin", verticalLine);
    setLayout(true);
  } else {
    verticalLine.style.display = "none";
    setLayout(false);
  }

  if (afterEle.parentElement?.classList.contains("gridLayout__children")) {
    verticalLine.style.display = "none";
    dropLine.style.display = "none";
    setLayout(false);
  }

  // console.log(ReactEditor.findEventRange(editor, e));

  child && child.insertAdjacentElement("afterbegin", dropLine);

  if (afterEle.dataset.id !== dropId) {
    setDropId(afterEle.dataset.id);
  }
};

export const onDrop = (
  e: React.MouseEvent,
  editor: EditorType,
  dropId: string | undefined,
  layout: boolean,
  index: number[]
) => {
  e.preventDefault();
  e.stopPropagation();

  count = 0;

  const range: Range = {
    anchor: { path: [index[0] - 1], offset: 0 },
    focus: { path: [index[0] - 1], offset: 0 },
  };

  Transforms.setSelection(editor, range);

  const editorContainer = document.querySelector(".editor__container")!;
  const dropLine: HTMLElement = document.querySelector(".element--dropLine")!;
  const verticalLine: HTMLElement = document.querySelector(
    ".element--dropLineVertical"
  )!;

  dropLine.style.display = "none";
  verticalLine.style.display = "none";
  editorContainer.appendChild(dropLine);
  editorContainer.appendChild(verticalLine);

  const node = dropId && findSlateNode(editor.children, dropId);
  const dropPath = node && ReactEditor.findPath(editor, node);
  if (!node) return;

  if (layout) {
    CustomEditor.addGridLayout(editor, dropPath, index);
    return;
  }

  try {
    console.log(index, dropPath);
    if (index[0] === dropPath[0]) return;

    // Transforms.moveNodes(editor, {
    //   at: index,
    //   to: dropPath,
    // });

    const nodeData = JSON.parse(JSON.stringify(editor.children));
    const range: Range = {
      anchor: { path: dropPath, offset: 0 },
      focus: { path: dropPath, offset: 0 },
    };

    console.log(nodeData[index[0]]);

    Transforms.removeNodes(editor, { at: index });
    Transforms.insertNodes(editor, nodeData[index[0]], { at: dropPath });
    Transforms.setSelection(editor, range);
    ReactEditor.focus(editor);
  } catch (err) {
    console.log(err);
  }
};

function swapArray(fromindex: number, toIndex: number, arr: any) {
  let updatedArr = [...arr];
  const removedArr = updatedArr.splice(fromindex, 1);

  updatedArr.splice(toIndex, 0, removedArr[0]);
  return updatedArr;
}

function useTransform(editor: EditorType, index: number, position: number) {
  const newEditor = JSON.parse(JSON.stringify(editor));
  const selection = JSON.parse(JSON.stringify(editor.selection));
  const removedNode = newEditor.children[index];

  selection.anchor.path[0] = position;
  selection.focus.path[0] = position;

  console.log(index, position);

  Transforms.removeNodes(editor, {
    at: editor.selection!,
  });

  Transforms.insertNodes(editor, removedNode, {
    at: [position],
  });

  const newSlection = JSON.parse(JSON.stringify(selection));

  newSlection.anchor.path[0] = position - 1;
  newSlection.focus.path[0] = position - 1;
}

// export const toolbarOnMouseEnter = (
//   editor: EditorType,
//   setDraggableEle: Function
// ) => {
//   const index: number = editor.selection!.anchor.path[0];
//   const editorParent =
//     document.querySelector<HTMLDivElement>(".editor__editable")!;

//   const dragBtn = document.querySelector<HTMLButtonElement>(
//     ".toolbar__dragndrop"
//   );

//   const dragIcon = document.querySelector<HTMLElement>(".dragIndicator__icon");

//   const path = editor.selection!.anchor.path[0];
//   let eleHeight = 0;
//   const selected: any = editor.children[path];

//   if (selected.type === "heading-1") {
//     eleHeight = 11;
//   } else if (selected.type === "heading-2") {
//     eleHeight = 5;
//   }

//   const ele: any = editorParent.childNodes[index];

//   ele.insertAdjacentElement("afterbegin", dragBtn);

//   dragBtn!.style.top = `0px`;
//   dragBtn!.style.left = "20px";
//   // dragIcon!.style.cursor = "grab";

//   ele.setAttribute("draggable", true);
//   ele.setAttribute("contenteditable", false);

//   setDraggableEle(ele);

//   ele!.addEventListener("dragstart", () => {
//     ele?.classList.add("draggable--dragging");
//   });

//   ele!.addEventListener("dragend", () => {
//     ele?.classList.remove("draggable--dragging");
//   });
// };

// export const toolbarOnMouseLeave = (draggableEle: HTMLElement) => {
//   const dragBtn = document.querySelector<HTMLButtonElement>(
//     ".toolbar__dragndrop"
//   );
//   const addBtn = document.querySelector(".toolbar__addButton");

//   addBtn?.appendChild(dragBtn!);

//   dragBtn!.style.left = "30px";
//   dragBtn!.style.top = `10px`;

//   draggableEle?.setAttribute("draggable", "false");
//   draggableEle?.classList.remove("draggable--dragging");
//   draggableEle?.setAttribute("contenteditable", "true");
// };
