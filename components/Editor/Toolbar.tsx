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

  // console.log(modelCtx.getKey);

  const [node, path] =
    [modelCtx.getKey.id] &&
    (findSlateNode(
      editor.children,
      modelCtx.getKey.id,
      modelCtx.getKey.parentId
    ) as any);

  // console.log(node);

  // if (node && node.type === "grid-layout-child") return null;

  // const path = node && node.type === "grid-layout-child"&&ReactEditor.findPath(editor as any, node);
  const nextPath = path && [path[0] + 1];
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
          console.log(node, modelCtx.getKey);
          // console.log(
          //   "state",
          //   node.type.includes("grid-layout") ||
          //     !Editor.isEmpty(editor, node as any) ||
          //     Editor.isVoid(editor, node)
          // );
          if (
            node.type.includes("grid-layout") ||
            !Editor.isEmpty(editor, node as any) ||
            Editor.isVoid(editor, node)
          ) {
            Transforms.insertNodes(editor, block, { at: nextPath });
            console.log("inserted");
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
