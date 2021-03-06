import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { v4 as uuidv4 } from "uuid";
import CustomEditor from "./Editor";
import { findSlateNode } from "./findNode";

function withColumn(editor: EditorType) {
  const { insertBreak, insertNode } = editor;

  let checkList = false;

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [list]: any = Editor.nodes(editor, {
        match: (n: any) => {
          if (
            n.type &&
            n.type.includes("list") &&
            Editor.isEmpty(editor, n.children[n.children.length - 1])
          ) {
            CustomEditor.toggleBlock({ editor, value: n.type });
            checkList = true;
          }

          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type &&
            n.type.includes("list")
          );
        },
      });
    }

    if (!checkList) {
      insertBreak();
    } else {
      checkList = false;
    }
  };

  editor.insertNode = (node) => {
    console.log(node);
  };

  return editor;
}

export default withColumn;
