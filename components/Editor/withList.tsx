import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { v4 as uuidv4 } from "uuid";
import CustomEditor from "./Editor";
import { findSlateNode } from "./findNode";

function withList(editor: EditorType) {
  const { insertBreak, deleteForward, deleteBackward } = editor;

  let checkList = false;

  editor.insertBreak = () => {
    const { selection } = editor;
    const LIST_TYPES = ["bulleted-list", "ordered-list"];

    if (selection) {
      const [list]: any = Editor.nodes(editor, {
        match: (n: any) => {
          if (
            n.type &&
            LIST_TYPES.includes(n.type) &&
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

  editor.deleteBackward = (unit) => {
    const [list]: any = Editor.nodes(editor, {
      match: (n: any) => n?.type?.includes("list"),
    });

    if (
      list &&
      list[0].children.length === 1 &&
      list[0].children[0].children[0].text.length < 1
    ) {
      CustomEditor.toggleBlock({ editor, value: list[0].type });
      return;
    }
    // if (list) Transforms.delete(editor);

    deleteBackward(unit);
  };

  return editor;
}

export default withList;
