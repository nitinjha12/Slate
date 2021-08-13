import React, { useRef, useEffect, useContext, useState } from "react";
import { EditorType } from "types";
import { Plus } from "@styled-icons/bootstrap/Plus";
import { ReactEditor, useSlate } from "slate-react";
import Context from "context/context";
import { Transforms, Range, Editor } from "slate";
import { findSlateNode } from "./findNode";
import { v4 as uuidv4 } from "uuid";

function Toolbar({ id }: { id: string }) {
  const editor = useSlate() as any;

  const modelCtx = useContext(Context);
  const toolbarRef = useRef(null);
  // const previousSelection = useRef<any>(null);

  const [node] = findSlateNode(editor.children, modelCtx.getKey);
  const path = ReactEditor.findPath(editor as any, node);
  const nextPath = [path[0] + 1];
  const range: Range = {
    anchor: { path: nextPath, offset: 0 },
    focus: { path: nextPath, offset: 0 },
  };

  const block = {
    type: "paragraph",
    children: [{ text: "" }],
    key: uuidv4(),
  };

  return (
    <section className={`toolbar `} ref={toolbarRef}>
      <button
        className="toolbar__addButton"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const top =
            rect.top + window.pageYOffset - e.currentTarget.offsetHeight;

          if (
            !Editor.isEmpty(editor, node as any) ||
            Editor.isVoid(editor, node)
          ) {
            Transforms.insertNodes(editor, block, { at: nextPath });
            Transforms.select(editor, range);
          }
          ReactEditor.focus(editor);
          modelCtx.setToolbar(top);
          setTimeout(() => ReactEditor.blur(editor), 600);
        }}
        title="edit block"
      >
        <Plus size="24" />
      </button>
    </section>
  );
}

export default Toolbar;
