import React from "react";
import { EditorType } from "types";

function findDomNode(editor: EditorType, path: number) {
  const editorParent = document.querySelector<HTMLElement>(".editor__editable");

  const domNode = editorParent!.childNodes[path];

  return domNode;
}

export default findDomNode;
