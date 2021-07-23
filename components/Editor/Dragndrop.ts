import React from "react";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { Transforms, Location, Range, Editor } from "slate";

export const onMouseEnter = (editor: EditorType, setDraggableEle: Function) => {
  const index: number = editor.selection!.anchor.path[0];
  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  const dragBtn = document.querySelector<HTMLButtonElement>(
    ".toolbar__dragndrop"
  );

  const dragIcon = document.querySelector<HTMLElement>(".dragIndicator__icon");

  const path = editor.selection!.anchor.path[0];
  let eleHeight = 0;
  const selected: any = editor.children[path];

  if (selected.type === "heading-1") {
    eleHeight = 11;
  } else if (selected.type === "heading-2") {
    eleHeight = 5;
  }

  const ele: any = editorParent.childNodes[index];

  ele.insertAdjacentElement("afterbegin", dragIcon);

  ele.style.position = "relative";

  dragBtn!.style.visibility = "hidden";
  dragIcon!.style.position = "absolute";
  dragIcon!.style.top = `${eleHeight}px`;
  dragIcon!.style.left = "-28px";
  dragIcon!.style.cursor = "grab";

  ele.setAttribute("draggable", true);
  ele.setAttribute("contenteditable", false);

  setDraggableEle(ele);

  ele!.addEventListener("dragstart", () => {
    ele?.classList.add("draggable--dragging");
  });

  ele!.addEventListener("dragend", () => {
    ele?.classList.remove("draggable--dragging");
  });
};

export const onMouseLeave = (draggableEle: HTMLElement) => {
  const dragBtn = document.querySelector<HTMLButtonElement>(
    ".toolbar__dragndrop"
  );

  const dragIcon = document.querySelector<HTMLElement>(".dragIndicator__icon");

  dragBtn?.appendChild(dragIcon!);

  dragBtn!.style.position = "static";
  dragBtn!.style.visibility = "visible";

  dragIcon!.style.position = "static";

  draggableEle?.setAttribute("draggable", "false");
  draggableEle!.style.position = "static";
  draggableEle?.classList.remove("draggable--dragging");
  draggableEle?.setAttribute("contenteditable", "true");
};

export const onDragover = (
  e: React.DragEvent,
  getDragAfterElement: Function,
  dragEle: HTMLElement | undefined,
  setDragEle: Function
) => {
  e.preventDefault();
  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  const afterEle: HTMLElement = getDragAfterElement(editorParent, e.clientY);

  if (afterEle !== dragEle) {
    setDragEle(afterEle);
  }
};

export const onDrop = (
  editor: EditorType,
  dragEle: HTMLElement | undefined,
  value: any,
  setValue: Function
) => {
  // e.preventDefault();
  const dragBtn = document.querySelector<HTMLButtonElement>(
    ".toolbar__dragndrop"
  );

  const dragIcon = document.querySelector<HTMLElement>(".dragIndicator__icon");

  dragBtn?.appendChild(dragIcon!);

  const index = editor.selection?.anchor.path[0];

  const ele = document.querySelector(".draggable--dragging");
  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  let position = 0;

  for (let node of dragEle?.parentElement?.childNodes as any) {
    if (node === dragEle) {
      break;
    }
    position++;
  }

  const newEditor = JSON.parse(JSON.stringify(editor));

  const newArr = swapArray(index!, position, value);

  newEditor.children = newArr;

  editor.children = newEditor.children;

  // console.log(newArr);
  // setValue(newArr);

  // console.log(index, position, value);

  // console.log(editor);

  // setValue();

  // console.log(Editor.node(editor, editor.selection!));

  // useTransform(editor, index!, position);

  if (ele && editorParent) {
    if (!dragEle) {
      editorParent.appendChild(ele);
    } else {
      editorParent?.insertBefore(ele, dragEle);
    }
  }

  // ReactEditor.blur(editor);
  //   editor.undo();
};

function swapArray(fromindex: number, toIndex: number, arr: any) {
  let updatedArr = [...arr];
  const removedArr = updatedArr.splice(fromindex, 1);

  updatedArr.splice(toIndex, 0, removedArr[0]);
  return updatedArr;

  // for(let )
}

function useTransform(editor: EditorType, index: number, position: number) {
  const newEditor = JSON.parse(JSON.stringify(editor));
  const selection = JSON.parse(JSON.stringify(editor.selection));
  const removedNode = newEditor.children[index];

  // console.log(
  //   editor.selection,
  //   selection,
  //   editor.children,
  //   removedNode,
  //   position
  // );

  selection.anchor.path[0] = position;
  selection.focus.path[0] = position;

  Transforms.removeNodes(editor, {
    at: editor.selection!,
    // match: (n: any) => n.type === removedNode.type,
  });

  // newEditor.children.splice(position, 0, removedNode);

  // console.log(editor.selection, selection, position);

  Transforms.insertNodes(editor, removedNode, {
    at: selection,
    // voids: true,
    //   mode: "highest",
  });

  const newSlection = JSON.parse(JSON.stringify(selection));

  newSlection.anchor.path[0] = position - 1;
  newSlection.focus.path[0] = position - 1;

  // Transforms.removeNodes(editor, {
  //   at: newSlection,
  // });

  console.log(editor.children);
}
