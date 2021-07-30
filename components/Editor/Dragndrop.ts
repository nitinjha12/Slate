import React from "react";
import { EditorType } from "types";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Transforms, Location, Range, Editor, Path, Node, Span } from "slate";
import CustomEditor from "./Editor";

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
  dragIcon!.style.top = `${eleHeight - 3}px`;
  dragIcon!.style.left = "-23px";
  dragIcon!.style.cursor = "grab";

  ele.setAttribute("draggable", true);
  ele.setAttribute("contenteditable", false);

  setDraggableEle(ele);

  ele!.addEventListener("dragstart", () => {
    editor.isDragging = true;
    ele?.classList.add("draggable--dragging");
  });

  ele!.addEventListener("dragend", () => {
    editor.isDragging = false;
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
  setDragEle: Function,
  editor: EditorType
) => {
  e.preventDefault();

  const editorParent =
    document.querySelector<HTMLDivElement>(".editor__editable")!;

  const afterEle: HTMLElement = getDragAfterElement(editorParent, e.clientY);

  // const elementMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);

  if (afterEle !== dragEle) {
    setDragEle(afterEle);
  }
};

export const onDrop = (
  editor: EditorType,
  dragEle: HTMLElement | undefined,
  value: any,
  setValue: Function,
  layout: boolean
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
  let node;

  for (node of dragEle?.parentElement?.childNodes as any) {
    if (node === dragEle) {
      break;
    }
    position++;
  }

  // if (dragEle === dragEle?.parentElement?.childNodes[position]) return;

  const [dragPosition]: any = Editor.positions(editor);
  const [dropPosition]: any = Editor.positions(editor, {
    at: [position],
  });

  // console.log(dragPosition, dropPosition,);

  if (layout) {
    const before =
      Path.isBefore(dragPosition.path, dropPosition.path) &&
      Path.isSibling(dragPosition.path, dropPosition.path);

    const to = before ? dropPosition.path : Path.next(dropPosition.path);

    CustomEditor.addGridLayout(editor, position, setValue);

    // const nodes = Editor.node(editor, [position]);

    return;
  }

  // console.log(node);

  //  editor.children[position].selection?.anchor.path[0];

  //

  const newEditor = JSON.parse(JSON.stringify(editor));

  Transforms.moveNodes(editor, {});
  console.log(editor);
  // Transforms.removeNodes(editor, { at: editor.selection?.anchor.path });
  // Transforms.collapse(editor);

  // Transforms.insertNodes(editor, newEditor.children[index!], {
  //   at: [position],
  // });

  // console.log(index, position);

  const newArr = swapArray(index!, position, value);

  // const gridLayout = document.querySelector(".gridLayout");
  // ele && gridLayout?.appendChild(ele);

  // const movePath = ReactEditor.findPath(editor, value[position]);

  // console.log(movePath);

  // console.log(editor.history);

  // Node.

  // console.log(ReactEditor.toDOMRange(editor, value[3]));

  // for (const e of Node.) {
  //   console.log(e);
  // }

  // newEditor.children

  // if (ele && editorParent) {
  //   if (!dragEle) {
  //     editorParent.appendChild(ele);
  //   } else {
  //     editorParent?.insertBefore(ele, dragEle);
  //   }
  // }

  setValue(newArr);
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

export const findNode = (editor: any, options: any) => {
  try {
    const {
      match: _match = () => true,
      at = editor.selection || [],
      reverse = false,
      voids = false,
    } = options;

    let from;
    let to;
    if (Span.isSpan(at)) {
      [from, to] = at;
    } else if (Range.isRange(at)) {
      const first = Editor.path(editor, at, { edge: "start" });
      const last = Editor.path(editor, at, { edge: "end" });
      from = reverse ? last : first;
      to = reverse ? first : last;
    }

    let root = [editor, []];
    if (Path.isPath(at)) {
      root = Editor.node(editor, at);
    }

    const nodeEntries: any = Node.nodes(root[0], {
      reverse,
      from,
      to,
      pass: ([n]) => (voids ? false : Editor.isVoid(editor, n)),
    });

    for (const [node, path] of nodeEntries) {
      if (match(node, _match)) {
        return [node as any, path];
      }
    }
  } catch (error) {
    return undefined;
  }
};

export const match = <T>(obj: any, predicate: any): boolean => {
  if (!predicate) return true;

  if (typeof predicate === "object") {
    return Object.entries(predicate).every(([key, value]) => {
      const values = [value];

      return values.includes(obj[key]);
    });
  }

  return predicate(obj);
};
