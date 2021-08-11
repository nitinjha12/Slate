import React from "react";
import { EditorType } from "types";
import { Transforms, Range, Editor, Path } from "slate";
import { ReactEditor } from "slate-react";

export function findSlateNode(nodes: any, id: string) {
  for (let node of nodes) {
    if (node.key === id) return node;
  }
}

export function findSlateNodePath(editor: EditorType, id: string) {
  const node = id && findSlateNode(editor.children, id);
  const path: Path = node && ReactEditor.findPath(editor, node);

  return path;
}

export function setNewSelection(editor: EditorType, id: string) {
  const path = findSlateNodePath(editor, id);

  if (path) {
    const range: Range = {
      anchor: { path: path, offset: 0 },
      focus: { path: path, offset: 0 },
    };
    Transforms.setSelection(editor, range);
    ReactEditor.focus(editor);
  }
}

function findDomNode(editor: EditorType, path: number) {
  const editorParent = document.querySelector<HTMLElement>(".editor__editable");

  const domNode = editorParent!.childNodes[path];

  return domNode;
}

export default findDomNode;
