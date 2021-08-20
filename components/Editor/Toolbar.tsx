import React, { useRef, useEffect, useContext, useState } from "react";
import { EditorType } from "types";
import { Plus } from "@styled-icons/bootstrap/Plus";
import { ReactEditor, useSlate } from "slate-react";
import Context from "context/context";
import { Transforms, Range, Editor } from "slate";
import { findSlateNode } from "./findNode";
import { v4 as uuidv4 } from "uuid";

function Toolbar() {
  const editor = useSlate() as any;
  const modelCtx = useContext(Context);

  const [node, path] =
    [modelCtx.getKey.id] &&
    (findSlateNode(
      editor.children,
      modelCtx.getKey.id,
      modelCtx.getKey.parentId
    ) as any);

  const gridCondition = node && node.type.includes("grid");

  if (gridCondition) {
    path.push(node.children.length - 1);
  }

  const nextPath =
    path &&
    (path.length > 1
      ? [...path.slice(0, path.length - 1), path[path.length - 1] + 1]
      : [path[0] + 1]);

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
    <section className={`toolbar `}>
      <button
        className="toolbar__addButton"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const top = rect.top;
          // + window.pageYOffset - e.currentTarget.offsetHeight;

          if (
            node.type.includes("grid-layout") ||
            !Editor.isEmpty(editor, node as any) ||
            Editor.isVoid(editor, node)
          ) {
            console.log(nextPath);
            Transforms.insertNodes(editor, block, { at: nextPath });
            Transforms.select(editor, range);
          }
          editor.onChange();
          ReactEditor.focus(editor);
          modelCtx.setToolbar(top);
        }}
        title="edit block"
      >
        <Plus size="24" />
      </button>
    </section>
  );
}

export default Toolbar;
