import React from "react";
import { EditorType } from "types";
import { Transforms, Range, Editor, Path, Descendant, Node } from "slate";
import { ReactEditor } from "slate-react";

export function findSlateNode(
  nodes: any,
  id: string,
  parentId?: string
): [Descendant | null, Path] {
  let path: number | number[] = 0;
  let node;
  let gridPosition = 0;

  for (node of nodes) {
    if (node.type === "grid-layout" && node.key === parentId)
      gridPosition = path;
    if (node.key === id) return [node, [path]];
    path++;
  }

  if (gridPosition) {
    path = [gridPosition, 0];
    for (let gridChild of nodes[gridPosition].children) {
      if (gridChild.key === id) return [gridChild, path];
      path[1]++;
    }
  }

  if (typeof path === "number") {
    node = null;
    return [node, [path]];
  } else {
    node = null;
    return [node, path];
  }
}

export function findSlateNodePath(
  editor: EditorType,
  id: string
): [Path, Descendant] {
  const [node, nodePath] = findSlateNode(editor.children, id) as any;
  const path: Path = node && ReactEditor.findPath(editor, node);

  return [path, node];
}

export function setNewSelection(editor: EditorType, id: string) {
  const [path, node] = findSlateNodePath(editor, id);

  if (Path.isPath(path)) {
    const range = Editor.range(editor, path);

    // editor.apply({
    //   type: "set_selection",
    //   properties: null,
    //   newProperties: range,
    // });
    Transforms.select(editor, range);
    ReactEditor.focus(editor);
  }
}

function findDomNode(editor: EditorType, path: number) {
  const editorParent = document.querySelector<HTMLElement>(".editor__editable");

  const domNode = editorParent!.childNodes[path];

  return domNode;
}

export default findDomNode;

export function getRange(path: Path): Range {
  return {
    anchor: { path, offset: 0 },
    focus: { path, offset: 0 },
  };
}
