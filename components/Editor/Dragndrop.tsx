import { EditorType } from "types";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms, Location, Range, Editor, Path, Node, Span } from "slate";
import CustomEditor from "./Editor";
import Context from "context/context";
import { findSlateNode } from "./findNode";

export const onMouseEnter = (
  e: React.MouseEvent<HTMLElement>,
  editor: EditorType,
  setDragPath: Function,
  parentId: string | undefined
) => {
  const { id } = e.currentTarget.dataset;

  if (parentId) {
    const [node]: any = id && findSlateNode(editor.children, id, parentId);
    const nodePath = node && ReactEditor.findPath(editor, node);

    setDragPath(nodePath);

    return;
  }

  const [node]: any = id && findSlateNode(editor.children, id);
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

  const dropLine: HTMLElement = document.querySelector(".element--dropLine")!;
  const verticalLine: HTMLElement = document.querySelector(
    ".element--dropLineVertical"
  )!;

  if (dropLine) dropLine.style.display = "block";

  const box = afterEle.getBoundingClientRect();

  if (count === 0) {
    const range = {
      anchor: { path: dragPath, offset: 0 },
      focus: { path: dragPath, offset: 0 },
    };
    editor.selection = null;
    // Transforms.setSelection(editor, range);
    // ReactEditor.blur(editor);
    count++;
  }

  if (e.clientX - box.x < 45) {
    dropLine.style.display = "none";
    verticalLine.style.display = "block";
    afterEle.insertAdjacentElement("afterbegin", verticalLine);
    setLayout(true);
  } else {
    verticalLine.style.display = "none";
    setLayout(false);
  }
  try {
    afterEle && afterEle.insertAdjacentElement("afterbegin", dropLine);
  } catch (err) {
    console.log(err, dropLine);
  }

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

  const nodeData = JSON.parse(JSON.stringify(editor.children));
  const [node]: any = dropId && findSlateNode(editor.children, dropId);
  let dropPath;

  try {
    dropPath = node && ReactEditor.findPath(editor, node);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    // const range = Editor.range(editor, dropPath);
    // Transforms.select(editor, range);
  } catch (err) {
    // console.log(err);
  }
  // ReactEditor.focus(editor);

  const editorContainer = document.querySelector(".editor__container")!;
  const dropLine: HTMLElement = document.querySelector(".element--dropLine")!;
  const verticalLine: HTMLElement = document.querySelector(
    ".element--dropLineVertical"
  )!;

  dropLine.style.display = "none";
  verticalLine.style.display = "none";
  editorContainer.appendChild(dropLine);
  editorContainer.appendChild(verticalLine);

  if (!node) return;

  if (layout) {
    CustomEditor.addGridLayout(editor, dropPath, index);
    return;
  }

  try {
    // console.log(index, dropPath);
    if (Path.equals(index, dropPath)) return;

    const range = {
      anchor: { path: dropPath, offset: 0 },
      focus: { path: dropPath, offset: 0 },
    };

    Transforms.removeNodes(editor, { at: index });
    console.log(nodeData[index[0]]);
    Transforms.insertNodes(editor, nodeData[index[0]], { at: dropPath });
    // Transforms.moveNodes(editor, { at: index, to: dropPath });
    Transforms.select(editor, range);
    ReactEditor.focus(editor);
    editor.onChange();
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
