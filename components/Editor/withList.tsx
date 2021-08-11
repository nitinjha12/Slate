import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { v4 as uuidv4 } from "uuid";

function withList(editor: EditorType) {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [para]: any = Editor.nodes(editor, {
        match: (n: any) => {
          if (n.type === "paragraph") {
            Transforms.setNodes(editor, { key: uuidv4() } as any);
          }

          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type === "paragraph"
          );
        },
      });
    }

    insertBreak();
  };

  return editor;
}

export default withList;
