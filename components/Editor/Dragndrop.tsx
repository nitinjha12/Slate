import { EditorType } from "types";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms, Location, Range, Editor, Path, Node, Span } from "slate";
import CustomEditor from "./Editor";
import Context from "context/context";

export const onMouseEnter = (
  e: React.MouseEvent,
  editor: EditorType,
  setDragPath: Function
) => {
  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;
  let position = 0;

  const table = Editor.above(editor, {
    match: (n: any) => n.type === "table",
  });

  let grid = false;

  if (
    e.currentTarget.parentElement?.parentElement?.classList.contains(
      "gridLayout"
    )
  ) {
    grid = true;
  }

  if (!table && !grid) {
    for (let node of editorParent.childNodes as any) {
      if (node === e.currentTarget.parentElement!) {
        break;
      }
      position++;
    }
  }

  if (grid) {
    for (let node of editorParent.childNodes as any) {
      if (node === e.currentTarget.parentElement?.parentElement) {
        break;
      }
      position++;
    }
  }

  // console.log(table);
  console.log(position);

  // console.log(position, e.currentTarget);
  if (position > editor.children.length - 1) return;

  const path = ReactEditor.findPath(editor as any, editor.children[position]);
  console.log(path);
  setDragPath(path);
};

export const onDragover = (
  e: React.DragEvent,
  getDragAfterElement: Function,
  dragEle: HTMLElement | undefined,
  setDragEle: Function,
  setLayout: Function,
  editor: EditorType
) => {
  e.preventDefault();
  e.stopPropagation();

  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  const afterEle: HTMLElement = getDragAfterElement(editorParent, e.clientY);

  // const elementMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);

  const child = afterEle && (afterEle.childNodes[1] as HTMLElement);

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

  child && child.insertAdjacentElement("afterbegin", dropLine);

  if (afterEle !== dragEle) {
    setDragEle(afterEle);
  }
};

export const onDrop = (
  e: React.MouseEvent,
  editor: EditorType,
  dragEle: HTMLElement | undefined,
  value: any,
  setValue: Function,
  layout: boolean,
  index: number[]
) => {
  e.preventDefault();
  e.stopPropagation();

  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  const editorContainer = document.querySelector(".editor__container")!;

  const dropLine: HTMLElement = document.querySelector(".element--dropLine")!;
  const verticalLine: HTMLElement = document.querySelector(
    ".element--dropLineVertical"
  )!;

  dropLine.style.display = "none";
  verticalLine.style.display = "none";
  editorContainer.appendChild(dropLine);
  editorContainer.appendChild(verticalLine);

  let position = 0;
  let node;

  for (node of dragEle?.parentElement?.childNodes as any) {
    if (node === dragEle) {
      break;
    }
    position++;
  }

  if (dragEle?.parentElement!.classList.contains("gridLayout")) {
    // console.log(dragEle?.parentElement);

    dragEle = dragEle?.parentElement!;

    for (node of editorParent.childNodes as any) {
      if (node === dragEle) {
        break;
      }
      position++;
    }
  }

  if (layout) {
    CustomEditor.addGridLayout(editor, position, setValue, index);
    return;
  }

  try {
    const to = ReactEditor.findPath(editor, value[position]);

    console.log(to, index);

    if (index[0] === to[0]) return;

    Transforms.moveNodes(editor, {
      at: index,
      to,
    });
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
